const mongoose = require('mongoose');

/**
 * Connects to MongoDB Atlas using Mongoose.
 * Implements connection retry logic for robust production environments.
 * 
 * @param {number} retries - Number of allowed retries before crashing.
 * @param {number} delayMs - Delay in milliseconds between retries.
 */
const connectDB = async (retries = 5, delayMs = 5000) => {
  while (retries > 0) {
    try {
      // Attempt to connect to MongoDB Atlas. 
      // Note: Options like useNewUrlParser and useUnifiedTopology are deprecated in Mongoose v6+ 
      // and are no longer necessary. They are handled automatically.
      const conn = await mongoose.connect(process.env.MONGO_URI);

      // Log successful connection
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return; // Exit function on solid connection

    } catch (error) {
      console.error(`MongoDB Connection Error: ${error.message}`);
      retries -= 1;
      console.log(`Retries left: ${retries}`);

      if (retries === 0) {
        // Best Practice: Exit process if database connection strictly fails
        console.error('All retries failed. Exiting process...');
        process.exit(1);
      }

      // Wait for 'delayMs' milliseconds before trying again using a promise delay
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
};

module.exports = connectDB;
