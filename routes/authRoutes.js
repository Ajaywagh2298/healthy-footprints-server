const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/metrics', authController.getDashboardMetrics);
router.get('/authUser/:uid',authController.getAuthUserCheck);
router.get('/logout/:uid', authController.deleteUserLogin);
router.get('/users',authController.getAllUsers)


module.exports = router;
