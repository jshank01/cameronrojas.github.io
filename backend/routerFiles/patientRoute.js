const express = require('express');
const router = express.Router();

// Mock data for demonstration
const appointments = {
    'kthompson_patient': [
        { date: '2023-05-15', time: '10:00 AM', doctor: 'Dr. Smith', reason: 'Follow-up' }
    ],
    'nlee_patient': [
        { date: '2023-06-20', time: '2:00 PM', doctor: 'Dr. Brown', reason: 'Consultation' }
    ],
    'rmartinez_patient': [
        { date: '2023-07-25', time: '11:00 AM', doctor: 'Dr. Green', reason: 'Checkup' }
    ]
};

const prescriptions = {
    'kthompson_patient': [
        { name: 'Lisinopril', dosage: '10 mg', frequency: 'Daily' }
    ],
    'nlee_patient': [
        { name: 'Metformin', dosage: '500 mg', frequency: 'Twice daily' }
    ],
    'rmartinez_patient': [
        { name: 'Ibuprofen', dosage: '200 mg', frequency: 'As needed' }
    ]
};

const billing = {
    'kthompson_patient': [
        { chargeFor: 'Consultation', totalCharge: 150, chargeDate: '2023-04-10', paidOff: false }
    ],
    'nlee_patient': [
        { chargeFor: 'Blood Test', totalCharge: 80, chargeDate: '2023-03-15', paidOff: true }
    ],
    'rmartinez_patient': [
        { chargeFor: 'X-Ray', totalCharge: 200, chargeDate: '2023-02-20', paidOff: false }
    ]
};

// Route for fetching upcoming appointments by username
router.get('/appointments/:username', (req, res) => {
    const username = req.params.username;
    res.json(appointments[username] || []);
});

// Route for fetching prescriptions by username
router.get('/prescriptions/:username', (req, res) => {
    const username = req.params.username;
    res.json(prescriptions[username] || []);
});

// Route for fetching billing information by username
router.get('/billing/:username', (req, res) => {
    const username = req.params.username;
    res.json(billing[username] || []);
});

module.exports = router;
