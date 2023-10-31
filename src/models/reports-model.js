const mongoose = require('../db/db');

const reportSchema = new mongoose.Schema({
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  filename: String,
  path: String,
  state: Boolean,
  uploadDate: { type: Date, default: Date.now }
});

const Picture = mongoose.model('Report', reportSchema);
module.exports = Picture;
