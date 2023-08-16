//MAG just curious what's going to go here? It would be nice to start practicing!

const tokenAuth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send({ message: 'No token provided' });
      }
      
      const parts = req.headers.authorization.split(' ');
      
      if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).send({ message: 'Invalid authorization header format' });
      }
      
      const token = parts[1];
      let decodedToken;
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        decodedToken = decoded;
      } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(401).send({ message: 'Invalid token' });
      }
    req.userId = decodedToken.payload.id;
    req.token = decodedToken;
  next();
}

module.exports = {
    tokenAuth
}