module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define('bookings', {
        carId: {
            type: Sequelize.INTEGER,
            required: true
            },
        userId: {
            type: Sequelize.INTEGER,
            required: true
            },
        from: {
            type: Sequelize.,
            required: true
            },
        to: {
            type: Sequelize.STRING,
            required: true
            },
        totalPrice: {
            type: Sequelize.INTEGER,
            required: true
            },
    }); 

    return Car;
  };   