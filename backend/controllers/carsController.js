const models = require('../models/index');
const Car = models.cars;

const createCar = (req, res) => {
  // Validate request
  if (!req.body.brand || !req.body.model || !req.body.year || !req.body.color || !req.body.seats || !req.body.volume || !req.body.poweredBy || !req.body.dayPrice || !req.body.hourPrice) {
    res.status(400).send({
      car: req.body,
      message: 'Content cannot be empty!'
    });
    console.log(req.body);
    return;
  }

  // Create a Car
  const car = {
    brand: req.body.brand,
    model: req.body.model,
    year: req.body.year,
    color: req.body.color,
    seats: req.body.seats,
    volume: req.body.volume,
    poweredBy: req.body.powerdBy,
    dayPrice: req.body.dayPrice,
    hourPrice: req.body.hourPrice
  };

  // Save Car in the database
  Car.create(car)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Car.'
      });
    });
};

const getAllCars = (req, res) => {
  Car.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving cars.'
      });
    });
};

const getList = (req, res) => {
    const brand = req.body.brand;

    let query = {};

    if (brand) {
        query.where = { brand: brand }; 
    }

    query.attributes = [req.body.data]; 

    Car.findAll(query)
        .then(data => {
            // remove duplicates
            data = [...new Set(data.map(item => item.dataValues[req.body.data]))];
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || 'Some error occurred while retrieving cars.'
            });
        });
};



module.exports = {
    createCar,
    getAllCars,
    getList
}
