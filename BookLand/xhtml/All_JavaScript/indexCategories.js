const url = "http://localhost:44301/api/Category";

async function getCategories() {
  try {
    const response = await fetch(url, { method: "GET" });
    const result = await response.json();
    console.log(result);

    const container = document.getElementById("Category");

    container.innerHTML = "";

    const selectElement = document.createElement("select");
    selectElement.className = "default-select";

    const defaultOption = document.createElement("option");
    defaultOption.textContent = "Select a category";
    defaultOption.value = "";
    selectElement.appendChild(defaultOption);

    result.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.name;

      selectElement.appendChild(option);
    });

    // إضافة مستمع للحدث "change"
    selectElement.addEventListener("change", function () {
      const categoryId = selectElement.value;
      console.log("Selected category ID:", categoryId);

      if (categoryId) {
        localStorage.setItem("selectedCategoryId", categoryId);
        console.log(
          "Stored category ID in localStorage:",
          localStorage.getItem("selectedCategoryId")
        );

        window.location.href = `/Front-End/books-list.html?id=${categoryId}`;
      }
    });

    container.appendChild(selectElement);
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

getCategories();
const urlCategories = "http://localhost:44301/api/Category";

async function loadCategories() {
  try {
    const response = await fetch(urlCategories);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const categories = await response.json();

    const categoriesList = document.getElementById("categories-list");

    if (categories.length === 0) {
      categoriesList.innerHTML = "<li>No categories available.</li>";
      return;
    }

    const categoriesHTML = categories
      .map(
        (category) => `
      <li><a href="books-grid-view.html?category=${category.id}">${category.name}</a></li>
    `
      )
      .join("");

    categoriesList.innerHTML = categoriesHTML;
  } catch (error) {
    console.error("Error fetching categories:", error);
    const categoriesList = document.getElementById("categories-list");
    categoriesList.innerHTML = "<li>Failed to load categories.</li>";
  }
}

document.addEventListener("DOMContentLoaded", loadCategories);
