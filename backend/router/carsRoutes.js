const express = require('express');
const router = express.Router();

// const middleware = require('../middleware');
const carsController = require('../controllers/carsController');

router.post('/add-car', carsController.addCar);

router.get('/list', carsController.list);

module.exports = router; 