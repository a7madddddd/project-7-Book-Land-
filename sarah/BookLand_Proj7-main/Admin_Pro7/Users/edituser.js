const userID = localStorage.getItem("UserID");
const API = `https://localhost:44309/api/Admin/UpdateAdmin/${userID}`;

// Handle form submission
async function updateAdmin(event) {
    event.preventDefault();

    // Get form data
    const form = document.getElementById("form");
    const formData = new FormData(form);
    try {
        // Send PUT request
        const response = await fetch(API, {
            method: "PUT",
            body: formData
        });

        if (response.ok) {
            Swal.fire({
                title: 'Success!',
                text: 'Admin updated successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = 'Users.html';
            });
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update admin.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'An error occurred.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

// Load admin data into the form
async function loadAdminData() {
    if (!userID) return;

    try {
        const response = await fetch(`https://localhost:44309/api/Admin/GetAdminById/${userID}`);
        const admin = await response.json();

        document.getElementById('adminID').value = admin.id;
        document.getElementById('adminname').value = admin.name;
        document.getElementById('adminemail').value = admin.email;
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'Failed to load admin data.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

// Attach the submit event handler
document.getElementById("form").addEventListener('submit', updateAdmin);

// Load data on page load
window.onload = loadAdminData;
