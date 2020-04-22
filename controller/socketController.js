const { db } = require('../database');

module.exports = {
    getSocket : (req,res) => {
        let sql = `select * from socket`;
        db.query(sql, (err, results) => {
            if(err)res.status(500).send(err.message)

            res.status(200).send(results)
        })
    },
    addSocket : (req,res) => {
        let sql = `insert into socket set ?`;
        db.query(sql, req.body, (err, insert) => {
            if(err) res.status(500).send(err.message);

            let sql = `select * from socket`;
            db.query(sql, (err,results) => {
                if(err) res.status(500).send(err.message)

                req.app.io.emit('Socket', results);
            })
        })
    }
}