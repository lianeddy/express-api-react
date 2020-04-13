const express = require('express');
const router = express.Router();
const { userController } = require('../controller');
const {
    Register,
    Login,
    keepLogin
} = userController;


router.post('/register', Register);
router.post('/login', Login);
router.post('/keep-login', keepLogin)

module.exports = router;