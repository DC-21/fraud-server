const Admin = require('../models/admin-model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.addAdmin = async (req, res) => {
  try {
    const { username, password, email, full_name, } = req.body;

    // Check if the email already exists in the database
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ username, password: hashedPassword, email, full_name });

    await admin.save();
    res.status(201).json({ message: 'User registered successfully', admin });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'User registration failed' });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists with the provided email
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ error: 'Admin not found' });
    }

    // Compare the provided password with the stored hashed password
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Authentication successful; generate a JWT token
    const token = jwt.sign(
      {
        username: admin.username,
        email: admin.email,
        full_name: admin.full_name
      },
      'jfk403u4uo2u4a6e',
      { expiresIn: '1d' }
    );

    res.status(200).json({ message: 'Admin logged in successfully', token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Admin login failed' });
  }
};
