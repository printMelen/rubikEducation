const express = require('express');
const router = express.Router();
const rubikController = require("../controllers/rubik-controller");
// router.route('/random').post(rubikController.randomize);
router.post('/random',rubikController.randomize);
router.post('/solve',rubikController.solve);
module.exports = router;
