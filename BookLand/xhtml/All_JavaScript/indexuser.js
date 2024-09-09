// const url10 = `http://localhost:42480/api/Books/RandomBook`;

// async function getbook() {
//   try {
//     var responsesale = await fetch(url10);
//     console.log(responsesale);

//     if (!responsesale.ok) {
//       throw new Error(`HTTP error! status: ${responsesale.status}`);
//     }

//     var resultsale = await responsesale.json();
//     console.log(resultsale);

//     var card = document.getElementById("card");

//     if (resultsale.length === 0) {
//       card.innerHTML = "<p>No books available at the moment.</p>";
//       return;
//     }

//     // Generate and display cards for each book
//     card.innerHTML = resultsale
//       .map(
//         (book) => `
//         <div class="swiper-slide">
//           <div class="books-card style-1 wow fadeInUp" data-wow-delay="0.2s">
//             <div class="dz-media">
//                  <img src="${book.imageUrl || "default-image.jpg"}" alt="${
//           book.title || "No title available"
//         }" />
//             </div>
//             <div class="dz-content">
//               <h4 class="title">${book.title || "Untitled"}</h4>
//               <span class="price">${
//                 book.price ? `$${book.price}` : "Price not available"
//               }</span>
//               <a href="javascript:void(0);" onclick="addToCart(${book.id}, '${
//           book.format || "PDF"
//         }', ${
//           book.price || 0
//         })" id="add-to-cart-button" class="btn btn-secondary btnhover btnhover2">
//                 <i class="flaticon-shopping-cart-1 m-r10"></i> Add to cart
//               </a>
//             </div>
//           </div>
//         </div>
//       `
//       )
//       .join(""); // Join the array into a single HTML string

//     // Initialize Swiper after loading the books
//     new Swiper(".swiper-container.swiper-two", {
//       slidesPerView: 1,
//       spaceBetween: 10,
//       navigation: {
//         nextEl: ".swiper-button-next",
//         prevEl: ".swiper-button-prev",
//       },
//       pagination: {
//         el: ".swiper-pagination-two",
//         clickable: true,
//       },
//       breakpoints: {
//         640: { slidesPerView: 2, spaceBetween: 20 },
//         768: { slidesPerView: 3, spaceBetween: 30 },
//         1024: { slidesPerView: 4, spaceBetween: 40 },
//       },
//     });
//   } catch (error) {
//     console.error("Error fetching books:", error);
//     card.innerHTML = "<p>Failed to load books. Please try again later.</p>";
//   }
// }

// function addToCart(bookId, format, price) {
//   // Retrieve the userId from localStorage (assuming it's stored there after login)
//   let userId = localStorage.getItem("userId");

//   // If userId exists, use it as cart_id; otherwise, generate a new cart_id
//   let cart_id = userId ? parseInt(userId) : Date.now();

//   // Create the book data
//   let productData = {
//     cart_id: cart_id, // Use userId as cart_id if logged in
//     bookId: bookId, // Book ID
//     quantity: 1, // Quantity
//     format: format, // Format of the book
//     price: price, // Price of the book
//   };

//   // Retrieve the cart from localStorage or initialize a new one if not present
//   let cart = JSON.parse(localStorage.getItem("cart")) || [];

//   // Check if the book is already in the cart to increase the quantity
//   let existingBook = cart.find(
//     (item) => item.bookId === bookId && item.cart_id === cart_id
//   );

//   if (existingBook) {
//     existingBook.quantity += 1;
//   } else {
//     cart.push(productData);
//   }

//   // Store the updated cart in localStorage
//   localStorage.setItem("cart", JSON.stringify(cart));

//   console.log("Book added to cart:", cart);

//   // Show a confirmation message using SweetAlert2
//   Swal.fire({
//     title: "Book added to cart!",
//     text: "The book has been successfully added to your cart.",
//     icon: "success",
//     confirmButtonText: "OK",
//     confirmButtonColor: "#3085d6",
//   });
// }

// // Function to fetch user data
// async function getuser() {
//   // Retrieve the userId from localStorage
//   // let userId = localStorage.getItem("userId");
//   let userId = 15;

//   if (!userId) {
//     console.log("User is not logged in.");
//     return;
//   }

//   const url4 = `http://localhost:42480/api/User/byIDUser/${userId}`;

//   try {
//     var response = await fetch(url4);
//     console.log(response);

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     var result = await response.json();
//     console.log(result);

//     var profile = document.getElementById("profile2");

//     profile.innerHTML = `
//          <h6 class="m-0">${result.name}</h6>
//         <span>${result.email}</span>
//       `;
//   } catch (error) {
//     console.error("Error fetching user data:", error);
//   }
// }
// async function getusertwo() {
//   var response = await fetch(url4);
//   console.log(response);
//   var result = await response.json();
//   console.log(result);

//   var profile1 = document.getElementById("profile1");

//   profile1.innerHTML = `
//        <h6 class="m-0">${result.name}</h6>
//       <span>${result.email}</span>
//     `;
// }

// getusertwo();

// async function getusertree() {
//   var response = await fetch(url4);
//   console.log(response);
//   var result = await response.json();
//   console.log(result);

//   var imgContainer = document.getElementById("img");
//   if (imgContainer && result.image) {
//     imgContainer.innerHTML = `<img src="${result.image}" alt="img" />`;
//   } else {
//     console.error("Image container or image data is missing");
//   }
// }

// getusertree();
// // Call the functions when the page loads
// getbook();
// getuser();
// var userId = localStorage.getItem("userId");

const url4 = `http://localhost:44301/api/User/byIDUser/15`;

async function getuser() {
  var response = await fetch(url4);
  console.log(response);
  var result = await response.json();
  console.log(result);

  var profile = document.getElementById("profile2");

  profile.innerHTML = `
       <h6 class="m-0">${result.name}</h6>
      <span>${result.email}</span>
    `;
}

getuser();

async function getusertwo() {
  var response = await fetch(url4);
  console.log(response);
  var result = await response.json();
  console.log(result);

  var profile1 = document.getElementById("profile1");

  profile1.innerHTML = `
       <h6 class="m-0">${result.name}</h6>
      <span>${result.email}</span>
    `;
}

getusertwo();

async function getusertree() {
  var response = await fetch(url4);
  console.log(response);
  var result = await response.json();
  console.log(result);

  var imgContainer = document.getElementById("img");
  if (imgContainer && result.image) {
    imgContainer.innerHTML = `<img src="${result.image}" alt="img" />`;
  } else {
    console.error("Image container or image data is missing");
  }
}

getusertree();
