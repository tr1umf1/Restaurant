const { Meal } = require('../database/db'); 

exports.addMeal = async (req, res) => {
    const { name, price, description } = req.body;

    if (!name || !price || !description) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const newMeal = await Meal.create({
            name,
            price,
            description,
        });

        res.status(201).json({ message: 'Meal added successfully', meal: newMeal });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding meal' });
    }
};
