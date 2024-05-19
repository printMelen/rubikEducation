const express = require('express');
// ,login, verifyToken, getUser 
const { getUser, signUp } = require('../controllers/user-controller');
const  verifyToken = require('../middleware/verifyJWT.js');
// const { signUp}= require('../controllers/user-controller');
const router = express.Router();
router.post('/signup',signUp);
router.get('/profile',verifyToken , getUser);
// router.post('/login',login);

module.exports = router;