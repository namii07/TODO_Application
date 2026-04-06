const express = require('express');
const router = express.Router();
const { getUser, updateUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// Route path relative to where it is used (since both getuser and updateuser are root-level of this router, and we will mount it properly in server.js)
// Assuming server.js mounts like app.use('/', userRoutes); as per specifications
router.get('/getuser', protect, getUser);
router.patch('/updateuser', protect, updateUser);

module.exports = router;
