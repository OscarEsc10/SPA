export function setupLogoutButton() {
    console.log('[DEBUG] Intentando activar logout...');
  
    const btn = document.getElementById('logout-btn');
    const navbarBtn = document.getElementById('navbar-logout-btn');
    
    function logoutAction() {
      localStorage.removeItem('user');
      window.history.pushState({}, '', '/login');
      window.dispatchEvent(new Event('popstate'));
    }

    if (btn) {
      btn.addEventListener('click', logoutAction);
    } else {
      console.warn('[DEBUG] Botón logout no encontrado');
    }
    if (navbarBtn) {
      navbarBtn.addEventListener('click', logoutAction);
    } else {
      console.warn('[DEBUG] Botón logout navbar no encontrado');
    }
  } 