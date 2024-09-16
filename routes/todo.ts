import { Router } from "express";

const router = Router();

router.post("/todo", (req, res) => {
  res.send("Create a todo");
});

router.get("/todo", (req, res) => {
  res.send("Get all todos");
});

router.patch("/todo", (req, res) => {
  res.send("Update a todo");
});

export default router
