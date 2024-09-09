const urlBook = (id) => `http://localhost:44301/api/Books/bynameBooksid/${id}`;
const urlComments =
  "http://localhost:44301/api/commentsreviews/topRatedcommentsreviews";
const urlUser = (id) => `http://localhost:44301/api/User/byIDUserUser/${id}`;

// Function to fetch and display book title by ID
async function getBookTitleById(id) {
  try {
    const response = await fetch(urlBook(id));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const bookTitle = await response.text(); // Assuming the response is just the book title as plain text
    return bookTitle || "No title available";
  } catch (error) {
    console.error("Error fetching book title:", error);
    return "Error fetching title";
  }
}

// Function to fetch and display user name by ID
async function getUserNameById(userId) {
  try {
    const response = await fetch(urlUser(userId));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const userName = await response.text(); // Assuming the response is just the user name as plain text
    return userName || "Anonymous";
  } catch (error) {
    console.error("Error fetching user name:", error);
    return "Anonymous"; // Default to 'Anonymous' in case of error
  }
}

// Function to fetch and display top-rated comments/reviews
async function getTopRatedComments() {
  try {
    const response = await fetch(urlComments);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const comments = await response.json();
    const testimonialsContainer = document.getElementById("topRatedComments");

    if (comments.length === 0) {
      testimonialsContainer.innerHTML = "<p>No reviews available.</p>";
      return;
    }
    console.log("comments", comments);
    // Generate testimonial cards
    const commentsHTML = await Promise.all(
      comments.map(async (comment, index) => {
        const bookTitle = await getBookTitleById(comment.bookId); // Fetch book title based on comment's book ID
        const reviewerName = await getUserNameById(comment.userId); // Fetch reviewer name based on user ID
        const stars = Array(comment.rating)
          .fill(`<li><i class="flaticon-star text-yellow"></i></li>`)
          .join(""); // Dynamically generate stars
        const missingStars = Array(5 - comment.rating)
          .fill(`<li><i class="flaticon-star"></i></li>`)
          .join(""); // Empty stars for ratings < 5

        // تحديد الصورة بناءً على الفهرس (index)
        const imageNumber = (index % 6) + 1; // الصور من 1 إلى 6 (التكرار في حالة وجود أكثر من 6)
        const imageSrc = `images/testimonial/testimonial${imageNumber}.jpg`; // تغيير الصورة ديناميكيًا

        return `
        <div class="swiper-slide">
          <div class="testimonial-1 wow fadeInUp" data-wow-delay="0.1s">
            <div class="testimonial-info">
              <ul class="dz-rating">
                ${stars} ${missingStars}
              </ul>
              <div class="testimonial-text">
                <p>${comment.commentText || "No comment available."}</p>
              </div>
              <div class="testimonial-detail">
                <div class="testimonial-pic">
                  <img src="${imageSrc}" alt="Testimonial Image ${imageNumber}">
                </div>
                <div class="info-right">
                  <h6 class="testimonial-name">${reviewerName}</h6>
                  <p><strong>Book:</strong> ${bookTitle}</p> <!-- Display book title here -->
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
      })
    );

    testimonialsContainer.innerHTML = commentsHTML.join(""); // Insert into the testimonials container

    // Initialize Swiper after loading the comments
    new Swiper(".swiper-container.swiper-comments", {
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination-comments",
        clickable: true,
      },
      breakpoints: {
        640: { slidesPerView: 1, spaceBetween: 20 },
        768: { slidesPerView: 2, spaceBetween: 30 },
        1024: { slidesPerView: 3, spaceBetween: 40 },
      },
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    const testimonialsContainer = document.getElementById("topRatedComments");
    testimonialsContainer.innerHTML =
      "<p>Failed to load reviews. Please try again later.</p>";
  }
}

getTopRatedComments();
