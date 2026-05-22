// Import dependencies
const mongoose = require('mongoose');

// Create connection
const connectDb = async () => {
   try {
    // Connect MongoDB
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // Log success
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // Log Error
   } catch(error) {
    console.error(error);
    process.exit(1);
   }

};
// Export function
module.exports = connectDb;