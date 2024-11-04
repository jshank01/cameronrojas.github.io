document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    if (username) {
        loadUpcomingAppointments(username);
    } else {
        console.error("No username provided in URL");
        document.getElementById('appointmentContent').innerHTML = 'Username is missing from the URL.';
        return; // Exit if no username
    }

    // Attach event listeners for buttons
    document.querySelector('button[data-section="prescriptions"]').addEventListener('click', () => {
        toggleSection('prescriptions');
        loadPrescriptions(username);
    });

    document.querySelector('button[data-section="billing-info"]').addEventListener('click', () => {
        toggleSection('billing-info');
        loadBillingInfo(username);
    });

        // Add event listener for logout button
        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                window.location.href = '../index.html'; // Redirects to the home or login page
            });
        }
});

// Toggle the visibility of a section
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.classList.toggle('active');
}

// Function to load upcoming appointments
function loadUpcomingAppointments(username) {
    fetch(`/api/patient/appointments/${username}`)
        .then(response => response.json())
        .then(data => {
            let content = '';
            data.forEach(appointment => {
                content += `<p>Date: ${appointment.date}</p>`;
                content += `<p>Time: ${appointment.time}</p>`;
                content += `<p>Doctor: ${appointment.doctor}</p>`;
                content += `<p>Reason: ${appointment.reason}</p>`;
                content += `<hr>`;
            });
            document.getElementById('appointmentContent').innerHTML = content || 'No upcoming appointments found.';
        })
        .catch(error => {
            console.error('Error loading upcoming appointments:', error);
            document.getElementById('appointmentContent').innerHTML = 'Error loading upcoming appointments.';
        });
}

// Function to load prescriptions
function loadPrescriptions(username) {
    fetch(`/api/patient/prescriptions/${username}`)
        .then(response => response.json())
        .then(data => {
            let content = '';
            data.forEach(prescription => {
                content += `<p>Medicine: ${prescription.name}</p>`;
                content += `<p>Dosage: ${prescription.dosage}</p>`;
                content += `<p>Frequency: ${prescription.frequency}</p>`;
                content += `<hr>`;
            });
            document.getElementById('prescriptionContent').innerHTML = content || 'No prescriptions found.';
        })
        .catch(error => {
            console.error('Error loading prescriptions:', error);
            document.getElementById('prescriptionContent').innerHTML = 'Error loading prescriptions.';
        });
}

// Function to load billing information
function loadBillingInfo(username) {
    fetch(`/api/patient/billing/${username}`)
        .then(response => response.json())
        .then(data => {
            let content = '';
            data.forEach(bill => {
                content += `<p>Charge For: ${bill.chargeFor}</p>`;
                content += `<p>Total Charge: $${bill.totalCharge}</p>`;
                content += `<p>Charge Date: ${bill.chargeDate}</p>`;
                content += `<p>Paid Off: ${bill.paidOff ? 'Yes' : 'No'}</p>`;
                content += `<hr>`;
            });
            document.getElementById('billingContent').innerHTML = content || 'No billing information found.';
        })
        .catch(error => {
            console.error('Error loading billing information:', error);
            document.getElementById('billingContent').innerHTML = 'Error loading billing information.';
        });
}
