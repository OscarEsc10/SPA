export async function eventsManagment() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (!user) {
      window.history.pushState({}, '', '/forbidden');
      window.dispatchEvent(new Event('popstate'));
      return '';
    }
  
    return `
      <div class="flex flex-col gap-6 items-start">
        <h2 class="text-2xl font-bold">Welcome, ${user.name}</h2>
  
        ${
          user.role === 'admin'
            ? `<p class="text-green-700 font-medium">Rol: Admin</p>`
            : ''
        }
  
        <button id="logout-btn" class="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
          Logout
        </button>
      </div>
    `;
  }
  