// registerRoute.js

const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/', async (req, res) => {
    const { username, password, role } = req.body;
    console.log("Registration attempt:", req.body);

    try {
        // Check if the username already exists
        const [existingUser] = await db.query('SELECT * FROM Users WHERE username = ?', [username]);
        if (existingUser.length > 0) {
            return res.status(409).json({ message: 'Username already taken' });
        }

        // Insert new user into Users table
        await db.query('INSERT INTO Users (username, password, role) VALUES (?, ?, ?)', [username, password, role]);
        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error("Error during registration:", error.message);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
