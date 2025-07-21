const users_api = 'http://localhost:3000/users';

export function setupLoginForm() {
  const form = document.getElementById('login-form');
  const errorMessage = document.getElementById('login-error');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    try {
      const response = await fetch(`${users_api}?email=${email}`);
      const users = await response.json();

      // Buscar usuario con email y contraseña correctos
      const user = users.find(u => u.password === password);

      if (user) {
        const { password, ...userWithoutPassword } = user;
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        window.history.pushState({}, '', '/dashboard');
        window.dispatchEvent(new Event('popstate'));
      } else {
        errorMessage.textContent = 'Wrong email or password';
      }

    } catch (error) {
      errorMessage.textContent = 'Error connecting to the server';
      console.error(error);
    }
  });
}

export function updateNavVisibility() {
  const user = JSON.parse(localStorage.getItem('user'));

  const loginLink = document.querySelector('a[href="/login"]');
  const registerLink = document.querySelector('a[href="/register"]');
  const logoutBtn = document.getElementById('logout-btn');
  const navbarLogoutBtn = document.getElementById('navbar-logout-btn');
  const dashboardLink = document.querySelector('a[href="/dashboard"]');
  const navbarUsername = document.getElementById('navbar-username');

  if (user) {
    if (loginLink) loginLink.classList.add('hidden');
    if (registerLink) registerLink.classList.add('hidden');
    if (logoutBtn) logoutBtn.classList.remove('hidden');
    if (navbarLogoutBtn) navbarLogoutBtn.classList.remove('hidden');
    if (dashboardLink) dashboardLink.classList.remove('hidden');
    if (navbarUsername) {
      navbarUsername.textContent = user.name;
      navbarUsername.classList.remove('hidden');
    }
  } else {
    if (loginLink) loginLink.classList.remove('hidden');
    if (registerLink) registerLink.classList.remove('hidden');
    if (logoutBtn) logoutBtn.classList.add('hidden');
    if (navbarLogoutBtn) navbarLogoutBtn.classList.add('hidden');
    if (dashboardLink) dashboardLink.classList.add('hidden');
    if (navbarUsername) {
      navbarUsername.textContent = '';
      navbarUsername.classList.add('hidden');
    }
  }
}
  