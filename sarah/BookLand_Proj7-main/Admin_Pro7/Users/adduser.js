const API = `https://localhost:44309/api/Admin/AddNewAdmin`;

async function addUser(event) {
    event.preventDefault();

    const form = document.getElementById("form");
    const formData = new FormData(form);

    try {
        const response = await fetch(API, {
            method: "POST",
            body: formData 
        });

        if (response.ok) {
            Swal.fire({
                title: 'Success!',
                text: 'Admin added successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = 'users.html';
            });
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to add admin.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'An error occurred while adding the admin.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

document.getElementById("form").addEventListener('submit', addUser);
