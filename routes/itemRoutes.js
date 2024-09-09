const express = require('express');
const router = express.Router();
const itemsController = require('../controllers/itemController');

router.post('/', itemsController.createItems);
router.get('/', itemsController.getItems);
router.put('/:uid', itemsController.updateItems);
router.delete('/:uid', itemsController.deleteItem);


module.exports = router;