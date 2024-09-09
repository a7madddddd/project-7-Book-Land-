const url100 = `http://localhost:44301/api/Books/bySaleBooks`;
const urlCategory = `http://localhost:44301/api/Category/byIDCategory/`;

// Function to fetch all category names based on their IDs
async function getCategoriesByIds(categoryIds) {
  try {
    const response = await fetch(urlCategory + categoryIds.join(",")); // Combine IDs in one request
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const categories = await response.json();
    return categories.reduce((acc, category) => {
      acc[category.id] = category.name; // Map categoryId to categoryName
      return acc;
    }, {}); // Return an object where keys are category IDs and values are names
  } catch (error) {
    console.error("Error fetching categories:", error);
    return {};
  }
}

// Function to fetch and display discounted books
async function getBooksOnSale() {
  try {
    const responsesale = await fetch(url100);
    console.log(responsesale);

    if (!responsesale.ok) {
      throw new Error(`HTTP error! status: ${responsesale.status}`);
    }

    const resultsale = await responsesale.json();
    console.log(resultsale);

    const card = document.getElementById("saleprodect");

    if (resultsale.length === 0) {
      card.innerHTML = "<p>No books available on sale.</p>";
      return;
    }

    // Extract all category IDs from books
    const categoryIds = resultsale.map((book) => book.categoryId);
    // Fetch all categories at once
    const allCategoryNames = await getCategoriesByIds(categoryIds);

    // Filter and generate cards for books with discounts
    const booksHTML = resultsale
      .filter((book) => parseFloat(book.discountPercentage) > 0) // Filter books with discount
      .map((book) => {
        // Calculate discounted price
        const price = parseFloat(book.price) || 0;
        const discount = parseFloat(book.discountPercentage) || 0;
        const discountedPrice = price - (price * discount) / 100;

        // Get category name from the fetched categories
        const categoryName = allCategoryNames[book.categoryId] || "Unknown";

        // Generate HTML for each book
        return `
          <div class="swiper-slide">
            <div class="books-card style-1 wow fadeInUp" data-wow-delay="0.2s" style="border: 1px solid #ddd; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
              <div class="dz-media" style="position: relative;">
                <img src="${book.imageUrl || "default-image.jpg"}" alt="${
          book.title || "No title available"
        }" style="width: 100%; height: auto; border-bottom: 1px solid #ddd;" />
                <span style="position: absolute; top: 10px; right: 10px; background-color: #ff4d4d; color: white; padding: 5px 10px; border-radius: 5px;">${discount}% Off</span>
              </div>
              <div class="dz-content" style="padding: 15px;">
                <h4 class="title" style="font-size: 1.2rem; font-weight: bold; margin-bottom: 10px;">${
                  book.title || "Untitled"
                }</h4>
                <p class="description" style="font-size: 0.9rem; color: #555;">${
                  book.description || "No description available"
                }</p>
                <div class="price" style="font-size: 1rem; color: #000; display: flex; justify-content: space-between; align-items: center;">
                  <span class="price-num discounted" style="font-size: 1.5rem; color: #888; font-weight: bold;">$${discountedPrice.toFixed(
                    2
                  )}</span> 
                  <span class="price-num original" style="font-size: 1rem; text-decoration: line-through; color: #ff4d4d;">$${price.toFixed(
                    2
                  )}</span>
                </div>
                     <a href="javascript:void(0);" onclick="addToCart(${
                       book.id
                     }, '${book.format || "PDF"}', ${book.price || 0},'${
          book.imageUrl
        }')" id="add-to-cart-button" class="btn btn-secondary btnhover btnhover2">
                                <i class="flaticon-shopping-cart-1 m-r10"></i> Add to cart
                            </a>
              </div>
            </div>
          </div>
        `;
      })
      .join(""); // Join the HTML strings into one

    card.innerHTML = booksHTML; // Insert the generated HTML into the container

    // Initialize Swiper after loading the books
    new Swiper(".swiper-container.swiper-two", {
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination-two",
        clickable: true,
      },
      breakpoints: {
        640: { slidesPerView: 2, spaceBetween: 20 },
        768: { slidesPerView: 3, spaceBetween: 30 },
        1024: { slidesPerView: 4, spaceBetween: 40 },
      },
    });
  } catch (error) {
    console.error("Error fetching books:", error);
    const card = document.getElementById("saleprodect");
    card.innerHTML = "<p>Failed to load books. Please try again later.</p>";
  }
}

getBooksOnSale();
function addToCart(bookId, format, price, imageUrl) {
  debugger;
  // Retrieve the current cart size from localStorage, defaulting to 0 if not present
  let cartSize = parseInt(localStorage.getItem("cartSize")) || 0;
  let found = false;

  // Check if the book is already in the cart
  for (let i = 1; i <= cartSize; i++) {
    let itemKey = `item${i}`;
    let cartItem = JSON.parse(localStorage.getItem(itemKey));

    if (
      cartItem &&
      cartItem.bookId === bookId &&
      cartItem.format === format &&
      cartItem.imageUrl === imageUrl
    ) {
      cartItem.quantity += 1; // Increment the quantity
      // localStorage.setItem(itemKey, JSON.stringify(cartItem));
      found = true;
      break;
    }
  }

  // If the item was not found, add a new item to the cart
  if (!found) {
    //  let newCartSize = cartSize + 1;
    // Initialize an empty array to store product data
    let cartSize = parseInt(localStorage.getItem("cartSize")) || 0;

    // Increment the cart size to get a unique key for the new item
    cartSize += 1;

    // Create a new product data object
    let productData = {
      cart_id: Date.now(), // Use the current timestamp as a unique identifier
      bookId: bookId,
      quantity: 1,
      format: format,
      price: price,
      imageUrl: imageUrl, // Add the image URL to the product data object
    };

    // Save the new item in localStorage with a unique key like item1, item2, etc.
    localStorage.setItem(`item${cartSize}`, JSON.stringify(productData));

    // Update the cart size in localStorage to reflect the new count
    localStorage.setItem("cartSize", cartSize);
    // If you want to add

    // Save the new item in localStorage with a unique key (e.g., item1, item2)
    // localStorage.setItem(`item${newCartSize}`, JSON.stringify(productData));
    // localStorage.setItem("cartSize", newCartSize); // Update cart size
  }

  // Show confirmation message
  Swal.fire({
    title: "تمت إضافة الكتاب إلى السلة!",
    text: "تمت إضافة الكتاب بنجاح إلى سلتك.",
    icon: "success",
    confirmButtonText: "موافق",
    confirmButtonColor: "#3085d6",
  });
}
