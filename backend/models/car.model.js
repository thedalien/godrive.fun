module.exports = (sequelize, Sequelize) => {
    const Car = sequelize.define('cars', {
        Brand: {
            type: Sequelize.STRING
            },
            
    });
  
    return Car;
  };
  