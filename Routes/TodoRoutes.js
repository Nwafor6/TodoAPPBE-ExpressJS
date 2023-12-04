const { addTodo, GetTodos, UpdateTodo, DeleteTodo, CompletedTodos, getASingleTodo, getAllTodos }=require("../Controllers/TodoControllers")
const router = require("express").Router();

router.post('/add-todo', addTodo)
router.get('/', getAllTodos)
router.get("/tasks", GetTodos)
router.get("/tasks/:id", getASingleTodo)
router.put("/tasks/:id", UpdateTodo)
router.delete("/tasks/:id", DeleteTodo)
router.get("/completed",CompletedTodos)
module.exports= router;