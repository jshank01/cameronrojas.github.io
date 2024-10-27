// Server Setup

// Import required modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Import and use only the login route file
const loginRoutes = require('./routerFiles/loginRoute'); // Handles login route

// Use the login route
app.use('/login', loginRoutes); // Adds login route for authentication

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
