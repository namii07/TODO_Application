const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const { username, email, password, department, year, age } = req.body;

        // Validate input
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Please add all required fields: username, email, password' });
        }

        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Please add a valid email' });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        if (age !== undefined && (age < 0 || age > 150)) {
            return res.status(400).json({ message: 'Please provide a valid age' });
        }

        if (year !== undefined && (year < 1 || year > 6)) {
            return res.status(400).json({ message: 'Please provide a valid year' });
        }

        // Check if user exists (by email or username)
        const userExists = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists with this email or username' });
        }

        // Create user
        const user = await User.create({
            username,
            email,
            password,
            department,
            year,
            age
        });

        if (user) {
            return res.status(201).json({
                message: 'User registered successfully',
                userId: user.userId,
                username: user.username,
                email: user.email,
                department: user.department,
                year: user.year,
                age: user.age
            });
        } else {
            return res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error during registration', error: error.message });
    }
};

// @desc    Authenticate a user
// @route   POST /login
// @access  Public
const loginUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const loginIdentifier = email ? { email } : { username };

        if ((!email && !username) || !password) {
            return res.status(400).json({ message: 'Please provide email/username and password' });
        }

        const user = await User.findOne(loginIdentifier);

        if (user && (await user.matchPassword(password))) {
            return res.status(200).json({
                userId: user.userId,
                username: user.username,
                email: user.email,
                token: generateToken(user.userId),
            });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Server error during login', error: error.message });
    }
};

// @desc    Logout user
// @route   POST /logout
// @access  Protected
const logoutUser = async (req, res) => {
    try {
        return res.status(200).json({ message: 'User logged out successfully. Please remove token on client side.' });
    } catch (error) {
        return res.status(500).json({ message: 'Server error during logout', error: error.message });
    }
};

module.exports = { registerUser, loginUser, logoutUser };
