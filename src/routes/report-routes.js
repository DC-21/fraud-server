const express = require('express');
const router = express.Router();
const userController = require('../controllers/report-controller');
const upload = require('../config/multer');

router.post('/reports', upload.single('image'), userController.createReport);
router.get('/reports', userController.getReport);
router.get('/reports/:id', userController.getReportById);
router.put('/reports/:reportId', userController.updateReportState);

module.exports = router;