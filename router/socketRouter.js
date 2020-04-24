const express = require('express');
const router = express.Router();
const { 
    getSocket,
    addSocket,
    updateSocket,
    updateAll
} = require('../controller').socketController;

router.get('/get-socket', getSocket);
router.post('/add-socket', addSocket);
router.patch('/update-socket/:id', updateSocket);
router.patch('/update-all', updateAll);

module.exports = router;