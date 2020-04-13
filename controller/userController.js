const db = require('../database');
const Crypto = require('crypto');

module.exports = {
    Register : (req,res) => {
        let { username, password, roleId } = req.body;
        let hashPassword = Crypto.createHmac('sha256', 'kuncirahasia').update(password).digest('hex');

        let sql = `insert into users (username, password, roleId) values('${username}', '${hashPassword}', 2)`;
        db.query(sql, (err,insert) => {
            if(err){
                res.status(500).send(err.message)
            }else{
                let sql = `select username, roleId from users where id = ${insert.insertId}`;
                db.query(sql, (err,results) => {
                    if(err){
                        res.status(500).send({
                            status : 'Failed',
                            message : err.message
                        })
                    }
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
        let sql = `select username, roleId from users where username = '${username}' and password = '${hashPassword}'`;
        db.query(sql, (err,results) => {
            if(err){
                res.status(500).send(err.message)
            }
            res.status(200).send(results[0])
        })
    }
};