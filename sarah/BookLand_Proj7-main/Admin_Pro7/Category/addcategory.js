const url = "https://localhost:44309/api/Category/AddNewCategory";

var form = document.getElementById("form");
console.log(form);

async function addCategory(event) {
  event.preventDefault();

  const formData = new FormData(form);
  console.log(formData.get("CategoryName")); 

  try {
    let response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      // Show SweetAlert2 success message and optionally redirect
      Swal.fire({
        title: 'Success!',
        text: 'Category added successfully!',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        window.location.href = "/Category/Categories.html"; // Redirect to categories page
      });
    } else {
      // Show SweetAlert2 error message
      Swal.fire({
        title: 'Error!',
        text: 'Failed to add category.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  } catch (error) {
    // Show SweetAlert2 error message for network or other issues
    Swal.fire({
      title: 'Error!',
      text: 'An error occurred while adding the category.',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }
}

// Add event listener to form
form.addEventListener("submit", addCategory);
