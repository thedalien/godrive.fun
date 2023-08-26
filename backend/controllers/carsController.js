const models = require('../models/index');
const Car = models.cars;
const Images = models.images;
const Book = models.bookings;

const createCar = async (req, res) => {
  // Validate request
  if (!req.body.brand || !req.body.model || !req.body.year || !req.body.color || !req.body.seats || !req.body.trunkVolume || !req.body.poweredBy || !req.body.dayPrice || !req.body.hourPrice || !req.body.carImages || !req.body.door || !req.body.licensePlate) {
    res.status(400).send({
      car: req.body,
      message: 'Content cannot be empty!'
    });
    console.log(req.body);
    return;
  }

  try {
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
      description: req.body.description
    };

    // Save Car in the database
    const createdCar = await Car.create(car);

    // Associate carImages with the created car
    for (const carImage of req.body.carImages) {
        const image = await Images.create({
            url: carImage,
            alt: `${createdCar.brand} ${createdCar.model} Image`,
            carId: createdCar.id
        });
    }

    res.send(createdCar);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating the Car.'
    });
  }
};

const getAllCars = (req, res) => {
  Car.findAll({
    include: [Images]
  })
    .then(data => {
      res.send(data);
    })
    .catch(err => { 
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving cars.'
      });
    });
};

const getCar = async (req, res) => {
  const carId = req.params.id;

  try {
    const car = await Car.findByPk(carId, {
      include: [Images, Book] // Include Images and Book in the query
    });

    if (!car) {
      return res.status(404).send({
        message: 'Car not found'
      });
    }

    res.send(car);
  } catch (err) {
    res.status(500).send({
      message: err.message || 'Some error occurred while retrieving the car.'
    });
  }
};

const getList = (req, res) => {
  const brand = req.body.brand;

  let query = {};

  if (brand) {
    query.where = { brand: brand };
  }

  query.attributes = [req.body.data];
  query.include = [Images]; // Include Images in the query

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

const updateCar = (req, res) => {
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

const deleteCar = (req, res) => {
  const id = req.params.id;

  Car.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: 'Car was deleted successfully!'
        });
      } else {
        res.send({
          message: `Cannot delete Car with id=${id}. Maybe Car was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Could not delete Car with id=${id}`
      });
    });
};

module.exports = {
    createCar,
    getAllCars,
    getCar,
    getList,
    updateCar,
    deleteCar
}