const models = require('../models/index');
const Book = models.bookings;


const createBooking = async (req, res) => {
  try {
    const { carId, userId, startDate, endDate } = req.body;

    const booking = await Book.create({
      carId,
      userId,
      startDate,
      endDate,
      totalPrice,
      status,
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getBookingByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const userBookings = await Book.findAll({
      where: {
        userId: userId,
      },
    });

    res.status(200).json(userBookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
    createBooking,
    getBookingByUser,
}