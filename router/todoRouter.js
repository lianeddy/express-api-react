const express = require('express');
const router = express.Router();
const { todoController } = require('../controller');
const { auth } = require('../helper/jwt');
const {
    getTodo,
    addTodo,
    editTodo,
    deleteTodo
} = todoController;

router.get('/get-todo/:id', getTodo);
router.post('/add-todo/:id', addTodo);
router.post('/edit-todo/:id', editTodo);
router.delete('/delete-todo/:id', deleteTodo);

module.exports = router;