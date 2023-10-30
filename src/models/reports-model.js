const mongoose = require('../db/db');
const Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;

// Create GridFS stream for uploading images using the existing Mongoose connection
const gfs = Grid(mongoose.connection.db);

const scamReportSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  account_number: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const ScamReport = mongoose.model('ScamReport', scamReportSchema);

module.exports = { ScamReport, gfs };
