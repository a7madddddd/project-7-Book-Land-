//  const userId= localStorage.getItem("userId");
let userId = 15;
// دالة لجلب عدد العناصر في السلة
async function getcountcart() {
  const url3 = `http://localhost:44301/api/CartItem/cartItemCount/${userId}`;

  try {
    const response = await fetch(url3, { method: "GET" });

    if (!response.ok) {
      console.error("Error fetching cart count:", response.statusText);
      document.getElementById("badgeCart").innerHTML = "0";
      return;
    }

    const result = await response.json();
    console.log("Cart count response:", result); // للتحقق من الاستجابة
    const count = result.count != null ? result.count : 0;
    document.getElementById("badgeCart").innerHTML = count;
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("badgeCart").innerHTML = "0";
  }
}

// دوال URLS الخاصة بجلب البيانات
const url14 = `http://localhost:44301/api/CartItem/topPriceCartItems/${userId}`;
const url7 = `http://localhost:44301/api/Books/byIDBooks/`;
const url8 = `http://localhost:44301/api/CartItem/byIDCartItemtTotal2/${userId}`;

// دالة لجلب تفاصيل الكتاب بناءً على المعرف
async function getBookDetails(bookId) {
  try {
    const response = await fetch(`${url7}${bookId}`);
    if (!response.ok) {
      console.error("Error fetching book details:", response.statusText);
      return null;
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching book details:", error);
    return null;
  }
}

// دالة لجلب إجمالي السعر لجميع العناصر في السلة
async function getTotalPrice() {
  try {
    const response = await fetch(url8);

    if (!response.ok) {
      console.error("Error fetching total price:", response.statusText);
      return 0;
    }

    const result = await response.json();
    console.log("Total price response:", result);
    return result.totalPrice || 0;
  } catch (error) {
    console.error("Error fetching total price:", error);
    return 0;
  }
}

async function getTopPrice() {
  try {
    const response = await fetch(url14);

    if (!response.ok) {
      console.error("Error fetching top price items:", response.statusText);
      return;
    }
    debugger;
    const result = await response.json(); // مجموعة الكتب
    console.log("Top price items response:", result);
    const booksContainer = document.getElementById("cart-list");

    // تفريغ المحتوى السابق
    booksContainer.innerHTML =
      result.length > 0 ? "" : "<li>No items in cart</li>";

    let total = 0; // حساب الإجمالي للمكتبات المعروضة

    // التكرار على العناصر الأعلى سعراً وجلب تفاصيلها
    for (let i = 0; i < Math.min(result.length, 3); i++) {
      const book = result[i]; // الحصول على الكتاب بناءً على الفهرس
      const bookDetails = await getBookDetails(book.id); // جلب تفاصيل الكتاب بناءً على المعرف
      console.log("Book details:", bookDetails); // للتحقق من الاستجابة
      if (book && book.title && book.price) {
        booksContainer.innerHTML += `
          <li class="cart-item">
            <div class="media">
              <div class="media-left">

<img alt="${book.title}" class="media-object" src="${
          book.userProfilePicture
        }" />

              </div>
              <div class="media-body">
                <h6 class="dz-title">
                  <a href="books-detail.html?id=${
                    book.id
                  }" class="media-heading">${book.title}</a>
                </h6>
                <span class="dz-price">$${book.price.toFixed(2)}</span>

              </div>
            </div>
          </li>
        `;
      } else {
        console.error("Missing details for book:", book);
      }
    }

    // إضافة إجمالي السعر لجميع العناصر
    const totalPrice = await getTotalPrice();
    console.log("Total price from API:", totalPrice);

    booksContainer.innerHTML += `
      <li class="cart-item text-center">
        <h6 class="text-secondary">Total = $${totalPrice.toFixed(2)}</h6>
      </li>
      <li class="text-center d-flex">
        <a href="shop-cart.html" class="btn btn-sm btn-primary me-2 btnhover w-100">View Cart</a>
        <a href="shop-checkout.html" class="btn btn-sm btn-outline-primary btnhover w-100">Checkout</a>
      </li>
    `;
  } catch (error) {
    console.error("Error fetching top price books:", error);
  }
}
// تنفيذ الدوال
getcountcart();
getTopPrice();
