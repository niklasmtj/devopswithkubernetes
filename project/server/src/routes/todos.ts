import {Request, Response, Router} from 'express'
import { Todo } from '../types/todos';
import prisma from '../services/prisma-client';
import { todos } from '.prisma/client';

const router = Router();


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