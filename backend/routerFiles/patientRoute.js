const express = require('express');
const router = express.Router();

// Mock data for demonstration; replace this with actual database queries
const medicalHistoryData = [
    { date: '2023-01-15', condition: 'Hypertension' },
    { date: '2023-02-10', condition: 'Diabetes' }
];

const prescriptionsData = [
    { name: 'Lisinopril', dosage: '10 mg', frequency: 'Daily' },
    { name: 'Metformin', dosage: '500 mg', frequency: 'Twice a day' }
];

// Define route for medical history
router.get('/medicalHistory', (req, res) => {
    // Fetch medical history data from the database
    res.json(medicalHistoryData); // Replace with real data
});

// Define route for prescriptions
router.get('/prescriptions', (req, res) => {
    // Fetch prescriptions data from the database
    res.json(prescriptionsData); // Replace with real data
});

// Define route for allergies
router.get('/allergies', (req, res) => {
    const allergiesData = [
        { allergy: 'Peanuts', startDate: '2023-01-01', endDate: '2023-02-01', seasonal: false }
    ];
    res.json(allergiesData);
});

// Define route for immunizations
router.get('/immunizations', (req, res) => {
    const immunizationsData = [
        { vaccine: 'Flu Shot', vaxDate: '2023-01-10', cost: 30 }
    ];
    res.json(immunizationsData);
});

// Define route for past surgeries
router.get('/surgeries', (req, res) => {
    const surgeriesData = [
        { procedure: 'Appendectomy', date: '2020-05-15', bodyPart: 'Abdomen', cost: 5000 }
    ];
    res.json(surgeriesData);
});

// Define route for upcoming appointments
router.get('/appointments', (req, res) => {
    const appointmentsData = [
        { date: '2023-04-10', time: '10:00 AM', doctor: 'Dr. Smith', reason: 'Follow-up' }
    ];
    res.json(appointmentsData);
});

// Define route for billing information
router.get('/billing', (req, res) => {
    const billingData = [
        { chargeFor: 'Consultation', totalCharge: 150, chargeDate: '2023-03-20', paidOff: false }
    ];
    res.json(billingData);
});

module.exports = router;
