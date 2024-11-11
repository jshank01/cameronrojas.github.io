const express = require('express');
const router = express.Router();
const db = require('../db'); // Adjust path if needed

// Route to get doctor details by ID
router.get('/:doctorId', async (req, res) => {
    const { doctorId } = req.params;
    try {
        const [doctor] = await db.query('SELECT * FROM Doctor WHERE doctor_id = ?', [doctorId]);
        if (doctor) {
            res.json({
                name: `${doctor.first_name} ${doctor.last_name}`,
                specialization: doctor.specialty,
                contact: doctor.contact || 'Not provided'
            });
        } else {
            res.status(404).json({ message: 'Doctor not found' });
        }
    } catch (error) {
        console.error('Error fetching doctor data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to get all patients under the doctor
router.get('/doctorActions/patients', async (req, res) => {
    try {
        const patients = await db.query('SELECT patient_id AS id, CONCAT(first_name, " ", last_name) AS name, phone_number AS contact FROM Patient');
        res.json(patients);
    } catch (error) {
        console.error('Error fetching patients:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to get all appointments for the doctor
router.get('/doctorActions/appointments/:doctorId', async (req, res) => {
    const { doctorId } = req.params;
    try {
        const appointments = await db.query(`
            SELECT a.patient_id, a.date, a.time, a.reason 
            FROM Appointment a 
            JOIN Doctor d ON a.doctor_id = d.doctor_id
            WHERE d.doctor_id = ?`, [doctorId]);
        res.json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to get medical records for a specific patient
router.get('/doctorActions/medicalRecords/:patientId', async (req, res) => {
    const { patientId } = req.params;
    try {
        const records = await db.query(`
            SELECT date, diagnosis, treatment, notes 
            FROM MedicalRecord 
            WHERE patient_id = ?`, [patientId]);
        res.json(records);
    } catch (error) {
        console.error('Error fetching medical records:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to add a new doctor
router.post('/doctorActions/add', async (req, res) => {
    const { first_name, last_name, phone_number, ssn, specialty, office_id } = req.body;

    // Validate the input
    if (!first_name || !last_name || !phone_number || !ssn || !specialty || !office_id) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Insert the new doctor into the database
        const result = await db.query(`
            INSERT INTO Doctor (first_name, last_name, phone_number, ssn, specialty, office_id)
            VALUES (?, ?, ?, ?, ?, ?)`, 
            [first_name, last_name, phone_number, ssn, specialty, office_id]);

        // Respond with success
        res.status(201).json({ message: 'Doctor added successfully', doctorId: result.insertId });
    } catch (error) {
        console.error('Error adding doctor:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
