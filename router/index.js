const userRouter = require('./userRouter');
const todoRouter = require('./todoRouter');
const mongoRouter = require('./mongoRouter');
const socketRouter = require('./socketRouter');

module.exports = {
    userRouter,
    todoRouter,
    mongoRouter,
    socketRouter
};