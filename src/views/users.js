// This file handles the rendering of the list of users view
export async function users() {
    return `
        <div class="p-6 max-w-6xl mx-auto">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Lista de Usuarios</h2>
            <div class="overflow-x-auto rounded-lg shadow">
                <table class="min-w-full bg-white divide-y divide-gray-200">
                    <thead class="bg-gray-100">
                        <tr>
                            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nombre</th>
                            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Correo</th>
                            <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Rol</th>
                            <th class="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
                        <tr class="hover:bg-gray-50 transition">
                            <td class="px-6 py-4 text-sm text-gray-700">1</td>
                            <td class="px-6 py-4 text-sm font-medium text-gray-900">Juan Pérez</td>
                            <td class="px-6 py-4 text-sm text-gray-700">juan.perez@example.com</td>
                            <td class="px-6 py-4 text-sm text-gray-700">Administrador</td>
                            <td class="px-6 py-4 text-center">
                                <button class="text-blue-600 hover:text-blue-800 text-sm font-semibold mr-2">Editar</button>
                                <button class="text-red-600 hover:text-red-800 text-sm font-semibold">Eliminar</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
}