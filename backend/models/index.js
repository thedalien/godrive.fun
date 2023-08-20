const dbConfig = require('../config/config.js');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  dialectOptions: {
    connectTimeout: 1000
  },
  logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.cars = require('./car.model.js')(sequelize, Sequelize);
db.users = require('./user.model.js')(sequelize, Sequelize);
db.images = require('./images.model.js')(sequelize, Sequelize);
db.features = require('./features.model.js')(sequelize, Sequelize);
db.bookings = require('./book.model.js')(sequelize, Sequelize);

// Associations
db.cars.hasMany(db.images);
db.images.belongsTo(db.cars);

db.cars.hasMany(db.features);
db.features.belongsTo(db.cars);

db.cars.hasMany(db.bookings);
db.bookings.belongsTo(db.cars);

module.exports = db;
