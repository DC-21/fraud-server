const User = require("../models/user-model");
const Transaction = require("../models/transaction-model");

exports.createTransaction = async (req, res) => {
  try {
    const { senderId } = req.params;
    const { receiver_number, amount } = req.body;

    const sender = await User.findById(senderId).populate('transactions');
    if (!sender) {
      return res.status(404).json({ error: "Sender not found" });
    }

    console.log("Receiver number:", receiver_number);

    const receiver = await User.findOne({ account_number: receiver_number });
    console.log("Receiver found:", receiver);

    if (!receiver) {
      return res.status(400).json({ error: "Receiver account not found" });
    }

    // Create the transaction with sender and receiver information
    const newTransaction = new Transaction({
      date: new Date(),
      amount,
      receiver_number: receiver_number,
      user: sender._id,
    });

    // Deduct the amount from the sender's balance and add it to the receiver's balance
    sender.balance -= amount;
    receiver.balance += amount;

     // Push the new transaction to the sender's transactions array
     sender.transactions.push(newTransaction._id);

    await sender.save();
    await receiver.save();
    const savedTransaction = await newTransaction.save();

    // Return the saved transaction as a response
    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
