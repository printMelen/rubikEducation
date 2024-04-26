const express = require('express');
const { signUp,login, verifyToken }= require('../controllers/user-controller');

const router = express.Router();

router.post('/signup',signUp);
router.post('/login',login);
router.get('/user',verifyToken);

module.exports = router;