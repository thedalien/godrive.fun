const express = require('express');
const router = express.Router();

const {tokenAuth} = require('../middleware/middleware');

const bookController = require('../controllers/bookController');

router.post('/createBooking', tokenAuth, bookController.createBooking);
router.get('/getBookingByUser/:userId', tokenAuth, bookController.getBookingByUser);
router.get('/getBookingByCar/:carId', tokenAuth, bookController.getBookingByCar);
router.post('/getAvailableCars', tokenAuth, bookController.getAvailableCars);
router.delete('/deleteBooking', tokenAuth, bookController.deleteBooking);

module.exports = router;
