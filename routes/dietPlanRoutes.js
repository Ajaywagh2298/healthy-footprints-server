const express = require('express');
const router = express.Router();
const dietPlanController = require('../controllers/dietPlanController');

router.post('/', dietPlanController.createDietPlan);
router.get('/', dietPlanController.getDietPlans);
router.put('/:uid', dietPlanController.updateDietPlan);
router.delete('/:uid', dietPlanController.deleteDietPlan);

module.exports = router;
