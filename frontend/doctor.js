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

async function fetchDoctorData() {
    try {
        const response = await fetch(`/doctorActions/doctors`);
        const doctors = await response.json();
        const tableBody = document.getElementById('doctors-table').querySelector('tbody');
        tableBody.innerHTML = ''; // Clear existing rows
        
        doctors.forEach(doctor => {
            const row = document.createElement('tr');
            row.dataset.doctorId = doctor.id; // Store doctor ID for front-end-only deletion
            
            row.innerHTML = `
                <td>${doctor.firstName}</td>
                <td>${doctor.lastName}</td>
                <td>${doctor.specialty}</td>
                <td>${doctor.salary}</td>
                <td>${doctor.officeId}</td>
                <td>
                    <button onclick="editDoctor(${doctor.id})" class="edit-btn">Edit</button>
                    <button onclick="deleteDoctor(${doctor.id})" class="delete-btn">Delete</button>
                </td>
            `;
            
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error loading doctors:", error);
    }
}

function editDoctor(doctorId) {
    // Logic to edit a doctor (e.g., open an edit form or redirect to edit page)
    console.log("Edit doctor:", doctorId);
}

function deleteDoctor(doctorId) {
    // Find and remove the row from the table without affecting the database
    const tableBody = document.getElementById('doctors-table').querySelector('tbody');
    const rows = tableBody.querySelectorAll('tr');
    
    rows.forEach(row => {
        if (row.dataset.doctorId == doctorId) {
            tableBody.removeChild(row); // Remove the row from the table
        }
    });
    
    console.log("Deleted doctor from front end only:", doctorId);
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
