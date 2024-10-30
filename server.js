// Server.js

const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const path = require('path');
const app = express();

// Define CORS options for finer control
const corsOptions = {
    origin: 'http://127.0.0.1:5500', // Allow requests from this specific origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Allow cookies to be sent
    allowedHeaders: 'Content-Type,Authorization' // Allowed headers
};

app.use(helmet()); // Adds security headers
app.use(cors(corsOptions)); // Use CORS with the specified options
app.use(bodyParser.json());

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
