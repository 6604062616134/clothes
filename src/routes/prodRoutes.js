// routes/prodRoutes.js
const express = require('express');
const router = express.Router();
const prodController = require('../controllers/prodController');

// CRUD routes
router.get('/', prodController.getAllprods);
router.get('/:prodID', prodController.getprodsById);

router.post('/', prodController.createProd);
router.put('/:prodID', prodController.updateProd);
router.delete('/:prodID', prodController.deleteProd);

module.exports = router;