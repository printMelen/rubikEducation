const express = require('express');
const router = express.Router();
const authController = require("../controllers/auth-controller");
const loginLimiter = require('../middleware/loginLimiter');
const verifyJWT= require('../middleware/verifyJWT');
// router.use(verifyJWT);

router.route('/login').post(loginLimiter,authController.login);
router.route('/refresh').get(verifyJWT,authController.refresh);
router.route('/logout').post(authController.logout);

module.exports = router;