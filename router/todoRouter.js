const express = require("express");
const router = express.Router();
const { todoController } = require("../controller");
const { auth } = require("../helper/jwt");
const {
  getTodo,
  addTodo,
  editTodo,
  deleteTodo,
  getAllPromise,
} = todoController;

router.get("/get-todo/:id", getTodo);
router.post("/add-todo/:id", addTodo);
router.post("/edit-todo/:id", auth, editTodo);
router.delete("/delete-todo/:id", auth, deleteTodo);
router.get("/get-all", getAllPromise);

module.exports = router; // IMPORTANT
