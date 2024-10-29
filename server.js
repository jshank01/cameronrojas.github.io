// server.js

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        useDefaults: true,
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://clinic-website.azurewebsites.net"],
            styleSrc: ["'self'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
        },
    },
}));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files (HTML, CSS, JavaScript)
app.use(express.static(path.join(__dirname, 'frontend'))); // Adjust if frontend assets are in a subfolder

// Import routes
const db = require('./backend/db');
const loginRoute = require('./backend/routerFiles/loginRoute');
const registerRoute = require('./backend/routerFiles/registerRoute');
const appointmentRoute = require('./backend/routerFiles/appointmentRoute');

// Use routes
app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/appointments', appointmentRoute);

// Serve the index.html at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Adjust if index.html is in a specific folder like 'html'
});

// Set port and start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
