import {Request, Response, Router} from 'express'
import { Todo } from '../types/todos';

const router = Router();

const todos: Todo[] = []


router.get("/", (req: Request, res: Response) => {
  res.json({todos: JSON.stringify(todos)})
})

router.post("/add", (req: Request, res: Response) => {
  const todo: Todo = new Todo().fromObj(req.body);
  console.log(todo)
  todos.push(todo);
  res.status(200).json({todos: JSON.stringify(todos)})
});




export default router;