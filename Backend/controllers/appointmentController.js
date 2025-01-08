const { Appointment, AppointmentMeal } = require('../database/db.js'); // Import the models

// Controller function to create a reservation
const createReservation = async (req, res) => {
    const { userId, name, email, date, time, guests, specialRequests } = req.body; // Ensure 'name' is here

    try {
        // Step 1: Create the appointment (reservation)
        const appointment = await Appointment.create({
            userId,
            name, // Make sure the 'name' is part of the appointment model in the DB
            email, // Add email if needed
            date,
            time,
            partySize: guests, // Assuming you want to map guests to partySize
        });

        // Step 2: Handle special requests, meals, etc. (Optional)

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
        const appointments = await Appointment.findAll(); // Fetch all appointments
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
