const url10 = `http://localhost:44301/api/Books/RandomBook`;
debugger;
async function getbook() {
  try {
    var responsesale = await fetch(url10);
    console.log(responsesale);

    if (!responsesale.ok) {
      throw new Error(`HTTP error! status: ${responsesale.status}`);
    }

    var resultsale = await responsesale.json();
    console.log(resultsale);

    var card = document.getElementById("card");

    if (resultsale.length === 0) {
      card.innerHTML = "<p>No books available at the moment.</p>";
      return;
    }

    // Generate and display cards for each book
    card.innerHTML = resultsale
      .map(
        (book) => `
                <div class="swiper-slide">
                    <div class="books-card style-1 wow fadeInUp" data-wow-delay="0.2s">
                        <div class="dz-media">
                            <img src="${
                              book.imageUrl || "default-image.jpg"
                            }" alt="${book.title || "No title available"}" />
                        </div>
                        <div class="dz-content">
                            <h4 class="title">${book.title || "Untitled"}</h4>
                            <span class="price">${
                              book.price
                                ? `$${book.price}`
                                : "Price not available"
                            }</span>
                     
                            <a href="javascript:void(0);" onclick="addToCart1(${
                              book.id
                            }, '${book.format || "PDF"}', ${book.price || 0},'${
          book.imageUrl
        }')" id="add-to-cart-button" class="btn btn-secondary btnhover btnhover2">
                                <i class="flaticon-shopping-cart-1 m-r10"></i> Add to cart
                            </a>
                        </div>
                    </div>
                </div>
            `
      )
      .join(""); // Join the array into a single HTML string

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
    card.innerHTML = "<p>Failed to load books. Please try again later.</p>";
  }
}

debugger;
function addToCart1(bookId, format, price, imageUrl) {
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
getbook();
