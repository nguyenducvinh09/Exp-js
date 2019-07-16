const express = require('express');
const router = express.Router();

const controller = require('../controllers/about.controller');

router.get('/',controller.index);

module.exports = router;