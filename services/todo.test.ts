import { createTodo, getTodos, updateTodoStatus } from "./todo";

const testId = 123;

afterEach(() => {
  jest.spyOn(global.Math, 'random').mockRestore();
})

test("create Todo", () => {
  const description = "Teste Todo";
  jest.spyOn(global.Math, "random").mockReturnValue(testId / 100000);
  const result = createTodo(description);
  expect(result).toBe(`Todo '${testId} - ${description} - 0' created`);
});

test("create empty Todo", () => {
  const result = createTodo(" ");
  expect(result).toBe(`Todo description is required`);
});

test("get Todo", () => {
  const result = getTodos();
  expect(typeof result).toBe("string");
});

test("update Todo", async () => {
  const description = "Teste update Todo";
  const randomSeed = Math.random();
  const updateId = Math.floor(randomSeed * 100000);
  jest.spyOn(global.Math, "random").mockReturnValue(randomSeed);
  createTodo(description);
  await new Promise((r) => setTimeout(r, 2000));
  const result = updateTodoStatus(updateId, 1);
  expect(result).toBe(`Todo updated: ${(updateId)} - ${description} - 1`);
});

test("update non-existent Todo", () => {
  const id = -1;
  const result = updateTodoStatus(id, 1);
  expect(result).toBe(`Todo ${id} not found`);
});
