import { Router, Request, Response } from 'express';
import { UserService } from '../services/user.service';
import asyncHandler from 'express-async-handler';

const router = Router();
const userService = new UserService();

router.get('/', asyncHandler(async (req: Request, res: Response) => {
  const users = await userService.findAll();
  res.json(users);
}));

router.get('/:id', asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.findById(parseInt(req.params.id));
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  res.json(user);
}));

router.post('/signup', asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
}));

router.put('/:id', asyncHandler(async (req: Request, res: Response) => {
  const user = await userService.updateUser(parseInt(req.params.id), req.body);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }
  res.json(user);
}));

router.delete('/:id', asyncHandler(async (req: Request, res: Response) => {
  await userService.delete(parseInt(req.params.id));
  res.status(204).send();
}));

export const UserController = router;