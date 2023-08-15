module.exports = (sequelize, Sequelize) => {
    const Features = sequelize.define("features", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        feature: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        icon: {
            type: Sequelize.STRING,
            allowNull: true,
        },
    });
    return Features;
};