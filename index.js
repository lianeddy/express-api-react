const express = require('express');
const app = express();
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

app.get('/', (req,res) => {
    res.status(200).send('<h1>Welcome to Todo API</h1>')
});

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
        // transporter.sendMail(mailOptions, (err, results) => {
        //     if(err){
        //         res.status(500).send(err.message)
        //     }
        //     res.status(200).send('Email Sent')
        // })
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

app.listen(port, () => console.log(`API active at port ${port}`));