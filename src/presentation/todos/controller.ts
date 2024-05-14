import { error } from 'console'
import { Request, Response } from 'express'

const todos = [
  { id: 1, text: 'Todo 1', completedAt: new Date() },
  { id: 2, text: 'Todo 2', completedAt: new Date() },
  { id: 3, text: 'Todo 3', completedAt: null }
]

export class TodoController {
  constructor () {}

  public getTodos = (req: Request, res: Response) => {
    return res.json(todos)
  }

  public getTodosById = (req: Request, res: Response) => {
    const id = +req.params.id
    if (isNaN(id))
      return res.status(400).json({ error: 'Id argument is not a number' })

    const todo = todos.find(todo => todo.id === id)

    todo
      ? res.json(todo)
      : res.status(404).json({ error: `Todo by with ${id} not found` })
  }

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body

    if (!text)
      return res
        .status(400)
        .json({ error: 'Text and completedAt property are required' })

    const newTodo = {
      id: todos.length + 1,
      text,
      completedAt: new Date()
    }

    todos.push(newTodo)

    res.json(newTodo)
  }

  public updateTodo = (req: Request, res: Response) => {
    const id = +req.params.id

    if (isNaN(id))
      return res.status(400).json({ error: 'Id property is not a number' })

    const todo = todos.find(todo => todo.id === id)
    if (!todo) return res.status(404).json({ error: 'Todo with id not found' })

    const { text, completedAt } = req.body

    // if (!text)
    //   return res
    //     .status(400)
    //     .json({ error: 'Text and completedAt property are required' })

    todo.text = text || todo.text

    completedAt === ' null'
      ? (todo.completedAt = null)
      : (todo.completedAt = new Date(completedAt || todo.completedAt))

    res.json(todo)
  }

  public deleteTodo = (req: Request, res: Response) => {
    const id = +req.params.id

    if (isNaN(id))
      return res.status(400).json({ error: 'Id property is not a number' });

    const todo = todos.find(todo => todo.id === id);
    if (!todo)
    return res.status(404).json({ error: 'todo with id is not found' });
    
    todos.splice(todos.indexOf(todo), 1);
    // todos.filter(todo => todo.id !== id);
    res.json(todo);
  }
}
