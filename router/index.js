const userRouter = require("./userRouter");
const todoRouter = require("./todoRouter");
const mongoRouter = require("./mongoRouter");
const socketRouter = require("./socketRouter");
const pushRouter = require("./pushRouter");

module.exports = {
  userRouter,
  todoRouter,
  mongoRouter,
  socketRouter,
  pushRouter,
};
