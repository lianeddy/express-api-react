const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 2000;
const cors = require('cors');
const bearerToken = require('express-bearer-token');
const transporter = require('./helper/nodemailer');

app.use(bodyParser());
app.use(bearerToken());
app.use(bodyParser.urlencoded({ extended : false }))
app.use(cors()); // npm i cors

app.get('/', (req,res) => {
    res.status(200).send('<h1>Welcome to Todo API</h1>')
});

app.post('/send-mail', (req,res) => {
    let to = req.query.email;
    let mailOptions = {
        from : 'Admin <admin@todo.com>',
        to,
        subject : 'Testing Nodemailer',
        html : '<h1>Success</h1>'
    };
    if(to){
        transporter.sendMail(mailOptions, (err, results) => {
            if(err){
                res.status(500).send(err.message)
            }
            res.status(200).send('Email Sent')
        })
    }else{
        res.status(404).send('Email Not Found')
    }

})

const {
    userRouter,
    todoRouter
} = require('./router');

app.use('/users', userRouter);
app.use('/todo', todoRouter);

app.listen(port, () => console.log(`API active at port ${port}`));