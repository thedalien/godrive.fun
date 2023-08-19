const models = require('../models/index');
const Car = models.cars;

const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})

const upload = multer({ storage: storage });


const createCar = (req, res) => {
  // Validate request
  if (!req.body.brand || !req.body.model || !req.body.year || !req.body.color || !req.body.seats || !req.body.trunkVolume || !req.body.poweredBy || !req.body.dayPrice || !req.body.hourPrice) {
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
    trunkVolume: req.body.trunkVolume,
    poweredBy: req.body.poweredBy,
    dayPrice: req.body.dayPrice,
    hourPrice: req.body.hourPrice,
    door: req.body.door,
    licensePlate: req.body.licensePlate,
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

const getCar = (req, res) => {
  const carId = req.params.id;

  Car.findByPk(carId)
    .then(car => {
      if (!car) {
        return res.status(404).send({
          message: 'Car not found'
        });
      }
      res.send(car);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving the car.'
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

const editCar = (req, res) => {
  const id = req.params.id;

  Car.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Car was updated successfully.'
        });
      } else {
        res.send({
          message: `Cannot update Car with id=${id}. Maybe Car was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Error updating Car with id=${id}`
      });
    });
};

module.exports = {
    createCar,
    getAllCars,
    getCar,
    getList,
    editCar
}