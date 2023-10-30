const express = require('express');
const router = express.Router();
const userController = require('../controllers/transaction-controller');

router.post('/transaction/add/:senderId',userController.createTransaction);

module.exports = router;