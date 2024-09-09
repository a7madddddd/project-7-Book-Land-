/** @format */

// Function to get all products/books (this will load initially)
async function GetAllProducts() {
    const API = "https://localhost:44309/api/Books/GetAllBooks";
  
    try {
      let request = await fetch(API);
      let response = await request.json();
  
      let tableBody = document.getElementById("books-container");
      tableBody.innerHTML = ""; // Clear previous content
  
      response.forEach((row) => {
        tableBody.innerHTML += `
                  <tr>
                      <td>${row.title}</td>
                      <td>${row.author}</td>
                      <td>${row.categoryid}</td>
                      <td>
                          <a href="#" onclick="View(${row.id}); return false;" class="btn btn-info btn-sm">View</a>
                          <a href="/Product/editproduct.html" onclick="Edit(${row.id}); return false;" class="btn btn-primary btn-sm">Edit</a>
                          <button class="btn btn-danger btn-sm" onclick="DeleteItem(${row.id}, this);">Delete</button>
                      </td>
                  </tr>
              `;
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }
  
  // Function to handle the edit action
  function Edit(id) {
    localStorage.setItem("ProductID", id);
    window.location.href = "/Product/editproduct.html";
  }
  
  // Function to handle the view action
  function View(id) {
    localStorage.setItem("ProductID", id);
    window.location.href = "/Product/viewproduct.html";
  }
  
  // Function to delete a product/book
  async function DeleteItem(id, buttonElement) {
    event.preventDefault();
  
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
  
    if (result.isConfirmed) {
      const API = `https://localhost:44309/api/Books/DeleteBook/${id}`;
  
      try {
        let response = await fetch(API, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (response.ok) {
          Swal.fire("Deleted!", "Product has been deleted successfully.", "success");
          buttonElement.closest("tr").remove();
        } else {
          Swal.fire("Error!", "There was a problem deleting the product.", "error");
        }
      } catch (error) {
        Swal.fire("Error!", "An error occurred while deleting the product.", "error");
      }
    }
  }
  
  // Function to load categories and set event listeners
  function loadCategories() {
    fetch("https://localhost:44309/api/Category/GetAllCategories")
      .then((response) => response.json())
      .then((categories) => {
        const categoryList = document.getElementById("container12");
        categoryList.innerHTML = ""; // Clear existing categories if any
        let isBiographyLoaded = false;
  
        categories.forEach((category) => {
          const container = document.createElement("div");
          container.className = "form-check search-content";
  
          const checkbox = document.createElement("input");
          checkbox.type = "checkbox";
          checkbox.className = "btn-check";
          checkbox.value = category.id;
          checkbox.id = "category" + category.id;
  
          // Set 'Biography' as checked by default
          if (category.name === "Biography") {
            checkbox.checked = true;
            isBiographyLoaded = true;
          }
  
          const label = document.createElement("label");
          label.className = "btn btn-outline-primary";
          label.htmlFor = checkbox.id;
          label.textContent = category.name;
  
          container.appendChild(checkbox);
          container.appendChild(label);
  
          categoryList.appendChild(container);
        });
  
        // Load books if Biography is loaded and checked by default
        if (isBiographyLoaded) {
          loadBooks();
        }
  
        // Set event listeners for all checkboxes
        document.querySelectorAll('.btn-check').forEach((checkbox) => {
          checkbox.addEventListener('change', loadBooks);
        });
      })
      .catch((error) => console.error("Failed to load categories:", error));
  }
  
  // Function to load books based on selected categories
  function loadBooks() {
    const selectedCategories = Array.from(
      document.querySelectorAll(".btn-check:checked")
    ).map((input) => input.id.replace('category', ''));
    let apiUrl = `https://localhost:44309/api/Books/categories/books?`;
    let token = localStorage.jwtToken;
  
    selectedCategories.forEach((id, index) => {
      apiUrl += `categoryIds=${id}`;
      if (index < selectedCategories.length - 1) {
        apiUrl += "&";
      }
    });
  
    fetch(apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((books) => {
        const booksContainer = document.getElementById("books-container");
        booksContainer.innerHTML = ""; // Clear previous entries
        books.forEach((book) => {
          const bookCardHTML = `
            <tr>
              <td>${book.title}</td>
              <td>${book.author}</td>
              <td>${book.categoryid}</td>
              <td>
                <a href="#" onclick="View(${book.id}); return false;" class="btn btn-info btn-sm">View</a>
                <a href="/Product/editproduct.html" onclick="Edit(${book.id}); return false;" class="btn btn-primary btn-sm">Edit</a>
                <button class="btn btn-danger btn-sm" onclick="DeleteItem(${book.id}, this);">Delete</button>
              </td>
            </tr>
          `;
          booksContainer.innerHTML += bookCardHTML;
        });
      })
      .catch((error) => console.error("Error loading the books:", error));
  }
  
  // Call the functions to load products and categories
  GetAllProducts();
  document.addEventListener("DOMContentLoaded", loadCategories);
  