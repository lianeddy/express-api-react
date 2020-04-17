const express = require('express');
const router = express.Router();

let { mongoController } = require('../controller');
let {
    getMovies
} = mongoController;

router.get('/get-mongo', getMovies)

module.exports = router;