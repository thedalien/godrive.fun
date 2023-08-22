const models = require('../models/index');
const Book = models.bookings;
const Car = models.cars;


const create = async (req, res) => {
  const { carId, startDate, endDate } = req.body;

  if (!carId || !startDate || !endDate) {
    return res.status(400).json({ message: 'Missing required information' });
  }

  try {
    const car = await Car.findOne({ where: { id: carId } });
    if (!car) {
      return res.status(404).json({ message: 'Car not found' });
    }

    const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    if (days <= 0) {
      return res.status(400).json({ message: 'Invalid date range' });
    }
    
    const totalPrice = days * car.dayPrice;

    const booking = await Book.create({
      carId,
      userId: req.userId,
      startDate,
      endDate,
      totalPrice,
    });

    return res.status(201).json(booking);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const getBookingByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const userBookings = await Book.findAll({
      where: {
        userId: userId,
      },
      include: [Car],
    });
    res.status(200).json(userBookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getBookingByCar = async (req, res) => {
  const { carId } = req.params;
  
  try {
    const carBookings = await Book.findAll({
      where: {
        carId: carId,
        status: {
          [Op.notIn]: ['cancelled', 'returned'],
        },
      },
    });
    res.status(200).json(carBookings);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAvailableCars = async (req, res) => {
  const { startDate, endDate } = req.body;

  try {
    const bookedCars = await Book.findAll({
      where: {
        startDate: {
          [Op.lte]: endDate,
        },
        endDate: {
          [Op.gte]: startDate,
        },
        status: {
          [Op.notIn]: ['cancelled', 'returned'],
        },
      },
      attributes: ['carId'],
      raw: true
    });

    const bookedCarIds = bookedCars.map(car => car.carId);

    const availableCars = await Car.findAll({
      where: {
        id: {
          [Op.notIn]: bookedCarIds
        }
      }
    });

    res.status(200).json(availableCars);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteBooking = async (req, res) => {
  const { id } = req.body;

  try {
    const booking = await Book.destroy({
      where: {
        id: id,
      },
    });

    if (booking) {
      res.status(200).json({ message: 'Booking deleted successfully' });
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const cancelBooking = async (req, res) => {
  const id = req.params.bookId;


  try {
    const booking = await Book.update({
      status: 'cancelled',
    }, {
      where: {
        id: id,
      },
    });

    if (booking) {
      res.status(200).json({ message: 'Booking cancelled successfully' });
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


module.exports = {
    create,
    getBookingByUser,
    getBookingByCar,
    getAvailableCars,
    deleteBooking,
    cancelBooking,
}