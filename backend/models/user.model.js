module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        name: {
            type: Sequelize.STRING
            },
        email: {
            type: Sequelize.STRING
            },
        password: {
            type: Sequelize.STRING
            },
        role: {
            type: Sequelize.STRING
            },
        status: { //MAG: specify which specific status and roles exist, also validate for Email 
            type: Sequelize.STRING
            },
    });
    return User;
}

//MAG, I could be wrong but I think you want to define it as 'user' because sequelize will automatically try to pluralize it? Same goes for the car.model