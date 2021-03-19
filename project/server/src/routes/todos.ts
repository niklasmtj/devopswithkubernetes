import {Request, Response, Router} from 'express'
import { Todo } from '../types/todos';

const router = Router();
import { PrismaClient, todos } from '@prisma/client'
const prisma = new PrismaClient()

router.get("/", async (req: Request, res: Response) => {
  const todos = await prisma.todos.findMany();
  res.json({todos: todos})
})

router.post("/add", async (req: Request, res: Response) => {
  const todo: todos = await prisma.todos.create({
    data: req.body
  });
  const todos = await prisma.todos.findMany();
  res.status(200).json({todos: todos})
});

export default router;