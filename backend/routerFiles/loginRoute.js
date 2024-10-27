// Login Routing

const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => { // Change from '/login' to '/'
    console.log("Login attempt with:", req.body); // Log the login attempt details

    // Temporary redirect test
    res.json({ redirect: '/html/admin.html' }); // Return fixed redirect to test if it works
    return; // Stop further processing

    const { username, password } = req.body;

    try {
        // Check in Employee table
        const [employeeRows] = await db.query('SELECT * FROM Employee WHERE username = ? AND password = ?', [username, password]);
        
        if (employeeRows.length > 0) {
            const user = employeeRows[0];
            
            // Redirect based on employee role
            switch (user.role) {
                case 'doctor':
                    res.json({ redirect: '/html/doctor.html' });
                    break;
                case 'nurse':
                    res.json({ redirect: '/html/nurse.html' });
                    break;
                case 'receptionist':
                    res.json({ redirect: '/html/receptionist.html' });
                    break;
                case 'admin':
                    res.json({ redirect: '/html/admin.html' });
                    break;
                default:
                    res.status(401).json({ message: 'Role not recognized' });
            }
            return;
        }

        // Check in Patient table if not an Employee
        const [patientRows] = await db.query('SELECT * FROM Patient WHERE username = ? AND password = ?', [username, password]);
        if (patientRows.length > 0) {
            res.json({ redirect: '/html/patient.html' });
            return;
        }

        // If no match found
        res.status(401).json({ message: 'Invalid credentials' });
    } catch (error) {
        console.error("Error during login attempt:", error); // Log errors for debugging
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
