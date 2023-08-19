const express = require('express');
const router = express.Router();

const {tokenAuth} = require('../middleware/middleware');

// const middleware = require('../middleware');
const carsController = require('../controllers/carsController');

router.post('/addCar', tokenAuth, carsController.createCar);

router.post('/getList', carsController.getList);

router.put('/updateCar', carsController.updateCar);

// router.delete('/deleteCar', carsController.deleteCar);

router.get('/get-all-cars', carsController.getAllCars);

router.get('/get-car/:id', carsController.getCar);


module.exports = router; 