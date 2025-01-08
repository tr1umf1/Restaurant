require('dotenv').config();
const express = require("express");
const passport = require("./config/passport");
const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const mealRoutes = require('./routes/mealRoutes');
const appointmentMealRoutes = require('./routes/appointmentMealRoutes');
const cors = require('cors');

const app = express(); // Initialize express app

app.use(cors({
  origin: 'http://localhost:5173' // Replace with your frontend's origin
}));

app.options('*', cors()); // Enable preflight requests for all routes

// Use express.json() instead of bodyParser
app.use(express.json());

app.use(passport.initialize()); // Initialize passport

// Use authentication routes
app.use("/api/auth", authRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/appointmentsmeals', appointmentMealRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
