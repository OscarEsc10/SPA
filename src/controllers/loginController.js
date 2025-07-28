

// API endpoint for users
const users_api = 'http://localhost:3000/users';

// Sets up the login form event listener and handles login logic
export function setupLoginForm() {
  const form = document.getElementById('login-form');
  const errorMessage = document.getElementById('login-error');

  // Listen for form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    try {
      // Fetch users with the given email from the API
      const response = await fetch(`${users_api}?email=${email}`);
      const users = await response.json();

      // Find user with matching password
      const user = users.find(u => u.password === password);

      if (user) {
        // Remove password before saving user data to localStorage for security
        const { password, ...userWithoutPassword } = user;
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        updateNavVisibility();
        // Redirect to dashboard and trigger route change
        window.history.pushState({}, '', '/dashboard');
        window.dispatchEvent(new Event('popstate'));
      } else {
        // Show error if credentials are incorrect
        errorMessage.textContent = 'Wrong email or password';
      }

    } catch (error) {
      // Show error if there is a server connection issue
      errorMessage.textContent = 'Error connecting to the server';
      console.error(error);
    }
  });
}

// Updates the visibility of navigation elements based on user login state and role
export function updateNavVisibility(e) {
  const user = JSON.parse(localStorage.getItem('user'));

  // Get all navigation elements that need to be shown/hidden
  const loginLink = document.querySelector('a[href="/login"]');
  const registerLink = document.querySelector('a[href="/register"]');
  const logoutBtn = document.getElementById('logout-btn');
  const navbarLogoutBtn = document.getElementById('navbar-logout-btn');
  const dashboardLink = document.querySelector('a[href="/dashboard"]');
  const navbarUsername = document.getElementById('navbar-username');
  const usersLink = document.querySelector('a[href="/users"]');

  if (user) {
    // User is logged in - hide login/register links, show logout and dashboard
    if (loginLink) loginLink.classList.add('hidden');
    if (registerLink) registerLink.classList.add('hidden');
    if (logoutBtn) logoutBtn.classList.remove('hidden');
    if (navbarLogoutBtn) navbarLogoutBtn.classList.remove('hidden');
    if (dashboardLink) dashboardLink.classList.remove('hidden');
    
    // Only show users link if user is admin
    if (usersLink) {
      if (user.role === 'admin') {
        usersLink.classList.remove('hidden');
      } else {
        usersLink.classList.add('hidden');
      }
    }
    
    // Display username in navbar
    if (navbarUsername) {
      navbarUsername.textContent = user.name;
      navbarUsername.classList.remove('hidden');
    }
  } else {
    // User is not logged in - show login/register links, hide logout and dashboard
    if (loginLink) loginLink.classList.remove('hidden');
    if (registerLink) registerLink.classList.remove('hidden');
    if (logoutBtn) logoutBtn.classList.add('hidden');
    if (navbarLogoutBtn) navbarLogoutBtn.classList.add('hidden');
    if (dashboardLink) dashboardLink.classList.add('hidden');
    if (usersLink) usersLink.classList.add('hidden');
    
    // Clear and hide username in navbar
    if (navbarUsername) {
      navbarUsername.textContent = '';
      navbarUsername.classList.add('hidden');
    }
  }
}
