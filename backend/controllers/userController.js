const User = require('../models/User');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    try {
        // Check if the user already exists by email or username
        let user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            return res.status(400).json({ msg: 'User already exists with this email or username' });
        }

        // Create a new user
        user = new User({ username, email, password });
        await user.save();

        // Return success response without token
        return res.status(201).json({ msg: 'User registered successfully' });
    } catch (error) {
        console.error('Error during registration:', error);
        return res.status(500).json({ msg: 'Server error', error: error.message });
    }
};



exports.loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
};

// In your user controller file

exports.getUserDetails = async (req, res) => {
    try {
        // Find user by ID (from the token)
        const user = await User.findById(req.user).select('-password'); // Exclude password from response

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        res.json({ id: user._id, username: user.username, email: user.email });
    } catch (error) {
        console.error('Error fetching user details:', error);
        return res.status(500).json({ msg: 'Server error', error: error.message });
    }
};

// In your user controller file

exports.updateUserDetails = async (req, res) => {
    const { username, email } = req.body;

    try {
        // Find user by ID (from the token)
        let user = await User.findById(req.user);

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Update the user details
        if (username) user.username = username;
        if (email) user.email = email;

        // Save the updated user
        await user.save();

        res.json({ msg: 'User details updated successfully', user: { id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        console.error('Error updating user details:', error);
        return res.status(500).json({ msg: 'Server error', error: error.message });
    }
};
