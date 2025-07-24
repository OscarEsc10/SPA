const registerSet = 'http://localhost:3000/users';

export async function registerLogic() {
    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form values
        const name = registerForm.name.value.trim();
        const email = registerForm.email.value.trim();
        const password = registerForm.password.value.trim();

        // Basic validation (could be expanded)
        if (!name || !email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        // Create user object
        const newUser = {
            name,
            email,
            password,
            role: 'user' // Default role
        };

        try {
            // Check if user already exists
            const checkRes = await fetch(`${registerSet}?email=${email}`);
            const existingUsers = await checkRes.json();
            if (existingUsers.length > 0) {
                alert('A user with this email already exists.');
                return;
            }

            // Register new user
            const response = await fetch(registerSet, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            });

            if (response.ok) {
                alert('Registration successful! You can now log in.');
                window.history.pushState({}, '', '/login');
                window.dispatchEvent(new Event('popstate'));
            } else {
                alert('Registration failed. Please try again.');
            }
        } catch (error) {
            alert('Error connecting to the server.');
            console.error(error);
        }
    });
}