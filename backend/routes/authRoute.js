const express = require('express');
const { check } = require('express-validator');
const { registerUser, loginUser, getUserDetails, updateUserDetails } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Import your authentication middleware

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register a new user
router.post(
    '/register',
    [
        check('username', 'Username is required').notEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
    ],
    registerUser
);

// @route   POST /api/auth/login
// @desc    Login a user
router.post(
    '/login',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ],
    loginUser
);

// @route   GET /api/auth/me
// @desc    Get user details
router.get('/me', authMiddleware, getUserDetails);

// @route   PUT /api/auth/me
// @desc    Update user details
router.put('/me', authMiddleware, updateUserDetails);

module.exports = router;
