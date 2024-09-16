import express from "express";
import todo from "./routes/todo";

const app = express();
const port = 3000;
app.use(express.json());

app.use(todo);

app.listen(port, () => {
  console.log(`Devops Puc is listening on port ${port}`);
  console.log(`http://localhost:${port}`);
});
