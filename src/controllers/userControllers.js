// Handles the rendering of the events management view based on user authentication and role
export async function eventsManagment() {
    // Retrieve the current user from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
  
    // If no user is logged in, redirect to forbidden page
    if (!user) {
      window.history.pushState({}, '', '/forbidden');
      window.dispatchEvent(new Event('popstate'));
      return '';
    }
  
    // Return the HTML for the events management view
    return `
      <div class="flex flex-col gap-6 items-start">
        <h2 class="text-2xl font-bold">Welcome, ${user.name}</h2>
  
        ${
          // Show admin role message if user is admin
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
  