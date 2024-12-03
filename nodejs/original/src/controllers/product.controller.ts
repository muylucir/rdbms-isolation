import { Router, Request, Response } from 'express';
import { ProductService } from '../services/product.service';
import asyncHandler from 'express-async-handler';

const router = Router();
const productService = new ProductService();

router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const products = await productService.findAll();
  res.json(products);
}));

router.get('/search', asyncHandler(async (req: Request, res: Response) => {
  const name = req.query.name as string;
  const products = await productService.search(name);
  res.json(products);
}));

router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const product = await productService.findById(parseInt(req.params.id));
  if (!product) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }
  res.json(product);
}));

router.post('/', asyncHandler(async (req: Request, res: Response) => {
  const product = await productService.create(req.body);
  res.status(201).json(product);
}));

router.put('/:id', asyncHandler(async (req: Request, res: Response) => {
  const product = await productService.update(parseInt(req.params.id), req.body);
  if (!product) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }
  res.json(product);
}));

router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
  await productService.delete(parseInt(req.params.id));
  res.status(204).send();
}));

export const ProductController = router;