const express = require('express');
// ,login, verifyToken, getUser 
const { signUp}= require('../controllers/user-controller');
const router = express.Router();
router.post('/signup',signUp);
// router.post('/login',login);
// router.get('/user',verifyToken,getUser);

module.exports = router;