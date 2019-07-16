const express = require('express');
const router = express.Router();

const controller = require('../controllers/transfer.controller');

router.get('/', controller.creat);

router.post('/', controller.postCreate);

module.exports = router;