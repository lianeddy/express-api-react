const express = require('express');
const router = express.Router();
const { userController } = require('../controller');
const { auth } = require('../helper/jwt');
const {
    Register,
    Login,
    keepLogin
} = userController;


router.post('/register', Register);
router.post('/login', Login);
router.post('/keep-login', auth ,keepLogin)

module.exports = router;