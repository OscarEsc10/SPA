// Sets up the logout button(s) and handles logout logic
export function setupLogoutButton() {
    console.log('[DEBUG] Intentando activar logout...');
  
    // Get the main logout button
    const btn = document.getElementById('logout-btn');
    // Get the navbar logout button
    const navbarBtn = document.getElementById('navbar-logout-btn');
    
    // Function to perform logout actions
    function logoutAction() {
      // Remove user data from localStorage
      localStorage.removeItem('user');
      // Redirect to login page and trigger route change
      window.history.pushState({}, '', '/login');
      window.dispatchEvent(new Event('popstate'));
    }

    // Attach logout action to main logout button if it exists
    if (btn) {
      btn.addEventListener('click', logoutAction);
    } else {
      // Warn if main logout button is not found
      console.warn('[DEBUG] Botón logout no encontrado');
    }
    // Attach logout action to navbar logout button if it exists
    if (navbarBtn) {
      navbarBtn.addEventListener('click', logoutAction);
    } else {
      // Warn if navbar logout button is not found
      console.warn('[DEBUG] Botón logout navbar no encontrado');
    }
  } 

