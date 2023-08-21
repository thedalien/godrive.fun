const express = require('express');
const router = express.Router();

const {tokenAuth} = require('../middleware/middleware');
const {adminAuth} = require('../middleware/adminMiddleware');

// const middleware = require('../middleware');
const carsController = require('../controllers/carsController');

// router.post('/addCar', tokenAuth, carsController.createCar);
router.post('/addCar', adminAuth, carsController.createCar);

router.post('/getList', carsController.getList);

router.put('/update/:id', adminAuth, carsController.updateCar);

router.delete('/delete/:id', adminAuth, carsController.deleteCar);

router.get('/all', carsController.getAllCars);

router.get('/getcar/:id', carsController.getCar);


module.exports = router; 