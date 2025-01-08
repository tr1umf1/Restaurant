const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize('restaurant', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307,
});

const User = sequelize.define(
    'users',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        surname: {
            type: DataTypes.STRING,
        },
        username: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
        },
        isLoggedIn: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    },
    {
        freezeTableName: true,
        timestamps: false,
    }
);

const Meal = sequelize.define(
    'meals',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.FLOAT,
        },
        description: {
            type: DataTypes.TEXT,
        },
    },
    {
        timestamps: false,
    }
);

const Appointment = sequelize.define(
    'appointments',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATEONLY,
        },
        time: {
            type: DataTypes.TIME,
        },
        partySize: {
            type: DataTypes.INTEGER,
        },
        name: {  // Add name field
            type: DataTypes.STRING,
            allowNull: false,  // Make it required or optional based on your needs
        },
        specialRequest: {  // Add specialRequest field
            type: DataTypes.STRING,
            allowNull: true,  // You can set this as optional
        },
    },
    {
        timestamps: false,
    }
);

const AppointmentMeal = sequelize.define(
    'appointmentsmeals',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        meal: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        rating: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1,
                max: 5,
            },
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        timestamps: false,
    }
);

User.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
});

const createTestUser = async () => {
    try {
        const user = await User.create({
            name: 'Erion',
            surname: 'Rexhepi',
            username: 'ErionRexhepi',
            email: 'Erionrexhepi@gmail.com',  // Change this if needed
            password: 'erion123',  // This will be hashed automatically
            isLoggedIn: false,  // Default value
        });

        console.log('Test User created successfully:', user);
    } catch (error) {
        console.error('Error creating test user:', error);
    }
};

// Define relationships
User.hasMany(Appointment, { foreignKey: 'userId' });
Appointment.belongsTo(User, { foreignKey: 'userId' });

// Appointment.belongsToMany(Meal, { through: AppointmentMeal, foreignKey: 'appointmentId' });
// Meal.belongsToMany(Appointment, { through: AppointmentMeal, foreignKey: 'mealId' });

sequelize.sync({ alter: true });

(async () => {
    try {
        await sequelize.sync();
        console.log('Database synced successfully.');
        createTestUser(); 
    } catch (error) {
        console.error('Error syncing database:', error.message);
    }
})();

module.exports = { sequelize, User, Meal, Appointment, AppointmentMeal };
