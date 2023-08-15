module.exports = (sequelize, Sequelize) => {
    const Images = sequelize.define("images", {
        url: {
            type: Sequelize.STRING
        },
        alt: {
            type: Sequelize.STRING
        },
    });
    
    return Images;
};
