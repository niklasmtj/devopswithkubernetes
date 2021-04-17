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

router.get("/:todoId", async (req: Request, res: Response) => {
  const {todoId} = req.params;
  const todo: todos = await prisma.todos.findUnique({where: {id: +todoId}}) as todos;
  res.status(200).json({todos: todo});
})

router.put("/update/:todoId/:todoStatus", async (req: Request, res: Response) => {
  const {todoId, todoStatus} = req.params;
  try {
    const todo: todos = await prisma.todos.update({where: {id: +todoId}, data: {done: todoStatus === "true"}}) as todos;
    res.status(200).json({todos: todo});
  } catch (error) {
    res.status(400).json({message: error, error: true})
  }
})

export default router;