const categoryUrl = "https://localhost:44309/api/Category/GetAllCategories";

var productId = localStorage.getItem("ProductID");
const url = `https://localhost:44309/api/Books/UpdateBook/${productId}`;
const API = url;

var form = document.getElementById("form");
debugger;

async function updateProduct(event) {
  event.preventDefault();

  const productId = localStorage.getItem("ProductID");
  const API = `https://localhost:44309/api/Books/UpdateBook/${productId}`;

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
              text: 'Product updated successfully!',
              icon: 'success',
              confirmButtonText: 'OK'
          }).then((result) => {
              if (result.isConfirmed) {
                  window.location.href = 'Product.html';
              }
          });
      } else {
          Swal.fire({
              title: 'Error!',
              text: 'Failed to update product.',
              icon: 'error',
              confirmButtonText: 'OK'
          });
      }
  } catch (error) {
      Swal.fire({
          title: 'Error!',
          text: 'An error occurred while updating the product.',
          icon: 'error',
          confirmButtonText: 'OK'
      });
  }
}


async function selectCat() {
  try {
    let request = await fetch(categoryUrl);
    let categories = await request.json();

    var select = document.getElementById("selectCat");
    select.innerHTML = '<option value="">Select Category</option>';
    categories.forEach(option => {
      select.innerHTML += `<option value="${option.id}">${option.name}</option>`;  
    });
  } catch (error) {
    Swal.fire('Error!', 'Failed to load categories.', 'error');
  }
}

form.addEventListener("submit", updateProduct);
selectCat();
