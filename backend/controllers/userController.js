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

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1w' });

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
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1w' });
        res.status(200).send({
            message: 'Login successful',
            user,
            success: true,
            token
        });
    }



};

const loginToken = async (req, res) => {
    console.log('loginToken userController');
  
    const authorizationHeader = req.headers.authorization || '';
    const tokenArray = authorizationHeader.split(' ');
    const tokenFromBody = req.body.token;
    const token = tokenFromBody || (tokenArray.length === 2 && tokenArray[0] === 'Bearer' ? tokenArray[1] : null);
  
    if (!token) {
      return res.status(401).send({ message: 'No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
  
      if (!decoded || !decoded.id) {
        throw new Error('Invalid token structure');
      }
  
      const user = await User.findOne({ where: { id: decoded.id } });
  
      if (!user) {
        throw new Error('User not found');
      }
  
      return res.status(200).send({ message: 'Valid token', success: true, user });
    } catch (error) {
      console.error('Token verification failed:', error.message);
      return res.status(401).send({ message: 'Invalid token' });
    }
  };
  

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, newPassword, currentPassword } = req.body;

    const user = await User.findOne({ where: { id } });
    // Check password
    const validPassword = await bcrypt.compare(currentPassword, user.password);
    if (!validPassword) {
        return res.status(401).send({ message: 'Invalid Password' });
    }
    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.update({ name, email, password: hashedPassword }, { where: { id } })
    .then(num => {
        if (num == 1) {
            res.status(200).send({ message: 'User updated successfully' });
        } else {
            res.status(400).send({ message: 'Error updating user' });
        }
    })
    .catch(err => {
        res.status(500).send({ message: 'Error updating user' });
    });
};

module.exports = {
    register, 
    login,
    loginToken,
    updateUser,
};