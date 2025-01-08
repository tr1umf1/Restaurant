const express = require('express');
const { createReservation, getAppointments } = require('../controllers/appointmentController');

const router = express.Router();

router.post('/create', createReservation);

router.get('/', getAppointments);

module.exports = router;