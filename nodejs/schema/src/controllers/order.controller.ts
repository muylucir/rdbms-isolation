// src/controllers/order.controller.ts
import { Router, Request, Response } from 'express';
import { OrderService } from '../services/order.service';
import asyncHandler from 'express-async-handler';

const router = Router();
const orderService = new OrderService();

router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const orders = await orderService.findAll();
  res.json(orders);
}));

router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const order = await orderService.findById(parseInt(req.params.id));
  if (!order) {
    res.status(404).json({ message: 'Order not found' });
    return;
  }
  res.json(order);
}));

router.get('/user/:userId', asyncHandler(async (req: Request, res: Response) => {
  const orders = await orderService.findByUserId(parseInt(req.params.userId));
  res.json(orders);
}));

router.get('/user/:userId/stats', asyncHandler(async (req: Request, res: Response) => {
  const stats = await orderService.getUserOrderStats(parseInt(req.params.userId));
  res.json(stats);
}));

router.post('/user/:userId', asyncHandler(async (req: Request, res: Response) => {
  const order = await orderService.createOrder(parseInt(req.params.userId), req.body);
  res.status(201).json(order);
}));

router.put('/:id/status', asyncHandler(async (req: Request, res: Response) => {
  const order = await orderService.updateStatus(parseInt(req.params.id), req.body);
  if (!order) {
    res.status(404).json({ message: 'Order not found' });
    return;
  }
  res.json(order);
}));

router.post('/:id/cancel', asyncHandler(async (req: Request, res: Response) => {
  const order = await orderService.cancelOrder(parseInt(req.params.id));
  res.json(order);
}));

export const OrderController = router;