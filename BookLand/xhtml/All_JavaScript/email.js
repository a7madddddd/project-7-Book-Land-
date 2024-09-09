async function addNewsletter(event) {
  event.preventDefault(); // Prevent the default form submission
  debugger; // Pause execution for debugging

  const form = document.getElementById("newsletterForm"); // Get the form element
  const formData = new FormData(form); // Create FormData object from the form

  let url = "http://localhost:44301/api/Newsletter"; // API endpoint
  let request = await fetch(url, {
    method: "POST", // Set request method to POST
    body: formData, // Attach the FormData object to the request body
  });
  debugger; // Pause execution for debugging

  if (request.ok) {
    // Check if request was successful
    const result = await request.json(); // Parse response JSON
    console.log(result); // Log the result to the console
    Swal.fire({
      icon: "success",
      title: "Subscription Successful",
      text: "Your email has been successfully added!",
      confirmButtonText: "OK",
    });
    // Optional: Redirect or clear form
    // window.location.href = "/frontend/somepage.html";
    // form.reset();
  } else {
    const error = await request.json();
    console.error("Failed to subscribe:", error);
    Swal.fire({
      icon: "error",
      title: "Subscription Failed",
      text: "An error occurred while subscribing. Please try again.",
      confirmButtonText: "OK",
    });
  }
}

document
  .getElementById("newsletterForm")
  .addEventListener("submit", addNewsletter);
let timeout = null;

function searchBook() {
  clearTimeout(timeout);
  debugger;
  timeout = setTimeout(() => {
    const bookTitle = document.getElementById("bookSearch").value;

    if (bookTitle) {
      const apiUrl = `http://localhost:44301/api/Books/bynameBooks/Book%20Title%201/${encodeURIComponent(
        bookTitle
      )}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          displayResults(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      document.getElementById("results").innerHTML = "";
    }
  }, 100);
}

function displayResults(data) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (data.length > 0) {
    data.forEach((book) => {
      const resultItem = document.createElement("li");
      resultItem.className = "dropdown-item";
      resultItem.innerHTML = `<strong>${book.title}</strong> by ${book.author}`;

      resultItem.onclick = () => {
        window.location.href = `http://localhost:44301/api/Books/details/${encodeURIComponent(
          book.title
        )}`;
      };

      resultsDiv.appendChild(resultItem);
    });
    resultsDiv.style.display = "block";
  } else {
    resultsDiv.innerHTML = "<li class='dropdown-item'>No books found.</li>";
  }
}
