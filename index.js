const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');
const port = process.env.PORT || 2000;
const cors = require('cors');
const bearerToken = require('express-bearer-token');
const { transporter, transportAwait } = require('./helper/nodemailer');

app.use(bodyParser());
app.use(bearerToken());
app.use(bodyParser.urlencoded({ extended : false }))
app.use(cors()); // npm i cors
app.use(express.static('public'))

let userCount = 0;

app.io = io;
app.userCount = userCount;

app.get('/', (req,res) => {
    res.status(200).send('<h1>Welcome to Todo API</h1>')
});

io.on('connection', (socket) => {
    userCount+=1
    console.log('User Connected', userCount);
    io.emit('Connected', userCount)

    socket.on('disconnect', () => {
        userCount--
        console.log('User Disconnected', userCount);
        io.emit('Connected', userCount)
    })
})

app.post('/send-mail', async (req,res) => {
    let to = req.query.email;
    let mailOptions = {
        from : 'Admin <admin@todo.com>',
        to,
        subject : 'Testing Nodemailer',
        html : '<h1>Success</h1>'
    };
    if(to){
        try{
            await transportAwait(mailOptions)
            res.status(200).send('Email Sent')
        }catch(err){
            res.status(500).send(err.message)
        }
    }else{
        res.status(404).send('Email Not Found')
    }

})

const {
    userRouter,
    todoRouter,
    mongoRouter
} = require('./router');

app.use('/users', userRouter); // localhost:2000/users
app.use('/todo', todoRouter); // axios.get(localhost:2000/todo/get-todo
app.use('/mongo', mongoRouter); // // localhost:2000/mongo

http.listen(port, () => console.log(`API active at port ${port}`));