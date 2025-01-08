const express = require('express');
const router = express.Router();
const mealController = require('../controllers/mealController');

router.post('/add', mealController.addMeal);

module.exports = router;
