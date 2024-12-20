const { Sequelize, DataTypes } = require('sequelize');
// I have to create users, meals, appointments, appointmentsmeals

const sequelize = new Sequelize('restaurant', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    port: 3307,
});


const User = sequelize.define(
    "users",
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
        },
        password: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: false,
    }
);

const Meal = sequelize.define(
    "meals",
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
    "appointments",
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
    },
    {
        timestamps: false,
    }
);

const AppointmentMeal = sequelize.define(
    "appointmentsmeals",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        appointmentId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        mealId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
        },
    },
    {
        timestamps: false,
    }
);

User.hasMany(Appointment, { foreignKey: "userId" });
Appointment.belongsTo(User, { foreignKey: "userId" });

Appointment.belongsToMany(Meal, { through: AppointmentMeal, foreignKey: "appointmentId" });
Meal.belongsToMany(Appointment, { through: AppointmentMeal, foreignKey: "mealId" });

(async () => {})(); 