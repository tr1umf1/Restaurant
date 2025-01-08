const express = require('express');
const { createReservation, getAppointments } = require('../controllers/appointmentController');

const router = express.Router();

// POST request to create a reservation (appointment)
router.post('/create', createReservation);

router.get('/', getAppointments);

module.exports = router;