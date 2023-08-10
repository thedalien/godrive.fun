const Car = require('./car.model');
const Images = require('./images.model');
const Features = require('./features.model');


Car.hasMany(Images);
Images.belongsTo(Car);

Car.hasMany(Features);
Features.belongsTo(Car);




// // Owner-Car relationship through owned_cars
// Car.belongsToMany(Images, { through: OwnedCars, foreignKey: 'owner_id', allowNull: false });
// Car.belongsToMany(Owner, { through: OwnedCars, foreignKey: 'car_id', allowNull: false });

// // Car-Parts relationship through cars_parts
// Car.belongsToMany(Part, { through: CarsParts, foreignKey: 'car_id', allowNull: false });
// Part.belongsToMany(Car, { through: CarsParts, foreignKey: 'part_id', allowNull: false });
 