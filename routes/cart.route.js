const express = require('express');
const router = express.Router();

const controller = require('../controllers/cart.controller');

router.get('/add/:productId', controller.addCart);

module.exports = router;