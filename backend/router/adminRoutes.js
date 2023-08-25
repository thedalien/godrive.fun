const express = require('express');
const router = express.Router();

const adminController = require('../controllers/adminController');
const {adminAuth} = require('../middleware/adminMiddleware');

console.log(typeof adminAuth);
router.get('/users/all', adminAuth, adminController.getUsers);
router.delete('/users/delete', adminAuth, adminController.deleteUser);
router.put('/users/block', adminAuth, adminController.blockUser);
router.put('/users/role', adminAuth, adminController.setUserRole);

module.exports = router;

