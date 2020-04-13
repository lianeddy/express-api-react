const express = require('express');
const router = express.Router();
const { userController } = require('../controller');
const {
    Register,
    Login
} = userController;


router.post('/register', Register);
router.post('/login', Login);

module.exports = router;