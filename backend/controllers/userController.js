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
    password: hashedPassword
  });

  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1w' });

    res.status(201).send({ message: 'User created', user, success: true, token: token });
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
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1w' });
        res.status(200).send({
            message: 'Login successful',
            user,
            success: true,
            token
        });
    }



};

const loginToken = async (req, res) => {
    // console.log(req.headers);
    console.log(req.headers.authorization);
    
    if (!req.headers.authorization) {
      return res.status(401).send({ message: 'No token provided' });
    }
    
    const parts = req.headers.authorization.split(' ');
    
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return res.status(401).send({ message: 'Invalid authorization header format' });
    }
    
    const token = parts[1];
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      return res.status(200).send({ message: 'Valid token', success: true });
    } catch (error) {
      console.error('Token verification failed:', error);
      return res.status(401).send({ message: 'Invalid token' });
    }
  };
  


module.exports = {
    register, 
    login,
    loginToken
};