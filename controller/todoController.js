const { db, query } = require("../database");
const { uploader } = require("../helper/uploader");
const fs = require("fs");

module.exports = {
  getTodo: (req, res) => {
    let sql = `select id, todo, imagePath from todo where userId = ${req.params.id} order by id desc`;
    db.query(sql, (err, results) => {
      if (err) {
        res.status(500).send(err.message);
      }
      res.status(200).send({
        dataList: results,
        status: "Success",
        message: "Fetch Successful",
      });
    });
  },
  addTodo: (req, res) => {
    try {
      const path = "/images";
      const upload = uploader(path, "TDO").fields([{ name: "image" }]); //TDD1231231 TDO123123123
      upload(req, res, (err) => {
        let { todo } = req.body;
        let { image } = req.files;
        const imagePath = image ? `${path}/${image[0].filename}` : null;

        let sql = `insert into todo (todo, userId, imagePath) values('${todo}', ${req.params.id}, '${imagePath}')`;
        db.query(sql, (err, results) => {
          if (err) {
            fs.unlinkSync(`../public${imagePath}`);
            res.status(500).send(err.message);
          }
          res.status(201).send({
            status: "created",
            message: "Data Created!",
          });
        });
      });
    } catch (err) {
      console.log(err);
      res.status(500).send(err.message);
    }
  },
  editTodo: (req, res) => {
    // ada gambar atau engga
    // if ada gambar = gambar lama yang API dihapus
    // upload file baru -> dapat imagePath
    // imagePath disimpan di database
    // let { todo } = req.body;
    let { id } = req.params;

    let sql = `select * from todo where id = ${id}`;
    db.query(sql, (err, results) => {
      if (err) res.status(500).send(err.message);

      let oldImagePath = results[0].imagePath;
      console.log(oldImagePath);
      try {
        const path = "/images";
        const upload = uploader(path, "TDO").fields([{ name: "image" }]);

        upload(req, res, (err) => {
          // foto/file masuk
          if (err) res.status(500).send(err.message);
          const { image } = req.files;
          const { todo } = req.body;

          const imagePath = image
            ? `${path}/${image[0].filename}`
            : oldImagePath;
          let sql = `update todo set todo = '${todo}', imagePath = '${imagePath}' where id =${id}`;
          db.query(sql, (err, results) => {
            if (err) {
              fs.unlinkSync(`../public${imagePath}`);
              res.status(500).send(err.message);
            }
            if (image) {
              fs.unlinkSync(`../public${oldImagePath}`);
            }
            res.status(200).send({
              status: "Success",
              message: "Edit Data Successful",
            });
          });
        });
      } catch (err) {
        res.status(500).send(err.message);
      }
    });

    // let sql = `update todo set todo = '${todo}' where id = ${id}`;
    // db.query(sql, (err, update) => {
    //     if(err){
    //         res.status(500).send(err.message)
    //     }
    //     res.status(201).send({
    //         status : 'edited',
    //         message : 'Data Edited!'
    //     })
    // })
  },
  deleteTodo: (req, res) => {
    let { id } = req.params;

    let sql = `delete from  todo where id = ${id}`;
    db.query(sql, (err, del) => {
      if (err) {
        res.status(500).send(err.message);
      }
      res.status(201).send({
        status: "deleted",
        message: "Data Deleted!",
      });
    });
  },
  getAllPromise: (req, res) => {
    let sql = `select 
                    t.id, 
                    t.imagePath, 
                    u.username, 
                    u.displayPicture,
                    t.todo 
                from todo t 
                join users u on u.id = t.userId 
                order by id desc;`;
    query(sql)
      .then((response) => {
        res.status(201).send({
          status: "success",
          data: response,
          message: "Fetch Data Success!",
        });
      })
      .catch((err) => {
        res.status(500).send({
          status: "Error",
          message: "Fetch Data Failed!",
        });
      });
    // try{
    //     let response = await query(sql)
    //     console.log(response)
    //     res.status(201).send({
    //         status : 'success',
    //         data : response,
    //         message : 'Fetch Data Success!'
    //     })
    // }catch(err){
    //     res.status(500).send({
    //         status : 'Error',
    //         message : 'Fetch Data Failed!'
    //     })
    // }
  },
};
