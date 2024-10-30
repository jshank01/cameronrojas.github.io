// Server.js

const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const path = require('path');
const app = express();

// Middleware to add security headers
app.use(helmet());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// CORS configuration
const corsOptions = {
    origin: 'http://127.0.0.1:5500', // Allows your local frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};
app.use(cors(corsOptions));

// Serve the main index.html file from the root directory
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Serve static files from the 'html' folder (for any additional HTML files)
app.use('/html', express.static(path.join(__dirname, 'html')));

// Serve static files from the 'frontend' folder (for client-side JavaScript, CSS, etc.)
app.use('/frontend', express.static(path.join(__dirname, 'frontend')));

// Import and use backend routes from the 'routerFiles' folder
const loginRoute = require('./backend/routerFiles/loginRoute');
app.use('/login', loginRoute);

// Optional: Serve other static assets from root if needed (like root-level CSS or JS)
app.use(express.static(path.join(__dirname)));

// Set the port for Azure or default to 8080
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
