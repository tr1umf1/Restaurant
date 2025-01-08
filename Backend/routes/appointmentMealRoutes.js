const express = require('express');
const router = express.Router();
const appointmentMealController = require('../controllers/appointmentMealController');

router.post('/add', appointmentMealController.addAppointmentMeal);

router.get('/', appointmentMealController.getAllAppointmentMeals);

module.exports = router;
