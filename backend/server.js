// Server Setup

// Import required modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Serve frontend static files
const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend')));

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../frontend')));

// Import and use route files
const appointmentRoutes = require('./routerFiles/appointment');
const billingRoutes = require('./routerFiles/billing');
const patientRoutes = require('./routerFiles/patient');
const loginRoutes = require('./routerFiles/login');
const adminRoutes = require('./routerFiles/admin');

app.use('/api/appointment', appointmentRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/patient', patientRoutes);
app.use('/login', loginRoutes);
app.use('/api/employee', adminRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
