async function getProductDetails() {
    // Get the product ID from localStorage
    const productId = localStorage.getItem("ProductID");
    if (!productId) {
        console.error("No ProductID found in localStorage.");
        return;
    }

    // Define the API endpoint to get product details
    const API = `https://localhost:44309/api/Books/GetBookById/${productId}`;

    try {
        // Fetch the product details from the API
        let request = await fetch(API);
        let response = await request.json();

        // Check if the response is valid
        if (!response) {
            console.error("Product not found.");
            return;
        }

        // Get the container element to display product details
        let container = document.getElementById("container");

        // Update the container with product details in a more structured format
        container.innerHTML = `
            <div class="container mt-4">
                <div class="card">
                    <div class="card-header bg-primary text-white">
                        ${response.title}
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">Author: ${response.author}</h5>
                        <p class="card-text"><strong>Publisher:</strong> ${response.publisher ?? "N/A"}</p>
                        <p class="card-text"><strong>Year Published:</strong> ${response.yearPublished ?? "N/A"}</p>
                        <p class="card-text"><strong>Description:</strong> ${response.description ?? "No description available."}</p>
                        <p class="card-text"><strong>Price:</strong> $${response.price ?? "N/A"}</p>
                        <p class="card-text"><strong>Discount:</strong> ${response.discountPercentage ?? 0}%</p>
                        <p class="card-text"><strong>Rating:</strong> ${response.rating ?? "No rating"}</p>
                        <div class="text-center">
                            <img src="${response.imageUrl ?? 'https://via.placeholder.com/150'}" alt="${response.title}" class="img-fluid product-image" style="max-width: 300px;">
                        </div>
                        <a href="/Product/Product.html" class="btn btn-secondary mt-3 d-block">Back to Products</a>
                    </div>
                </div>
            </div>
        `;
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}

// Call the function to get product details when the page loads
getProductDetails();
