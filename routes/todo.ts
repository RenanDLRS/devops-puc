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
  res.send(`Todo '${todo}' created`);
});

router.get("/todo", (req, res) => {
  res.send("Get all todos");
});

router.patch("/todo", (req, res) => {
  res.send("Update a todo");
});

export default router;
