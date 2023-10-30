const mongoose = require('../db/db');
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
  username: String,
  full_name: String,
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
  reports: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ScamReport' }]
});

module.exports = mongoose.model('User', userSchema);