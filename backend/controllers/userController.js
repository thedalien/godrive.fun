const models = require('../models/index');
const User = models.users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Check for existing user
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    return res.status(409).send({ message: 'User already exists' });
}

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: 'user',
    status: 'not verified'
  });

    res.status(201).send({ message: 'User created', user, success: true });
};

const login = async (req, res) => {
    const { email, password } = req.body;

    // Check for existing user
    const user = await User.findOne({ where: { email } });
    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }
    // Check password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return res.status(401).send({ message: 'Invalid Password' });
    } else {
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).send({
            message: 'Login successful',
            user,
            success: true,
            token
        });
    }



};

const loginToken = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.send({success: true, decoded});
};


module.exports = {
    register,
    login,
    loginToken
};