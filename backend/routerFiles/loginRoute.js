// loginRoute.js - Enhanced Logging for Debugging

const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    console.log("Login attempt with:", req.body);

    try {
        // Check in Employee table
        console.log("Querying Employee table...");
        const [employeeRows] = await db.query(
            'SELECT * FROM Employee WHERE username = ? AND password = ?', 
            [username, password]
        );
        console.log("Employee query result:", employeeRows);

        if (employeeRows.length > 0) {
            const user = employeeRows[0];
            console.log("Employee found with role:", user.role);

            // Redirect based on employee role
            let redirectPath = '';
            switch (user.role) {
                case 'doctor':
                    redirectPath = '/html/doctor.html';
                    break;
                case 'nurse':
                    redirectPath = '/html/nurse.html';
                    break;
                case 'receptionist':
                    redirectPath = '/html/receptionist.html';
                    break;
                case 'admin':
                    redirectPath = '/html/admin.html';
                    break;
                default:
                    return res.status(401).json({ message: 'Role not recognized' });
            }
            console.log("Redirecting to:", redirectPath);
            return res.json({ redirect: redirectPath });
        }

        // Check in Patient table if not an Employee
        console.log("Querying Patient table...");
        const [patientRows] = await db.query(
            'SELECT * FROM Patient WHERE username = ? AND password = ?', 
            [username, password]
        );
        console.log("Patient query result:", patientRows);

        if (patientRows.length > 0) {
            const redirectPath = '/html/patient.html';
            console.log("Redirecting patient to:", redirectPath);
            return res.json({ redirect: redirectPath });
        }

        // If no match found
        console.log("No matching credentials found");
        res.status(401).json({ message: 'Invalid credentials' });
    } catch (error) {
        console.error("Detailed error during login attempt:", error.message);
        console.error("Stack trace:", error.stack); // Logs stack trace for more context
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
