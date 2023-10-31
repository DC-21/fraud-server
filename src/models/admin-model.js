const mongoose = require('../db/db');
const Schema = mongoose.Schema;
const adminSchema = new mongoose.Schema({
  username: String,
  full_name: String,
  password: String,
  email: String,
});

module.exports = mongoose.model('Admin', adminSchema);