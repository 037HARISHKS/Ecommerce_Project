const express = require('express');
const { createOrder } = require('../controller/orderController');
const router = express.Router();

router.route('/orders').post(createOrder);

module.exports = router;
