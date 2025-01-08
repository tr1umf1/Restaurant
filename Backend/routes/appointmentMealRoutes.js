const express = require('express');
const router = express.Router();
const appointmentMealController = require('../controllers/appointmentMealController');

// Endpoint to add a new appointment meal review
router.post('/add', appointmentMealController.addAppointmentMeal);

// Endpoint to get all appointment meal reviews
router.get('/', appointmentMealController.getAllAppointmentMeals);

module.exports = router;
