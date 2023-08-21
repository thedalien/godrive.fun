const jwt = require('jsonwebtoken');
const models = require('../models/index');
const User = models.users;

const tokenAuth = async (req, res, next) => {
  console.log('tokenAuth middleware');

  const token = req.headers.authorization;
  const bearerToken = token.split(' ')[1];
  let decodedToken;
  try {
    decodedToken = jwt.verify(bearerToken, process.env.JWT_SECRET);
    console.log('decodedToken', decodedToken);
  } catch (error) {
    console.error('Token verification failed:', error);
    return res.status(401).send({ message: 'Invalid token' });
  }
  const id = decodedToken.id;
  
  if (!id) {
    return res.status(401).send({ message: 'No user id provided' });
  }

  const user = await User.findOne({ where: { id: id } });
  if (!user) {
    return res.status(404).send({ message: 'User not found' });
  }

  req.userId = id;
  req.token = decodedToken;
  next();
}

module.exports = {
    tokenAuth
}