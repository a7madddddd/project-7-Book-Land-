document.addEventListener('DOMContentLoaded', function () {
    const userId = 1; // Replace with actual user ID
    const wishlistTableBody = document.getElementById('wishlist-table-body');

    // Function to fetch wishlist data by userId
    function fetchWishlist() {
        fetch(`https://localhost:44301/api/UserProfile/wishlist/${userId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error fetching wishlist');
                }
                return response.json();
            })
            .then(wishlist => {
                // Clear existing table rows
                wishlistTableBody.innerHTML = '';

                // Check if wishlist is empty
                if (wishlist.length === 0) {
                    const emptyRow = `<tr><td colspan="5">Your wishlist is empty</td></tr>`;
                    wishlistTableBody.innerHTML = emptyRow;
                } else {
                    // Populate the table with wishlist items
                    wishlist.forEach(item => {
                        const tableRow = `
                                    <tr id="row-${item.productId}">
                                        <td class="product-item-img">
                                            <img src="${item.productImage}" alt="${item.productName}">
                                        </td>
                                        <td class="product-item-name">${item.productName}</td>
                                        <td class="product-item-price">$${item.unitPrice}</td>
                                        <td class="product-item-total">
                                            <a href="shop-cart.html" class="btn btn-primary btnhover">Add To Cart</a>
                                        </td>
                                        <td class="product-item-close">
                                            <a href="javascript:void(0);" class="ti-close" 
                                               onclick="removeFromWishlist(${item.productId})"></a>
                                        </td>
                                    </tr>
                                `;
                        wishlistTableBody.innerHTML += tableRow;
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Failed to fetch wishlist.');
            });
    }

    // Fetch wishlist on page load
    fetchWishlist();

    // Function to remove a book from the wishlist
    window.removeFromWishlist = function (bookId) {

        fetch(`https://localhost:44301/api/UserProfile/remove/${userId}/${bookId}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    // Remove the row from the table
                    const rowToDelete = document.getElementById(`row-${bookId}`);
                    if (rowToDelete) {
                        rowToDelete.remove();
                    }
                    alert('Book removed from wishlist');
                } else {
                    alert('Failed to remove the book');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
});
