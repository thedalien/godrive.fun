module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        name: {
            type: Sequelize.STRING
            },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            typeof: 'email',
            },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            },
        role: {
            type: Sequelize.STRING,
            defaultValue: 'user',
            alowedValues: ['user', 'admin', 'moderator', 'blocked']
            },
        verified: { //MAG: specify which specific status and roles exist, also validate for Email 
            type: Sequelize.BOOLEAN,
            defaultValue: false,
            },
    });
    return User;
}