const db = require('../database');
const Crypto = require('crypto');
const { createJWTToken } = require('../helper/jwt');

module.exports = {
    Register : (req,res) => {
        let { username, password, email } = req.body;
        let hashPassword = Crypto.createHmac('sha256', 'kuncirahasia').update(password).digest('hex');

        let sql = `insert into users (username, password, roleId, email) values('${username}', '${hashPassword}', 2 , '${email}')`;
        db.query(sql, (err,insert) => {
            if(err){
                res.status(500).send(err.message)
            }else{
                let sql = `select id, username, roleId, email, password from users where id = ${insert.insertId}`;
                db.query(sql, (err,results) => {
                    if(err){
                        res.status(500).send({
                            status : 'Failed',
                            message : err.message
                        })
                    }
                    let token = createJWTToken({...results[0]})
                    console.log(token)
                    res.status(200).send({
                        status : 'Success',
                        data : results[0],
                        message : 'Account Created!'
                    })
                })
            }
        })
    },
    Login : (req,res) => {
        let { username, password } = req.body;
        let hashPassword = Crypto.createHmac('sha256', 'kuncirahasia').update(password).digest('hex');
        let sql = `select id, username, roleId, email, password from users where username = '${username}' and password = '${hashPassword}'`;
        db.query(sql, (err,results) => {
            if(err){
                res.status(500).send(err.message)
            }
            if(results.length !== 0){
                console.log(results[0])
                let token = createJWTToken({...results[0]})
                console.log(token)

                res.status(200).send({
                    status : 'Success',
                    data : {
                        ...results[0],
                        token
                    },
                    message : 'Login Successful'
                })
            }else{
                res.status(404).send({
                    status : 'Not Found',
                    message : 'User not Found'
                })
            }
        })
    },
    keepLogin : (req,res) => {
        res.status(200).send({
            status : 'Success',
            data : {
                ...req.user,
                token : req.token
            },
            message : 'Authorized'
        })
    }
};