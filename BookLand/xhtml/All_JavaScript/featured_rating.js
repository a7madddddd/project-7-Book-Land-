const urlAllBooks = `http://localhost:44301/api/Books`;

async function getTopRatedBooks() {
  try {
    // إظهار مؤشر التحميل
    document.getElementById("loader").style.display = "block";

    const response = await fetch(urlAllBooks); // جلب جميع الكتب من API
    console.log(response);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json(); // تحويل الاستجابة إلى JSON
    console.log(result);

    const cardContainer = document.getElementById("featured_rating");

    if (result.length === 0) {
      cardContainer.innerHTML = "<p>لا توجد كتب متاحة.</p>";
      return;
    }

    // فرز الكتب بناءً على التقييم وعرض أعلى 5 منها
    const topBooks = result
      .sort((a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0)) // ترتيب الكتب بناءً على التقييم
      .slice(0, 5); // الحصول على أول 5 كتب

    // إنشاء HTML لعرض الكتب
    const booksHTML = topBooks
      .map((book) => {
        // حساب السعر المخفض إذا كان هناك تخفيض
        const price = parseFloat(book.price) || 0;
        const discount = parseFloat(book.discountPercentage) || 0;
        const discountedPrice = price - (price * discount) / 100;

        return `
          <div class="swiper-slide">
            <div class="books-card style-2">
              <div class="dz-media">
                <img loading="lazy" src="${
                  book.imageUrl || "images/books/large/bigbook1.jpg"
                }" alt="${book.title || "book"}" />
              </div>
              <div class="dz-content">
                <h6 class="sub-title">${
                  book.isBestSeller ? "الأكثر مبيعاً" : ""
                }</h6>
                <h2 class="title">${book.title || "كتاب مجهول"}</h2>
                <ul class="dz-tags">
                  <li>${book.author || "مؤلف غير معروف"}</li>
                  <li>${book.category || "تصنيف غير معروف"}</li>
                </ul>
                <p class="text">${
                  book.description || "لا يوجد وصف متاح لهذا الكتاب."
                }</p>
                <div class="price">
                  <span class="price-num">$${discountedPrice.toFixed(2)}</span>
                  <del>$${price.toFixed(2)}</del>
                  ${
                    discount > 0
                      ? `<span class="badge">${discount}% خصم</span>`
                      : ""
                  }
                </div>
                <div class="bookcard-footer">
                  <a href="shop-cart.html" class="btn btn-primary btnhover m-t15 m-r10">اشترِ الآن</a>
                  <a href="books-detail.html" class="btn btn-outline-secondary btnhover m-t15">عرض التفاصيل</a>
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .join(""); // تجميع العناصر في نص HTML واحد

    // إخفاء مؤشر التحميل
    document.getElementById("loader").style.display = "none";

    cardContainer.innerHTML = booksHTML; // عرض الكتب في الـ HTML

    // Initialize Swiper after loading the books
    new Swiper(".swiper-container.books-wrapper-2", {
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      pagination: {
        el: ".swiper-pagination-three",
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
    const cardContainer = document.querySelector(".swiper-wrapper");
    cardContainer.innerHTML =
      "<p>فشل في تحميل الكتب. يرجى المحاولة لاحقاً.</p>";
  }
}

// استدعاء الوظيفة لجلب الكتب ذات التقييم الأعلى
getTopRatedBooks();
