const express = require('express');
const router = express.Router();
const { todoController } = require('../controller');
const { auth } = require('../helper/jwt');
const {
    getTodo,
    addTodo,
    editTodo,
    deleteTodo,
    getTodoPromise
} = todoController;

router.get('/get-todo/:id',auth, getTodo);
router.post('/add-todo/:id',auth, addTodo);
router.post('/edit-todo/:id',auth ,editTodo);
router.delete('/delete-todo/:id',auth, deleteTodo);
router.get('/get-todo-prom/:id', getTodoPromise);

module.exports = router; // IMPORTANT