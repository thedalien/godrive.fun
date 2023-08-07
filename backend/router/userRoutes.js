const express = require('express');
const router = express.Router();

// const middleware = require('../middleware');
const userController = require('../controllers/userController');

router.post('/login', userController.login);
router.post('/login/token', userController.loginToken);
router.post('/register', userController.register);


// router.get('/list', userController.list);

module.exports = router; 