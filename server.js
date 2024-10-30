// server.js - azure launch

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const helmet = require('helmet');

const app = express();
app.use(helmet()); // Adds security headers
app.use(cors());
app.use(bodyParser.json());

// Add Content-Security-Policy header
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'");
    next();
});

// Serve static files
app.use(express.static(path.join(__dirname, 'html'))); // Main HTML files
app.use(express.static(path.join(__dirname, 'css')));  // CSS in the root directory
app.use(express.static(path.join(__dirname, 'frontend'))); // JS in the frontend folder

// Import routes
const db = require('./backend/db');
const loginRoute = require('./backend/routerFiles/loginRoute');
const registerRoute = require('./backend/routerFiles/registerRoute');
const appointmentRoute = require('./backend/routerFiles/appointmentRoute');

// Use routes
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/appointments', appointmentRoute);

// Default route for serving index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'html', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
