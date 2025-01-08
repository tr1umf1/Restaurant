const { AppointmentMeal } = require('../database/db.js');

module.exports = {
    addAppointmentMeal: async (req, res) => {
        const { meal, rating, description } = req.body;

        try {
            if (!meal || !rating || !description) {
                return res.status(400).json({ message: 'All fields are required.' });
            }

            const newAppointmentMeal = await AppointmentMeal.create({
                meal,
                rating,
                description,
            });

            res.status(201).json({
                message: 'Appointment meal review added successfully!',
                data: newAppointmentMeal,
            });
        } catch (error) {
            res.status(500).json({ message: 'Error adding appointment meal review.', error: error.message });
        }
    },

    getAllAppointmentMeals: async (req, res) => {
        try {
            const reviews = await AppointmentMeal.findAll();
            res.status(200).json(reviews);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching appointment meal reviews.', error: error.message });
        }
    },
};
