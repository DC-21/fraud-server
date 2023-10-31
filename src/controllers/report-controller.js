const Picture = require('../models/reports-model');

exports.createReport = async (req, res) => {
  try {
    const { uploadedBy, state } = req.body;

    // Get the dynamically generated filename and path from the uploaded file
    const { filename, path } = req.file;

    const report = new Picture({ uploadedBy, filename, path, state: state || false });
    await report.save();
    res.status(201).json(report);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error creating report' });
  }
}


exports.getReport = async (req, res) => {
  try {
    const reports = await Picture.find();
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching reports' });
  }
}

exports.getReportById = async (req, res) => {
  try {
    const report = await Picture.findById(req.params.id);
    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }
    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching report' });
  }
}

exports.getReportsByStateTrue = async (req, res) => {
  try {
    const reports = await Picture.find({ state: true });
    res.status(200).json(reports);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error fetching reports with state set to true' });
  }
};

// Controller for fetching reports with state set to false
exports.getReportsByStateFalse = async (req, res) => {
  try {
    const reports = await Picture.find({ state: false });
    res.status(200).json(reports);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error fetching reports with state set to false' });
  }
};

exports.updateReportState = async (req, res) => {
  try {
    const { reportId } = req.params;
    const { state } = req.body;

    // Find the report by ID
    const report = await Picture.findById(reportId);

    if (!report) {
      return res.status(404).json({ error: 'Report not found' });
    }

    // Update the state field
    report.state = state;
    await report.save();

    res.status(200).json(report);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error updating report state' });
  }
};
