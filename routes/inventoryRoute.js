const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.post('/', inventoryController.createInventoryUseLog);
router.get('/', inventoryController.getInventoryUseLogs);
router.put('/:id', inventoryController.updateInventoryUseLog);
router.delete('/:id', inventoryController.deleteInventoryUseLog);

module.exports = router;
