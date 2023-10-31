const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { sendOTPviaSMS } = require('../../otp/send-sms');

// Function to generate a random OTP
function generateOTP() {
  return crypto.randomBytes(3).toString('hex').toUpperCase();
}

exports.registerUser = async (req, res) => {
  try {
    const { username,phone_number, password, email, full_name,account_number,balance } = req.body;

    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username,phone_number, password: hashedPassword, email, full_name,account_number,balance });

    await user.save();
    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'User registration failed' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists with the provided email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Authentication successful; generate a JWT token
    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        phone_number: user.phone_number,
      },
      'lswek3u4uo2u4a6e',
      { expiresIn: '1d' }
    );
    const otp = generateOTP();
    sendOTPviaSMS(user.phone_number, otp);


    res.status(200).json({ message: 'User logged in successfully', token });
  } catch (error) {
    res.status(500).json({ error: 'User login failed' });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update the user's data based on the request body
    if (updateData.username) {
      user.username = updateData.username;
    }
    if (updateData.full_name) {
      user.full_name = updateData.full_name;
    }
    if (updateData.password) {
      user.password = await bcrypt.hash(updateData.password, 10);
    }

    await user.save();

    res.status(200).json({ message: 'User details updated successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'User details update failed' });
  }
};

    // Retrieve all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findByIdAndRemove(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'User deletion failed' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
};