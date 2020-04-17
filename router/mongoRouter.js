const express = require('express');
const router = express.Router();

let { mongoController } = require('../controller');
let {
    getMovies,
    addMovies,
    editMovies,
    deleteMovieById
} = mongoController;

router.get('/get-mongo', getMovies)
router.post('/add-mongo', addMovies)
router.patch('/edit-mongo/:id', editMovies)
router.delete('/delete-mongo/:id', deleteMovieById)

module.exports = router;