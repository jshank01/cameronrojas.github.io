// Server.js

const helmet = require('helmet');
const express = require('express');
const path = require('path');
const app = express();
app.use(helmet()); // Adds security headers
app.use(cors());
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
const routerFiles = require('./backend/routerFiles'); // Adjust path if needed
app.use(routerFiles); // assuming routerFiles exports a router

// Optional: Serve other static assets from root if needed (like root-level CSS or JS)
app.use(express.static(path.join(__dirname)));

// Set the port for Azure or default to 3000
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
