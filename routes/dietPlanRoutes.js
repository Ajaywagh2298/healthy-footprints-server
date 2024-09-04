const express = require('express');
const router = express.Router();
const dietPlanController = require('../controllers/dietPlanController');

router.post('/', dietPlanController.createDietPlan);
router.get('/', dietPlanController.getDietPlans);
router.put('/:id', dietPlanController.updateDietPlan);
router.delete('/:id', dietPlanController.deleteDietPlan);

module.exports = router;
