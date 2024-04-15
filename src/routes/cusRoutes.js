// routes/cusRoutes.js
const express = require('express');
const router = express.Router();
const cusController = require('../controllers/cusController');

// CRUD routes
router.get('/', cusController.getAllcus);
router.get('/:cusID', cusController.getcusById);

router.post('/', cusController.createCus);
router.put('/:cusID', cusController.updateCus);
router.delete('/:cusID', cusController.deleteCus);

module.exports = router;