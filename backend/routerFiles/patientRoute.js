const express = require('express');
const router = express.Router();

// Mock data for demonstration; replace these with actual database queries
const medicalHistoryData = {
    kthompson_patient: [
        { date: '2023-01-15', condition: 'Hypertension' },
        { date: '2023-02-10', condition: 'Diabetes' }
    ],
    nlee_patient: [
        { date: '2022-11-05', condition: 'Asthma' }
    ],
    rmartinez_patient: [
        { date: '2023-03-12', condition: 'Anemia' }
    ]
};

const prescriptionsData = {
    kthompson_patient: [
        { name: 'Lisinopril', dosage: '10 mg', frequency: 'Daily' },
        { name: 'Metformin', dosage: '500 mg', frequency: 'Twice a day' }
    ],
    nlee_patient: [
        { name: 'Albuterol', dosage: '2 puffs', frequency: 'As needed' }
    ],
    rmartinez_patient: [
        { name: 'Iron Supplement', dosage: '100 mg', frequency: 'Daily' }
    ]
};

const appointmentsData = {
    kthompson_patient: [
        { date: '2023-04-10', time: '10:00 AM', doctor: 'Dr. Smith', reason: 'Follow-up' }
    ],
    nlee_patient: [
        { date: '2023-05-15', time: '2:00 PM', doctor: 'Dr. Adams', reason: 'Check-up' }
    ],
    rmartinez_patient: [
        { date: '2023-06-20', time: '11:00 AM', doctor: 'Dr. Brown', reason: 'Consultation' }
    ]
};

const billingData = {
    kthompson_patient: [
        { chargeFor: 'Consultation', totalCharge: 150, chargeDate: '2023-03-20', paidOff: false }
    ],
    nlee_patient: [
        { chargeFor: 'Check-up', totalCharge: 200, chargeDate: '2023-04-10', paidOff: true }
    ],
    rmartinez_patient: [
        { chargeFor: 'Consultation', totalCharge: 300, chargeDate: '2023-05-05', paidOff: false }
    ]
};

// Define route for upcoming appointments
router.get('/appointments/:username', (req, res) => {
    const username = req.params.username;
    const appointments = appointmentsData[username] || [];
    res.json(appointments);
});

// Define route for prescriptions
router.get('/prescriptions/:username', (req, res) => {
    const username = req.params.username;
    const prescriptions = prescriptionsData[username] || [];
    res.json(prescriptions);
});

// Define route for billing information
router.get('/billing/:username', (req, res) => {
    const username = req.params.username;
    const billing = billingData[username] || [];
    res.json(billing);
});

// Define route for medical history
router.get('/medicalHistory/:username', (req, res) => {
    const username = req.params.username;
    const history = medicalHistoryData[username] || [];
    res.json(history);
});

module.exports = router;
