// Fetch user data from API and load into the table
async function loadUsers() {
    const usersTable = document.getElementById("container");

    try {
        const response = await fetch('https://localhost:44309/api/Admin/GetAllAdmins');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const users = await response.json();

        users.forEach(user => {
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <a href="/Users/edituser.html" onclick="editUser(${user.id}); return false;" class="btn btn-primary btn-sm">Edit</a>
                <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id}, this)">Delete</button>
            </td>
            `;

            usersTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        usersTable.innerHTML = `<tr><td colspan="5">Failed to load users.</td></tr>`;
    }
}

function editUser(id) {
    Swal.fire({
        title: 'Edit User',
        text: `You are editing user with ID: ${id}`,
        icon: 'info',
        confirmButtonText: 'OK'
    }).then(() => {
        localStorage.setItem("UserID", id);
        window.location.href = `/Users/edituser.html`; 
    });
}

async function deleteUser(id, buttonElement) {
    // Show SweetAlert confirmation dialog
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: `You are about to delete user with ID: ${id}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel'
    });

    // If confirmed
    if (result.isConfirmed) {
        const API = `https://localhost:44309/api/Admin/DeleteAdmin/${id}`;
        
        try {
            let response = await fetch(API, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                // Show success SweetAlert
                Swal.fire(
                    'Deleted!',
                    `User with ID ${id} has been deleted.`,
                    'success'
                );

                // Remove the row element from the table
                buttonElement.closest('tr').remove();
            } else {
                // Show error SweetAlert
                Swal.fire(
                    'Error!',
                    'There was a problem deleting the user.',
                    'error'
                );
            }
        } catch (error) {
            // Handle fetch error (network issue, etc.)
            Swal.fire(
                'Error!',
                'An error occurred while deleting the user.',
                'error'
            );
        }
    }
}

window.onload = loadUsers;
