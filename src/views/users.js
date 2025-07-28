export function usersView({ usersList = [], error = '' }) {
    return `
        <div class="p-6 max-w-6xl mx-auto h-full flex flex-col">
            <h2 class="text-2xl font-bold text-gray-800 mb-4">Users List</h2>
            ${error ? `<p class='text-red-600 mb-4'>${error}</p>` : ''}
            <form id="user-form" class="mb-6 flex flex-wrap gap-4 items-end">
                <input type="text" name="name" placeholder="Name" required class="border px-2 py-1 rounded" />
                <input type="email" name="email" placeholder="Email" required class="border px-2 py-1 rounded" />
                <select name="role" required class="border px-2 py-1 rounded">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <input type="password" name="password" placeholder="Password" required class="border px-2 py-1 rounded" />
                <button type="submit" class="bg-blue-600 text-white px-4 py-1 rounded cursor-pointer">Create</button>
            </form>
            <div class="flex-1 overflow-hidden rounded-lg shadow">
                <div class="h-full overflow-auto">
                    <table class="min-w-full bg-white divide-y divide-gray-200">
                        <thead class="bg-gray-100 sticky top-0 z-10">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Role</th>
                                <th class="px-6 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-100">
                            ${usersList.map(u => `
                                <tr class="hover:bg-gray-50 transition" data-id="${u.id}">
                                    <td class="px-6 py-4 text-sm text-gray-700">${u.id}</td>
                                    <td class="px-6 py-4 text-sm font-medium text-gray-900">${u.name}</td>
                                    <td class="px-6 py-4 text-sm text-gray-700">${u.email}</td>
                                    <td class="px-6 py-4 text-sm text-gray-700">${u.role}</td>
                                    <td class="px-6 py-4 text-center">
                                        <button class="edit-btn text-blue-600 hover:text-blue-800 text-sm font-semibold mr-2 cursor-pointer">Edit</button>
                                        <button class="delete-btn text-red-600 hover:text-red-800 text-sm font-semibold cursor-pointer">Delete</button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}