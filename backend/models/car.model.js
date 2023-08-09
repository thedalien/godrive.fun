module.exports = (sequelize, Sequelize) => {
    const Car = sequelize.define('cars', {
        Brand: {
            type: Sequelize.STRING
            },
        Model: {
            type: Sequelize.STRING
            },
        Year: {
            type: Sequelize.INTEGER
            },
        Color: {
            type: Sequelize.STRING
            }
    });
  
    return Car;
  };
  