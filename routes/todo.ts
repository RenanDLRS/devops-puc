import { Router } from "express";
import { createTodo, getTodos, updateTodoStatus } from "../services/todo";

const router = Router();

router.post("/todo", (req, res) => {
  const description = req.body.description;
  const result = createTodo(description);
  return result
});
router.get("/todo", (req, res) => {
  const todos = getTodos();
  if (!todos.length) return res.send("No todos found");
  return res.send(todos);
});

router.patch("/todo", (req, res) => {
  const id = req.body.id;
  const done = req.body.done;
  const result = updateTodoStatus(id, done);
  if (!result) return res.send(`Todo ${id} not found`);
  return res.send(`Todo updated: ${result}`);
});

export default router;
