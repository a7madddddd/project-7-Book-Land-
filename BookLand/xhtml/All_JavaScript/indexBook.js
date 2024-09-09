const url6 = `http://localhost:44301/api/Books/RandomBook?count=5`;

async function getBooks() {
  try {
    const response = await fetch(url6);
    const result = await response.json(); // array of books

    const booksContainer = document.getElementById("Book");

    // Clear previous content
    booksContainer.innerHTML = "";

    // Generate and append the content for each book
    result.forEach((book) => {
      let starsHtml = generateStarsHtml(book.rating);

      // Calculate discounted price
      const price = parseFloat(book.price);
      const discountPercentage = parseFloat(book.discountPercentage) || 0;
      const discountedPrice = price - (price * discountPercentage) / 100;

      console.log(
        `Price: ${price}, Discount Percentage: ${discountPercentage}, Discounted Price: ${discountedPrice}`
      );

      const priceHtml =
        discountPercentage > 0
          ? `<span class="price-num discounted">$${discountedPrice.toFixed(2)}`
          : `<span class="price-num">$${price.toFixed(2)}</span>`;

      // Append book content to the container
      booksContainer.innerHTML += `
        <div class="swiper-slide">
          <div class="books-card">
            <div class="dz-media">
              <img src="${book.imageUrl || "default-image.jpg"}" alt="${
        book.title || "Book Image"
      }" style="width: 100%; height: auto;" />
            </div>
            <div class="dz-content">
              <h5 class="title mb-0">${book.title || "Untitled"}</h5>
              <div class="dz-meta">
                <ul>
                  <li>by ${book.author || "Unknown Author"}</li>
                </ul>
              </div>
              <div class="book-footer">
                <div class="price">
                  ${priceHtml} <!-- Display price and discounted price -->
                </div>
                <div class="rate">
                  ${starsHtml} <!-- Show rating stars -->
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    // Reinitialize Swiper after content is loaded
    initializeSwiper();
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

// Function to generate HTML for rating stars
function generateStarsHtml(rating) {
  let starsHtml = "";

  // Add full stars
  for (let i = 1; i <= Math.floor(rating); i++) {
    starsHtml += '<i class="flaticon-star text-yellow"></i>';
  }

  // Add half star if rating contains 0.5
  if (rating % 1 !== 0) {
    starsHtml += '<i class="flaticon-star-half text-yellow"></i>';
  }

  // Add empty stars to complete five stars
  for (let i = Math.ceil(rating); i < 5; i++) {
    starsHtml += '<i class="flaticon-star text-muted"></i>';
  }

  return starsHtml;
}

// Function to initialize Swiper
function initializeSwiper() {
  const swiper = new Swiper(".swiper-container", {
    slidesPerView: 5, // Number of books to display
    spaceBetween: 10, // Space between slides
    loop: true, // Infinite loop
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      slideChange: function () {
        updateActiveSlideBackground(swiper);
      },
    },
  });

  // Set background for the initial active slide
  updateActiveSlideBackground(swiper);
}

// Function to update background color for active slide
function updateActiveSlideBackground(swiper) {
  // Remove background from all slides
  document.querySelectorAll(".swiper-slide").forEach((slide) => {
    slide.style.backgroundColor = ""; // Reset background color
  });

  // Set white background for the active slide
  const activeSlide = swiper.slides[swiper.activeIndex];
  activeSlide.style.backgroundColor = "white";
}

// Fetch books and initialize Swiper after data is ready
getBooks();
