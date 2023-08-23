const jwt = require('jsonwebtoken');
const models = require('../models/index');
const User = models.users;

const adminAuth = async (req, res, next) => {
  console.log('adminAuth middleware');

  const authorizationHeader = req.headers.authorization || '';
  const tokenArray = authorizationHeader.split(' ');
  const tokenFromBody = req.body.token;
  const token = tokenFromBody || (tokenArray.length === 2 && tokenArray[0] === 'Bearer' ? tokenArray[1] : null);

  if (!token) {
    return res.status(401).send({ message: 'No token provided' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decodedToken', decodedToken);

    const id = decodedToken.id;

    if (!id) {
      throw new Error('No user id provided');
    }

    const user = await User.findOne({ where: { id: id } });
    console.log('user', user);

    if (!user) {
      throw new Error('User not found');
    }

    if (user.role !== 'admin') {
      throw new Error('User is not an admin');
    }

    req.userId = id;
    req.token = decodedToken;
    next();
  } catch (error) {
    console.error('Token verification failed:', error.message);
    return res.status(401).send({ message: 'Invalid token' });
  }
}

module.exports = {
  adminAuth
}
