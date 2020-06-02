const { db } = require("../database");

module.exports = {
  getSocket: (req, res) => {
    let { orderBy, filterBy } = req.query;
    let sql = `select * from socket s`;
    if (filterBy) {
      sql += ` where s.read = ${filterBy}`;
    }
    if (orderBy) {
      sql += ` order by s.read asc, id ${orderBy}`;
    }
    console.log(sql);
    db.query(sql, (err, results) => {
      if (err) res.status(500).send(err.message);
      console.log(req.app);
      let notifCount = results.filter((val) => val.read === 0).length;
      req.app.io.emit("notifCount", notifCount);

      res.status(200).send(results);
    });
  },
  addSocket: (req, res) => {
    let { orderBy, filterBy } = req.query;
    let sql = `insert into socket set ?`;
    db.query(sql, req.body, (err, insert) => {
      if (err) res.status(500).send(err.message);
      let sql = `select * from socket s`;
      if (filterBy) {
        sql += ` where s.read = ${filterBy}`;
      }
      if (orderBy) {
        sql += ` order by s.read asc, id ${orderBy}`;
      }
      db.query(sql, (err, results) => {
        if (err) res.status(500).send(err.message);
        let notifCount = results.filter((val) => val.read === 0).length;

        req.app.io.emit("Socket", results);
        req.app.io.emit("notifCount", notifCount);
        // req.app.io.emit('Notif', results);
      });
    });
  },
  updateSocket: (req, res) => {
    let { id } = req.params;
    let { orderBy, filterBy } = req.query;
    console.log(req.query);
    let sql = `update socket s set s.read = 1 where id = ${id}`;
    db.query(sql, (err, update) => {
      if (err) res.status(500).send(err.message);

      let sql = `select * from socket s`;
      if (filterBy) {
        sql += ` where s.read = ${filterBy}`;
      }
      if (orderBy) {
        sql += ` order by s.read asc, id ${orderBy}`;
      }
      db.query(sql, (err, results) => {
        if (err) res.status(500).send(err.message);
        let notifCount = results.filter((val) => val.read === 0).length;

        req.app.io.emit("Socket", results);
        req.app.io.emit("notifCount", notifCount);
        // req.app.io.emit('Notif', results);
      });
    });
  },
  updateAll: (req, res) => {
    let sql = `update socket s set s.read = 1`;
    db.query(sql, (err, update) => {
      if (err) res.status(500).send(err.message);

      let sql = `select * from socket`;
      db.query(sql, (err, results) => {
        if (err) res.status(500).send(err.message);
        let notifCount = results.filter((val) => val.read === 0).length;

        req.app.io.emit("Socket", results);
        req.app.io.emit("notifCount", notifCount);
        // req.app.io.emit('Notif', results);
      });
    });
  },
};
