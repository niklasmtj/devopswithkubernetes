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
  if (req.body?.name?.length > 140) {
    res.status(200).json({message: "That Todo is too long.", error: true})
    console.error("The incoming todo name was too long");
    return;
  }
  const todo: todos = await prisma.todos.create({
    data: req.body
  });
  console.log("Todo.name: ", todo.name);
  const todos = await prisma.todos.findMany();
  res.status(200).json({todos: todos})
});

export default router;