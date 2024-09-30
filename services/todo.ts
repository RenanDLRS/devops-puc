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

export function createTodo(todoDescription: string) {
  const exist = checkIfFileExist();
  if (!exist) fs.writeFile("todo.txt", "", (err) => {});
  const description = todoDescription;
  if (!description.trim()) return `Todo description is required`;
  const randomId = Math.floor(Math.random() * 100000);
  const done = 0
  const todo = `${randomId} - ${description} - ${done}`;
  fs.appendFile("todo.txt", `\n${todo}`, (err) => {});
  return `Todo '${todo}' created`;
}

export function getTodos() {
  const exist = checkIfFileExist();
  if (!exist) return "No todos found";
  const buffer = fs.readFileSync("todo.txt");
  const todos = buffer.toString();
  return todos;
}

export function updateTodoStatus(id: number, done: number) {
  const exist = checkIfFileExist();
  if (!exist) return "No todos found";
  const buffer = fs.readFileSync("todo.txt");
  const todos = buffer.toString().split("\n");
  const findTodo = todos.find((todo) => todo.substring(0,id.toString().length + 2) == id + " -");
  if (!findTodo) return `Todo ${id} not found`;
  const currentDone = findTodo.substring(findTodo.length - 3);
  const updatedDone = `- ${done}`;
  const updateTodo = findTodo.replace(currentDone, updatedDone);
  const othersTodo = todos.filter((todo) => todo !== findTodo);
  othersTodo.push(updateTodo);
  const newTodos = othersTodo.join("\n");
  fs.writeFile("todo.txt", newTodos, (err) => {});
  return `Todo updated: ${updateTodo}`;
}
