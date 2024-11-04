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

// Function to load medical history
function loadMedicalHistory() {
    fetch('https://clinic-website.azurewebsites.net/api/patient/medicalHistory')
        .then(response => response.json())
        .then(data => {
            let content = '';
            data.forEach(entry => {
                content += `<p>Date: ${entry.date}</p>`;
                content += `<p>Condition: ${entry.condition}</p>`;
                content += `<hr>`;
            });
            document.getElementById('medicalHistoryContent').innerHTML = content || 'No medical history found.';
        })
        .catch(error => {
            console.error('Error loading medical history:', error);
            document.getElementById('medicalHistoryContent').innerHTML = 'Error loading medical history.';
        });
}

// Function to load prescriptions
function loadPrescriptions() {
    fetch('https://clinic-website.azurewebsites.net/api/patient/prescriptions')
        .then(response => response.json())
        .then(data => {
            let content = '';
            data.forEach(entry => {
                content += `<p>Medicine: ${entry.name}</p>`;
                content += `<p>Dosage: ${entry.dosage}</p>`;
                content += `<p>Frequency: ${entry.frequency}</p>`;
                content += `<hr>`;
            });
            document.getElementById('prescriptionContent').innerHTML = content || 'No prescriptions found.';
        })
        .catch(error => {
            console.error('Error loading prescriptions:', error);
            document.getElementById('prescriptionContent').innerHTML = 'Error loading prescriptions.';
        });
}

// Function to load allergies
function loadAllergies() {
    fetch('https://clinic-website.azurewebsites.net/api/patient/allergies')
        .then(response => response.json())
        .then(data => {
            let content = '';
            data.forEach(entry => {
                content += `<p>Allergy: ${entry.allergy}</p>`;
                content += `<p>Start Date: ${entry.startDate}</p>`;
                content += `<p>End Date: ${entry.endDate}</p>`;
                content += `<p>Seasonal: ${entry.seasonal ? 'Yes' : 'No'}</p>`;
                content += `<hr>`;
            });
            document.getElementById('allergyContent').innerHTML = content || 'No allergies found.';
        })
        .catch(error => {
            console.error('Error loading allergies:', error);
            document.getElementById('allergyContent').innerHTML = 'Error loading allergies.';
        });
}

// Function to load immunizations
function loadImmunizations() {
    fetch('https://clinic-website.azurewebsites.net/api/patient/immunizations')
        .then(response => response.json())
        .then(data => {
            let content = '';
            data.forEach(entry => {
                content += `<p>Vaccine: ${entry.vaccine}</p>`;
                content += `<p>Date: ${entry.vaxDate}</p>`;
                content += `<p>Cost: $${entry.cost}</p>`;
                content += `<hr>`;
            });
            document.getElementById('immunizationContent').innerHTML = content || 'No immunizations found.';
        })
        .catch(error => {
            console.error('Error loading immunizations:', error);
            document.getElementById('immunizationContent').innerHTML = 'Error loading immunizations.';
        });
}

// Function to load past surgeries
function loadSurgeries() {
    fetch('https://clinic-website.azurewebsites.net/api/patient/surgeries')
        .then(response => response.json())
        .then(data => {
            let content = '';
            data.forEach(entry => {
                content += `<p>Procedure: ${entry.procedure}</p>`;
                content += `<p>Date: ${entry.date}</p>`;
                content += `<p>Body Part: ${entry.bodyPart}</p>`;
                content += `<p>Cost: $${entry.cost}</p>`;
                content += `<hr>`;
            });
            document.getElementById('surgeryContent').innerHTML = content || 'No surgeries found.';
        })
        .catch(error => {
            console.error('Error loading surgeries:', error);
            document.getElementById('surgeryContent').innerHTML = 'Error loading surgeries.';
        });
}

// Function to load upcoming appointments
function loadAppointments() {
    fetch('https://clinic-website.azurewebsites.net/api/patient/appointments')
        .then(response => response.json())
        .then(data => {
            let content = '';
            data.forEach(entry => {
                content += `<p>Date: ${entry.date}</p>`;
                content += `<p>Time: ${entry.time}</p>`;
                content += `<p>Doctor: ${entry.doctor}</p>`;
                content += `<p>Reason: ${entry.reason}</p>`;
                content += `<hr>`;
            });
            document.getElementById('appointmentContent').innerHTML = content || 'No upcoming appointments found.';
        })
        .catch(error => {
            console.error('Error loading appointments:', error);
            document.getElementById('appointmentContent').innerHTML = 'Error loading appointments.';
        });
}

// Function to load billing information
function loadBillingInfo() {
    fetch('https://clinic-website.azurewebsites.net/api/patient/billing')
        .then(response => response.json())
        .then(data => {
            let content = '';
            data.forEach(entry => {
                content += `<p>Charge For: ${entry.chargeFor}</p>`;
                content += `<p>Total Charge: $${entry.totalCharge}</p>`;
                content += `<p>Charge Date: ${entry.chargeDate}</p>`;
                content += `<p>Paid Off: ${entry.paidOff ? 'Yes' : 'No'}</p>`;
                content += `<hr>`;
            });
            document.getElementById('billingContent').innerHTML = content || 'No billing information found.';
        })
        .catch(error => {
            console.error('Error loading billing information:', error);
            document.getElementById('billingContent').innerHTML = 'Error loading billing information.';
        });
}