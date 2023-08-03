const models = require('../models/index');
const Car = models.cars;

const addCar = async (req, res) => {
    console.log(req.body);
    try {
        await Car.create({
            Brand: req.body.Brand,
        })
        res.send({ message: "Car was created successfully!" });
        console.log("Car was created successfully!");
    } catch (err) {
        res.status(500).send({ message: err.message });
        console.log(err.message);
    }
}

const list = async (req, res) => {
    try {
        const cars = await Car.findAll();
        res.send(cars);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
}


module.exports = { 
    addCar,
    list,
 }