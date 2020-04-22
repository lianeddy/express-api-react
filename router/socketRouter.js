const express = require('express');
const router = express.Router();
const { 
    getSocket,
    addSocket
} = require('../controller').socketController;

router.get('/get-socket', getSocket);
router.post('/add-socket', addSocket);

module.exports = router;