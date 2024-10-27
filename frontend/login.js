// Login Handling

document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log("Form submitted"); // Log form submission in the browser console

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:3000/login', { // Explicitly specify localhost:3000
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        console.log("Response status:", response.status); // Log the response status

        if (response.ok) {
            const data = await response.json();
            console.log("Received response:", data); // Log the received response
            if (data.redirect) {
                window.location.href = data.redirect; // Redirect if 'redirect' property exists
            } else {
                alert('Redirection path missing');
            }
        } else {
            console.log("Login failed, received status:", response.status); // Log status if not successful
            alert('Invalid login credentials');
        }
    } catch (error) {
        console.error('Error during login:', error);
        alert('Login failed, please try again later.');
    }
});
