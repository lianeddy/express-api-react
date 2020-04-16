const db = require('../database');
const { uploader } = require('../helper/uploader');
const fs = require('fs');

module.exports = {
    getTodo : (req,res) => {
        let sql = `select id, todo, imagePath from todo where userId = ${req.params.id}`;
        db.query(sql, (err,results) => {
            if(err){
                res.status(500).send(err.message)
            }
            res.status(200).send({
                dataList : results,
                status : 'Success',
                message : 'Fetch Successful'
            })
        })
    },
    addTodo : (req,res) => {
        try{
            const path = '/images';
            const upload = uploader(path, 'TDO').fields([{ name : 'image' }]) //TDD1231231 TDO123123123
            upload(req,res, (err) => {
                const { image } = req.files;
                const { todo } = req.body;
                const imagePath = image ? `${path}/${image[0].filename}` : null
                console.log(imagePath) // simpen di database
                console.log(todo)

                let sql = `insert into todo (todo, userId, imagePath) values('${todo}', ${req.params.id}, '${imagePath}')`;
                db.query(sql, (err,results) => {
                    if(err){
                        fs.unlinkSync(`./public${imagePath}`)
                        res.status(500).send(err.message)
                    }
                    res.status(201).send({
                        status : 'created',
                        message : 'Data Created!' 
                    })
                })
            })
        }catch(err){
            res.status(500).send(err.message)
        }
        // let { todo } = req.body;
        // let { id } = req.params;

        // let sql = `insert into todo (todo, userId) values ('${todo}', ${id})`;
        // db.query(sql, (err, insert) => {
        //     if(err){
        //         res.status(500).send(err.message)
        //     }
        //     res.status(201).send({
        //         status : 'created',
        //         message : 'Data Created!' 
        //     })
        // })
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