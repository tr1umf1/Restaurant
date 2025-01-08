const express = require("express");
const { loginUser } = require("../controllers/authcontrollers");
const passport = require("passport");
const router = express.Router();

// Login route
router.post("/login", loginUser);

// Protected route (example)
router.get("/profile", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.status(200).json({ message: "Welcome to your profile!", user: req.user });
});

module.exports = router;
