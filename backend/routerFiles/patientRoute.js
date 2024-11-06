const express = require('express');
const router = express.Router();

// Mock or Database Retrieval Functions
function getPaymentData(username) { /* Unique data for each patient */ }
function getReferralData(username) { /* Unique data for each patient */ }
function getMedicationData(username) { /* Unique data for each patient */ }
function getAllergyData(username) { /* Unique data for each patient */ }
function getIllnessData(username) { /* Unique data for each patient */ }
function getSurgeryData(username) { /* Unique data for each patient */ }
function getImmunizationData(username) { /* Unique data for each patient */ }
function getMedHistoryData(username) { /* Unique data for each patient */ }

// Routes for each section
router.get('/appointments/:username', (req, res) => { /* Existing route */ });
router.get('/prescriptions/:username', (req, res) => { /* Existing route */ });
router.get('/billing/:username', (req, res) => { /* Existing route */ });

// New routes for additional sections
router.get('/payment/:username', (req, res) => res.json(getPaymentData(req.params.username)));
router.get('/referrals/:username', (req, res) => res.json(getReferralData(req.params.username)));
router.get('/medications/:username', (req, res) => res.json(getMedicationData(req.params.username)));
router.get('/allergies/:username', (req, res) => res.json(getAllergyData(req.params.username)));
router.get('/illnesses/:username', (req, res) => res.json(getIllnessData(req.params.username)));
router.get('/surgeries/:username', (req, res) => res.json(getSurgeryData(req.params.username)));
router.get('/immunizations/:username', (req, res) => res.json(getImmunizationData(req.params.username)));
router.get('/med-history/:username', (req, res) => res.json(getMedHistoryData(req.params.username)));

module.exports = router;
