const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin-controller');

router.post('/admin/register', adminController.addAdmin);
router.post('/admin/login', adminController.loginAdmin);

module.exports = router;