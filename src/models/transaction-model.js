const mongoose = require('../db/db');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },
  receiver_number: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  // User reference
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = mongoose.model('Transaction', transactionSchema);
