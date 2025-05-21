const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

// Generate token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
};

// Register user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await userModel.getUserByEmail(email);
    if (existing) return res.status(400).json({ error: 'User already exists' });

    const user = await userModel.createUser(name, email, password);
    const token = generateToken(user.id);

    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed', details: error.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.getUserByEmail(email);
    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user.id);
    res.status(200).json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email }, token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
};

// Get current logged-in user
exports.getProfile = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.user.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile', details: error.message });
  }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users', details: error.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await userModel.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user', details: error.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await userModel.updateUser(req.params.id, name, email, password);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Update failed', details: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await userModel.deleteUser(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted successfully', user });
  } catch (error) {
    res.status(500).json({ error: 'Deletion failed', details: error.message });
  }
};
