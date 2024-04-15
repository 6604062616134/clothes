// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// CRUD routes
router.get('/', orderController.getAllorders);
router.get('/:orderID', orderController.getOrdersById);

router.post('/', orderController.createOrder);
router.put('/:orderID', orderController.updateOrder);
router.delete('/:orderID', orderController.deleteOrder);

module.exports = router;