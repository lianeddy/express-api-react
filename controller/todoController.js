const db = require('../database');

module.exports = {
    getTodo : (req,res) => {
        let sql = `select id, todo from todo where userId = ${req.params.id}`;
        db.query(sql, (err,results) => {
            if(err){
                res.status(500).send(err.message)
            }
            res.status(200).send(results)
        })
    },
    addTodo : (req,res) => {
        let { todo } = req.body;
        let { id } = req.params;

        let sql = `insert into todo (todo, userId) values ('${todo}', ${id})`;
        db.query(sql, (err, insert) => {
            if(err){
                res.status(500).send(err.message)
            }
            res.status(201).send({
                status : 'created',
                message : 'Data Created!' 
            })
        })
    },
    editTodo : (req,res) => {
        let { todo } = req.body;
        let { id } = req.params;

        let sql = `update todo set todo = '${todo}' where id = ${id}`;
        db.query(sql, (err, update) => {
            if(err){
                res.status(500).send(err.message)
            }
            res.status(201).send({
                status : 'edited',
                message : 'Data Edited!' 
            })
        })
    },
    deleteTodo : (req,res) => {
        let { id } = req.params;

        let sql = `delete from  todo where id = ${id}`;
        db.query(sql, (err, del) => {
            if(err){
                res.status(500).send(err.message)
            }
            res.status(201).send({
                status : 'deleted',
                message : 'Data Deleted!' 
            })
        })
    }
}