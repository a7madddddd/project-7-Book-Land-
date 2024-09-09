async function GetAllCategories() {
    const API = 'https://localhost:44309/api/Category/GetAllCategories';
    
    let request = await fetch(API);
    let response = await request.json();

    let tableBody = document.getElementById("table-body");
    tableBody.innerHTML = ''; // Clear existing rows

    response.forEach(row => {
        tableBody.innerHTML +=
        `<tr>
        <td>${row.id}</td>
            <td>${row.name}</td>
            <td>${row.description}</td>
            <td>
                <a href="/Category/editcategory.html" onclick="Edit(${row.id})" class="btn btn-primary btn-sm">Edit</a>
                <button class="btn btn-danger btn-sm" onclick="DeleteItem(${row.id}, this)">Delete</button>
            </td>
        </tr>`;
    });
}

function Edit(id) {
    localStorage.setItem("CategoryID", id);
    window.location.href = `/Category/editcategory.html`; 
}

async function DeleteItem(id, buttonElement) {
    event.preventDefault();

    // Show SweetAlert confirmation dialog
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to delete this category?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    });

    // If confirmed
    if (result.isConfirmed) {
        const API = `https://localhost:44309/api/Category/DeleteCategory/${id}`;
        
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
                    'Category has been deleted successfully.',
                    'success'
                );

                // Remove the row from the table
                buttonElement.closest('tr').remove();
            } else {
                // Show error SweetAlert
                Swal.fire(
                    'Error!',
                    'There was a problem deleting the category.',
                    'error'
                );
            }
        } catch (error) {
            // Handle fetch error (network issue, etc.)
            Swal.fire(
                'Error!',
                'An error occurred while deleting the category.',
                'error'
            );
        }
    }
}

GetAllCategories();
