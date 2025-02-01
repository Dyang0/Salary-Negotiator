document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('button').addEventListener('click', async () => {
        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        if (!email || !password) {
            alert('Please enter both email and password');
            return;
        }

        const response = await fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }) 
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('token', data.token); // Store token
            window.location.href = 'dashboard.html'; // Redirect after login
        } else {
            alert(data.message); // Show error message
        }
    });
});
