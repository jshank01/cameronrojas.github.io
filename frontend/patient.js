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
    fetch('https://clinic-website.azurewebsites.net/api/medicalHistory')
        .then(response => response.json())
        .then(data => {
            document.getElementById('medicalHistoryContent').innerHTML = JSON.stringify(data);
        });
}

function loadPrescriptions() {
    // Fetch and display prescriptions
    fetch('https://clinic-website.azurewebsites.net/api/prescriptions')
        .then(response => response.json())
        .then(data => {
            document.getElementById('prescriptionContent').innerHTML = JSON.stringify(data);
        });
}

function loadAllergies() {
    // Fetch and display allergy data
    fetch('https://clinic-website.azurewebsites.net/api/allergies')
        .then(response => response.json())
        .then(data => {
            document.getElementById('allergyContent').innerHTML = JSON.stringify(data);
        });
}

function loadImmunizations() {
    // Fetch and display immunization records
    fetch('https://clinic-website.azurewebsites.net/api/immunizations')
        .then(response => response.json())
        .then(data => {
            document.getElementById('immunizationContent').innerHTML = JSON.stringify(data);
        });
}

function loadSurgeries() {
    // Fetch and display surgeries
    fetch('https://clinic-website.azurewebsites.net/api/surgeries')
        .then(response => response.json())
        .then(data => {
            document.getElementById('surgeryContent').innerHTML = JSON.stringify(data);
        });
}

function loadAppointments() {
    // Fetch and display upcoming appointments
    fetch('https://clinic-website.azurewebsites.net/api/appointments')
        .then(response => response.json())
        .then(data => {
            document.getElementById('appointmentContent').innerHTML = JSON.stringify(data);
        });
}

function loadBillingInfo() {
    // Fetch and display billing information
    fetch('https://clinic-website.azurewebsites.net/api/billing')
        .then(response => response.json())
        .then(data => {
            document.getElementById('billingContent').innerHTML = JSON.stringify(data);
        });
}