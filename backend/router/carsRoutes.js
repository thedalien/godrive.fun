const express = require('express');
const router = express.Router();

const tokenAuth = require('../middleware/middleware');

// const middleware = require('../middleware');
const carsController = require('../controllers/carsController');

router.post('/addCar', tokenAuth, carsController.createCar);

router.post('/getList', carsController.getList);

router.get('/get-all-cars', carsController.getAllCars);

module.exports = router; 