// Import dependencies
const express = require('express');
const dotenv = require('dotenv');
const connectDb = require('./config/db');
const cors = require('cors');

//Initialize environment + database
dotenv.config();
connectDb();

// Create Express App
const app = express();
//Middleware
app.use(express.json);
app.use(cors());

// First API route
app.get('/', (req,res) => {
	res.send("API is running")
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


