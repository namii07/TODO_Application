const User = require('../models/User');

// @desc    Get user data
// @route   GET /getuser
// @access  Protected
const getUser = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(req.user);
    } catch (error) {
        return next(error);
    }
};

// @desc    Update user data
// @route   PATCH /updateuser
// @access  Protected
const updateUser = async (req, res, next) => {
    try {
        const { department, year, age } = req.body;

        // Ensure req.user exists before querying mapping (Prevents 'next is not a function' mapping crashes)
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: 'Unauthorized access' });
        }

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({ message: 'User not found in system' });
        }

        // Apply specific field updates
        if (department !== undefined) user.department = department;

        if (year !== undefined) {
            if (year < 1 || year > 6) {
                return res.status(400).json({ message: 'Please provide a valid year between 1 and 6' });
            }
            user.year = year;
        }

        if (age !== undefined) {
            if (age < 0 || age > 150) {
                return res.status(400).json({ message: 'Please provide a valid age' });
            }
            user.age = age;
        }

        const updatedUser = await user.save();

        return res.status(200).json({
            message: 'User updated successfully',
            userId: updatedUser.userId,
            username: updatedUser.username,
            email: updatedUser.email,
            department: updatedUser.department,
            year: updatedUser.year,
            age: updatedUser.age
        });
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getUser,
    updateUser
};
