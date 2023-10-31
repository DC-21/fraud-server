const mongoose = require('../db/db');
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
  username: String,
  full_name: String,
  phone_number: String,
  password: String,
  account_number: {
    type: Number,
    unique: true,
  },
  email: String,
  balance: Number,

  // Relationship with Expense
  transactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Transaction' }],

  // Relationship with Income
  reports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Report' }]
});

module.exports = mongoose.model('User', userSchema);