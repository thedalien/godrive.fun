module.exports = (sequelize, Sequelize) => {
    const Car = sequelize.define('cars', {
        brand: {
            type: Sequelize.STRING,
            required: true
            },
        model: {
            type: Sequelize.STRING,
            required: true
            },
        year: {
            type: Sequelize.INTEGER,
            required: true
            },
        color: {
            type: Sequelize.STRING,
            required: true
            },
        seats: {
            type: Sequelize.INTEGER,
            required: true
            },
        volume: {
            type: Sequelize.FLOAT,
            required: true
            },
        poweredBy: {
            type: Sequelize.STRING,
            required: true
            },
        dayPrice: {
            type: Sequelize.INTEGER,
            required: true
            },
        hourPrice: {
            type: Sequelize.INTEGER,
            required: true
            },
    });

    return Car;
  };  