const express = require('express');
const router = express.Router();
const userController = require('../controllers/report-controller');
const upload = require('../config/multer');

router.post('/report', upload.single('image'), userController.createReport);
router.get('/reports', userController.getReport);
router.get('/reports/:id', userController.getReportById);
router.put('/reports/:id', userController.updateReport);

module.exports = router;