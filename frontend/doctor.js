document.addEventListener('DOMContentLoaded', () => {
    const doctorId = sessionStorage.getItem('doctorId') || '1';

    // Load initial doctor data
    fetchDoctorData(doctorId);
    fetchPatients();
    fetchAppointments();

    // Event listeners for toggle buttons
    document.querySelector('button[data-section="patients-section"]').addEventListener('click', () => toggleSection('patients-section'));
    document.querySelector('button[data-section="appointments-section"]').addEventListener('click', () => toggleSection('appointments-section'));
    document.querySelector('button[data-section="medical-records-section"]').addEventListener('click', () => toggleSection('medical-records-section'));

    // Event listener for logout button
    document.getElementById('logoutButton').addEventListener('click', () => {
        window.location.href = '../index.html';
    });
});

function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.classList.toggle('active');
}

async function fetchDoctorData(doctorId) {
    try {
        const response = await fetch(`/doctor/${doctorId}`);
        if (response.ok) {
            const data = await response.json();
            document.getElementById('doctor-name').innerText = data.name || 'N/A';
            document.getElementById('doctor-specialization').innerText = data.specialization || 'N/A';
            document.getElementById('doctor-contact').innerText = data.contact || 'N/A';
        }
    } catch (error) {
        console.error("Error loading doctor information:", error);
    }
}

async function fetchPatients() {
    try {
        const response = await fetch(`/doctorActions/patients`);
        const patients = await response.json();
        const tableBody = document.getElementById('patients-table').querySelector('tbody');
        tableBody.innerHTML = '';
        patients.forEach(patient => {
            const row = `<tr><td>${patient.id}</td><td>${patient.name}</td><td>${patient.contact}</td></tr>`;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Error loading patients:", error);
    }
}

async function fetchAppointments() {
    try {
        const response = await fetch(`/doctorActions/appointments/1`);
        const appointments = await response.json();
        const tableBody = document.getElementById('appointments-table').querySelector('tbody');
        tableBody.innerHTML = '';
        appointments.forEach(appointment => {
            const row = `<tr><td>${appointment.patient_id}</td><td>${appointment.date}</td><td>${appointment.time}</td><td>${appointment.reason}</td></tr>`;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Error loading appointments:", error);
    }
}

async function fetchMedicalRecords() {
    const patientId = document.getElementById('patient-id-input').value;
    if (!patientId) return alert("Please enter a patient ID.");
    try {
        const response = await fetch(`/doctorActions/medicalRecords/${patientId}`);
        const records = await response.json();
        const tableBody = document.getElementById('medical-records-table').querySelector('tbody');
        tableBody.innerHTML = '';
        records.forEach(record => {
            const row = `<tr><td>${record.date}</td><td>${record.diagnosis}</td><td>${record.treatment}</td><td>${record.notes}</td></tr>`;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Error loading medical records:", error);
    }
}
