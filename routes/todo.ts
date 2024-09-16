import { Router } from "express";
import fs from "fs";

const router = Router();

function checkIfFileExist() {
  try {
    const buffer = fs.readFileSync("todo.txt");
    return !!buffer;
  } catch (error) {
    return false    
  }
}

router.post("/todo", (req, res) => {
  const exist = checkIfFileExist();
  if (!exist) fs.writeFile("todo.txt", "", (err) => {});
  const description = req.body.description;
  const randomId = Math.floor(Math.random() * 100000);
  const done = 0
  const todo = `${randomId} - ${description} - ${done}`;
  fs.appendFile("todo.txt", `\n${todo}`, (err) => {});
  return res.send(`Todo '${todo}' created`);
});

router.get("/todo", (req, res) => {
  const exist = checkIfFileExist();
  if (!exist) return res.send("No todos found");
  const buffer = fs.readFileSync("todo.txt");
  const todos = buffer.toString();
  return res.send(todos);
});

router.patch("/todo", (req, res) => {
  const exist = checkIfFileExist();
  if (!exist) return res.send("No todos found");
  const buffer = fs.readFileSync("todo.txt");
  const todos = buffer.toString().split("\n");
  const id = req.body.id;
  const done = req.body.done;
  const findTodo = todos.find((todo) => todo.includes(id + " -"));
  if (!findTodo) return res.send(`Todo ${id} not found`);
  const currentDone = findTodo.substring(findTodo.length - 3);
  const updatedDone = `- ${done}`;
  const updateTodo = findTodo.replace(currentDone, updatedDone);
  const othersTodo = todos.filter((todo) => todo !== findTodo);
  othersTodo.push(updateTodo);
  const newTodos = othersTodo.join("\n");
  fs.writeFile("todo.txt", newTodos, (err) => {});
  return res.send(`Todo updated: ${updateTodo}`);
});

export default router;
