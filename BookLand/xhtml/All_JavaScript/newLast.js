let url18 = `http://localhost:44301/api/LatestNews`;

async function getNews() {
  try {
    const response = await fetch(url18);
    const result = await response.json(); // array of news
    console.log("najlaa", result); // قم بفحص البيانات في الـ console

    const newsContainer = document.getElementById("Latest");

    // Clear previous content
    newsContainer.innerHTML = "";

    // Generate and append the content for each news item
    result.forEach((news) => {
      newsContainer.innerHTML += `
        <div class="swiper-slide">
          <div class="news-card">
            <div class="news-media">
              <img src="${news.imageUrl || "default-image.jpg"}" alt="${
        news.newsType || "News Image"
      }" />
            </div>
            <div class="news-content">
              <h5>${news.newsType || "No Title"}</h5>
              <p>${news.description || "No Description"}</p>
              <div class="news-meta">
                <span class="date"> <i class="far fa-calendar fa-fw m-r10"></i> ${new Date(
                  news.publishedAt
                ).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    // Reinitialize Swiper after content is loaded
    initializeSwiper();
  } catch (error) {
    console.error("Error fetching news:", error);
  }
}

// Function to initialize Swiper
function initializeSwiper() {
  const swiper = new Swiper(".swiper-container", {
    slidesPerView: 3, // عدد المقالات التي تظهر في وقت واحد
    spaceBetween: 20, // المسافة بين السلايدات
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
}

// Fetch news and initialize Swiper after data is ready
getNews();
