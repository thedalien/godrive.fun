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
        startDate: {
            type: Sequelize.DATE,
            required: true
            },
        endDate: {
            type: Sequelize.DATE,
            required: true
            },
        totalPrice: {
            type: Sequelize.INTEGER,
            required: true
            },
        status: {
            type: Sequelize.STRING,
            required: true,
            defaultValue: 'pending',
            }, 
    }); 

    return Book;
  };   