const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const passport = require("passport");
const { User } = require("../database/db"); // Ensure you import User model from the correct path

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,  // Make sure the secret is correctly passed from .env
};

const jwtStrategy = new JwtStrategy(options, async (payload, done) => {
    try {
        const user = await User.findByPk(payload.id);
        if (user) {
            return done(null, user);
        }
        return done(null, false); // User not found
    } catch (error) {
        return done(error, false);
    }
});

passport.use(jwtStrategy);

module.exports = passport;
