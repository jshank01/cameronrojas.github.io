document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    if (username) {
        loadUpcomingAppointments(username);
    } else {
        console.error("No username provided in URL");
        document.getElementById('appointmentContent').innerHTML = 'Username is missing from the URL.';
        return;
    }

    // Attach event listeners for toggle buttons
    document.querySelectorAll('.toggle-button').forEach(button => {
        button.addEventListener('click', () => {
            const sectionId = button.getAttribute('data-section');
            toggleSection(sectionId, button, username);
        });
    });

    // Logout button
    document.getElementById('logoutButton').addEventListener('click', () => {
        window.location.href = '../index.html';
    });
});

function toggleSection(sectionId, button, username) {
    const section = document.getElementById(sectionId);
    section.classList.toggle('active');
    button.textContent = section.classList.contains('active') ? `- ${button.textContent.slice(2)}` : `+ ${button.textContent.slice(2)}`;

    // Load data based on section
    switch(sectionId) {
        case 'prescriptions': loadPrescriptions(username); break;
        case 'billing-info': loadBillingInfo(username); break;
        case 'payment': loadPayment(username); break;
        case 'referrals': loadReferrals(username); break;
        case 'medications': loadMedications(username); break;
        case 'allergies': loadAllergies(username); break;
        case 'illnesses': loadIllnesses(username); break;
        case 'surgeries': loadSurgeries(username); break;
        case 'immunizations': loadImmunizations(username); break;
        case 'med-history': loadMedHistory(username); break;
    }
}

function loadUpcomingAppointments(username) { /* Existing function for appointments */ }
function loadPrescriptions(username) { /* Existing function for prescriptions */ }
function loadBillingInfo(username) { /* Existing function for billing */ }

// New functions for additional sections
function loadPayment(username) { /* Fetch and display payment data */ }
function loadReferrals(username) { /* Fetch and display referral data */ }
function loadMedications(username) { /* Fetch and display medication data */ }
function loadAllergies(username) { /* Fetch and display allergy data */ }
function loadIllnesses(username) { /* Fetch and display illness data */ }
function loadSurgeries(username) { /* Fetch and display surgery data */ }
function loadImmunizations(username) { /* Fetch and display immunization data */ }
function loadMedHistory(username) { /* Fetch and display medical history data */ }
