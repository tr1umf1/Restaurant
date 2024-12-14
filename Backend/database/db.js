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

(async () => {
    await sequelize.sync({force: true});
})();
