// Base URL for the users API
const users_api = 'http://localhost:3000/users';

// Get all users from the API
export async function getUsers() {
  const res = await fetch(users_api);
  if (!res.ok) throw new Error('Error fetching users');
  return await res.json();
}

// Create a new user
export async function createUser(user) {
  const res = await fetch(users_api, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
  if (!res.ok) throw new Error('Error creating user');
  return await res.json();
}

// Update an existing user
export async function updateUser(id, user) {
  const res = await fetch(`${users_api}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
  if (!res.ok) throw new Error('Error updating user');
  return await res.json();
}

// Delete a user by ID
export async function deleteUser(id) {
  const res = await fetch(`${users_api}/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Error deleting user');
  return true;
}

// Setup CRUD event handlers after rendering the users view
export function setupUsersCrudEvents() {
    // Create user form handler
    const form = document.getElementById('user-form');
    if (form) {
        form.onsubmit = async function(e) {
            e.preventDefault();
            try {
                const user = {
                    name: form.name.value,
                    email: form.email.value,
                    role: form.role.value, // Fixed: changed from 'rol' to 'role' to match database
                    password: form.password.value
                };
                await createUser(user);
                // Clear form after successful creation
                form.reset();
                // Refresh the page to show the new user
                window.history.replaceState({}, '', '/users');
                window.dispatchEvent(new Event('popstate'));
            } catch (error) {
                console.error('Error creating user:', error);
                alert('Error creating user. Please try again.');
            }
        };
    }
    
    // Delete user button handlers
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.onclick = async function() {
            const id = this.closest('tr').dataset.id;
            if (confirm('Are you sure you want to delete this user?')) {
                try {
                    await deleteUser(id);
                    // Refresh the page to update the user list
                    window.history.replaceState({}, '', '/users');
                    window.dispatchEvent(new Event('popstate'));
                } catch (error) {
                    console.error('Error deleting user:', error);
                    alert('Error deleting user. Please try again.');
                }
            }
        };
    });
    
    // Edit user button handlers
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.onclick = function() {
            const tr = this.closest('tr');
            const id = tr.dataset.id;
            const name = tr.children[1].textContent;
            const email = tr.children[2].textContent;
            const role = tr.children[3].textContent; // Fixed: changed from 'rol' to 'role'
            
            // Replace table row with editable inputs
            tr.innerHTML = `
                <td class='px-6 py-4 text-sm text-gray-700'>${id}</td>
                <td><input value='${name}' class='border px-2 py-1 rounded' /></td>
                <td><input value='${email}' class='border px-2 py-1 rounded' /></td>
                <td><select class='border px-2 py-1 rounded'><option value='user' ${role==='user'?'selected':''}>User</option><option value='admin' ${role==='admin'?'selected':''}>Admin</option></select></td>
                <td class='text-center'>
                    <button class='save-btn text-green-600 hover:text-green-800 text-sm font-semibold mr-2'>Save</button>
                    <button class='cancel-btn text-gray-600 hover:text-gray-800 text-sm font-semibold'>Cancel</button>
                </td>
            `;
            
            // Save button handler
            tr.querySelector('.save-btn').onclick = async function() {
                try {
                    const newName = tr.children[1].querySelector('input').value;
                    const newEmail = tr.children[2].querySelector('input').value;
                    const newRole = tr.children[3].querySelector('select').value; // Fixed: changed from 'newRol' to 'newRole'
                    await updateUser(id, { name: newName, email: newEmail, role: newRole }); // Fixed: changed from 'rol' to 'role'
                    // Refresh the page to show updated data
                    window.history.replaceState({}, '', '/users');
                    window.dispatchEvent(new Event('popstate'));
                } catch (error) {
                    console.error('Error updating user:', error);
                    alert('Error updating user. Please try again.');
                }
            };
            
            // Cancel button handler
            tr.querySelector('.cancel-btn').onclick = function() {
                // Refresh the page to revert changes
                window.history.replaceState({}, '', '/users');
                window.dispatchEvent(new Event('popstate'));
            };
        };
    });
}
