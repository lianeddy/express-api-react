const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 2000;
const cors = require('cors');
const bearerToken = require('express-bearer-token');

app.use(bodyParser());
app.use(bearerToken());
app.use
app.use(cors()); // npm i cors

app.get('/', (req,res) => {
    res.status(200).send('<h1>Welcome to Todo API</h1>')
});

const {
    userRouter,
    todoRouter
} = require('./router');

app.use('/users', userRouter);
app.use('/todo', todoRouter);

app.listen(port, () => console.log(`API active at port ${port}`));