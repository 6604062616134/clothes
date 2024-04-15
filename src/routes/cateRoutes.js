// routes/cateRoutes.js
const express = require('express');
const router = express.Router();
const cateController = require('../controllers/cateController');

// CRUD routes
router.get('/', cateController.getAllCates);
router.get('/:cateID', cateController.getCatesById);

router.post('/', cateController.createCate);
router.put('/:cateID', cateController.updateCate);
router.delete('/:cateID', cateController.deleteCate);

module.exports = router;