const express = require('express');
const router = express.Router();

const {tokenAuth} = require('../middleware/middleware');

const bookController = require('../controllers/bookController');

router.post('/create', tokenAuth, bookController.create);
router.get('/getBookingByUser/:userId', tokenAuth, bookController.getBookingByUser);
router.get('/getBookingByCar/:carId', tokenAuth, bookController.getBookingByCar);
router.post('/getAvailableCars', tokenAuth, bookController.getAvailableCars);
router.delete('/delete/:bookId', tokenAuth, bookController.deleteBooking);
router.put('/cancel/:bookId', tokenAuth, bookController.cancelBooking);

module.exports = router;
