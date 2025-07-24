// This file handles the rendering and logic for the events management view
export async function eventsManagment() {
  const user = JSON.parse(localStorage.getItem('user'));
  if (!user) {
    return '';
  }

  return `
    <section>
      <h2 class="text-2xl font-bold mb-2">Bienvenido, ${user.name}</h2>
      <p class="mb-4 text-gray-700">Rol: <span class="font-semibold">${user.role === 'admin' ? 'Administrador' : 'Usuario'}</span></p>
      ${user.role === 'admin' ? `
        <div class="mb-4 p-2 bg-green-100 text-green-800 rounded">Tienes permisos de administrador.</div>
      ` : `
        <div class="mb-4 p-2 bg-blue-100 text-blue-800 rounded">Tienes permisos de usuario estándar.</div>
      `}
    </section>
  `;
}
