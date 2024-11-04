document.addEventListener('DOMContentLoaded', () => {
    loadMedicalHistory();
    loadPrescriptions();
    loadAllergies();
    loadImmunizations();
    loadSurgeries();
    loadAppointments();
    loadBillingInfo();
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            window.location.href = '../index.html';
        });
    }
});

function loadMedicalHistory() {
    // Fetch and display medical history data
    fetch('/api/medicalHistory')
        .then(response => response.json())
        .then(data => {
            document.getElementById('medicalHistoryContent').innerHTML = JSON.stringify(data);
        });
}

function loadPrescriptions() {
    // Fetch and display prescriptions
    fetch('/api/prescriptions')
        .then(response => response.json())
        .then(data => {
            document.getElementById('prescriptionContent').innerHTML = JSON.stringify(data);
        });
}

function loadAllergies() {
    // Fetch and display allergy data
    fetch('/api/allergies')
        .then(response => response.json())
        .then(data => {
            document.getElementById('allergyContent').innerHTML = JSON.stringify(data);
        });
}

function loadImmunizations() {
    // Fetch and display immunization records
    fetch('/api/immunizations')
        .then(response => response.json())
        .then(data => {
            document.getElementById('immunizationContent').innerHTML = JSON.stringify(data);
        });
}

function loadSurgeries() {
    // Fetch and display surgeries
    fetch('/api/surgeries')
        .then(response => response.json())
        .then(data => {
            document.getElementById('surgeryContent').innerHTML = JSON.stringify(data);
        });
}

function loadAppointments() {
    // Fetch and display upcoming appointments
    fetch('/api/appointments')
        .then(response => response.json())
        .then(data => {
            document.getElementById('appointmentContent').innerHTML = JSON.stringify(data);
        });
}

function loadBillingInfo() {
    // Fetch and display billing information
    fetch('/api/billing')
        .then(response => response.json())
        .then(data => {
            document.getElementById('billingContent').innerHTML = JSON.stringify(data);
        });
}