const { Meal } = require('../database/db'); 

// Controller to add a new meal
exports.addMeal = async (req, res) => {
    const { name, price, description } = req.body;

    // Validate the data
    if (!name || !price || !description) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        // Create the new meal
        const newMeal = await Meal.create({
            name,
            price,
            description,
        });

        // Send a success response
        res.status(201).json({ message: 'Meal added successfully', meal: newMeal });
    } catch (error) {
        // Handle any errors
        console.error(error);
        res.status(500).json({ message: 'Error adding meal' });
    }
};
