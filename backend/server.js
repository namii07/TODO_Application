const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const utilRoutes = require('./routes/utilRoutes');
const todoRoutes = require('./routes/todoRoutes');

// Load environment variables early
dotenv.config();

// Create Express app instance
const app = express();

// --- Built-in Middleware ---
// Parse incoming requests with JSON payloads
app.use(express.json());

// Enable CORS — allow React dev server connections safely
app.use(
    cors({
        origin: ['http://localhost:5173', 'http://localhost:3000'],
        credentials: true,
    })
);

// --- Mount Application Routes ---
app.use('/', authRoutes);
app.use('/', userRoutes);
app.use('/', utilRoutes);
app.use('/todos', todoRoutes);

// --- Custom Error Handler Middleware ---
// Must be mounted after all valid routes
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

/**
 * Bootstraps the application.
 * Best Practice: Connect to the DB first, then start listening for HTTP requests.
 */
const startServer = async () => {
    try {
        // Wait for connection function resolving (supports retry logic from db.js)
        await connectDB();

        // Only trigger express.listen if the database connection was absolutely successful
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start application backend:', error);
        process.exit(1);
    }
};

// Execute Bootstrap
startServer();
