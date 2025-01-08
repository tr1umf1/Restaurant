const { Appointment, AppointmentMeal } = require('../database/db.js');

const createReservation = async (req, res) => {
    const { userId, name, email, date, time, guests, specialRequests } = req.body; 

    try {
        const appointment = await Appointment.create({
            userId,
            name, 
            email, 
            date,
            time,
            partySize: guests,
        });

        return res.status(200).json({
            success: true,
            message: 'Reservation created successfully!',
            appointment,
        });
    } catch (error) {
        console.error('Error creating reservation:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to create reservation.',
            error: error.message,
        });
    }
};

const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll(); 
        return res.status(200).json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch appointments.',
            error: error.message,
        });
    }
};


module.exports = { createReservation, getAppointments };
