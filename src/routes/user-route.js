const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller');

router.post('/user/register', userController.registerUser);
router.post('/user/login', userController.loginUser);
router.put('/user/update/:id', userController.updateUser);
router.delete('/user/delete/:id', userController.deleteUser);
router.get('/user',userController.getAllUsers);
router.get('/user/:id',userController.getUserById);

module.exports = router;