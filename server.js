// server.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');  // Added Helmet for security
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure Helmet with CSP
app.use(helmet({
  contentSecurityPolicy: {
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'", "'unsafe-inline'"],
      "style-src": ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      "font-src": ["'self'", "https://fonts.gstatic.com"]
    }
  }
}));

// Serve static files
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.static(path.join(__dirname, 'html')));
app.use(express.static(path.join(__dirname)));  // Serve root files if needed

// Import routes
const db = require('./backend/db');
const loginRoute = require('./backend/routerFiles/loginRoute');
const registerRoute = require('./backend/routerFiles/registerRoute');
const appointmentRoute = require('./backend/routerFiles/appointmentRoute');

// Use routes
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/appointments', appointmentRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
