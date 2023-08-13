const express = require('express');
const router = express.Router();

// const middleware = require('../middleware');
const carsController = require('../controllers/carsController');

router.post('/addCar', carsController.createCar);

router.post('/getList', carsController.getList);

router.get('/get-all-cars', carsController.getAllCars);

module.exports = router; 