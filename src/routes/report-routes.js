const express = require('express');
const router = express.Router();
const reportsController = require('../controllers/report-controller');
const upload = require('../config/multer');

router.post('/reports', upload.single('image'), reportsController.createReport);
router.get('/reports', reportsController.getReport);
router.get('/reports/:id', reportsController.getReportById);
router.get('/reports-true', reportsController.getReportsByStateTrue);
router.get('/reports-false', reportsController.getReportsByStateFalse);
router.put('/reports/:reportId', reportsController.updateReportState);

module.exports = router;