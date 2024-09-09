const categoryId = localStorage.getItem("CategoryID");
const API = `https://localhost:44309/api/Category/UpdateCategory/${categoryId}`;


async function updateCategory(event) {
    event.preventDefault();


    const form = document.getElementById("form");
    const formData = new FormData(form);
    
    try {
        const response = await fetch(API, {
            method: "PUT",
            body: formData
        });

        if (response.ok) {
            Swal.fire({
                title: 'Success!',
                text: 'Category updated successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = "/Category/Categories.html";
            });
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update category.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'An error occurred while updating the category.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

async function loadCategoryData() {
    if (!categoryId) return;

    try {
        const response = await fetch(`https://localhost:44309/api/Category/GetCategoryById/${categoryId}`);
        const category = await response.json();

        document.getElementById('CategoryName').value = category.name;
        document.getElementById('Categorydescription').value = category.description;
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'Failed to load category data.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}
document.getElementById("form").addEventListener("submit", updateCategory);

window.onload = loadCategoryData;
