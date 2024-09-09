var n = localStorage.getItem("userId");
const url2 = `http://localhost:44301/api/Wishlist/wishlistItemCount/${n}`;

async function getWishlist() {
  try {
    const response = await fetch(url2, { method: "GET" });

    if (!response.ok) {
      // Handle non-200 responses
      console.error("Error fetching wishlist:", response.statusText);
      document.getElementById("badgeWishlist").innerHTML = "0";
      return;
    }

    const result = await response.json();

    // Check if result.count is undefined or null
    const count = result.count != null ? result.count : 0;

    const container = document.getElementById("badgeWishlist");
    container.innerHTML = count;
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("badgeWishlist").innerHTML = "0";
  }
}

getWishlist();
