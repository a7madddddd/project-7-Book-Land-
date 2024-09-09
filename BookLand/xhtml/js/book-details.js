document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get('bookId');  // Ensure the query parameter name is correct

    if (!bookId) {
        document.getElementById('bookDetailsContainer').innerHTML = '<p>No book specified.</p>';
        return;
    }

    const apiUrl = `https://localhost:7198/api/Shoping/${bookId}`;  // Make sure URL is correct and matches the server
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then(book => {
            const bookDetailsContainer = document.getElementById('bookDetailsContainer');
            let originalPrice = book.price;
            let discountedPrice = originalPrice * (1 - book.discountPercentage / 100);

            bookDetailsContainer.innerHTML = `
                <div class="dz-box">
                    <div class="dz-media">
                        <img src="${book.imageUrl}" alt="Cover of ${book.title}">
                    </div>
                    <div class="dz-content">
                        <div class="dz-header">
                            <h3 class="title">${book.title}</h3>
                            <div class="shop-item-rating">
                                <div class="d-lg-flex d-sm-inline-flex d-flex align-items-center">
                                    <ul class="dz-rating">${Array.from({ length: 5 }, (_, i) => `<li><i class="flaticon-star ${i < Math.floor(book.rating) ? 'text-yellow' : 'text-muted'}"></i></li>`).join('')}</ul>
                                    <h6 class="m-b0">${book.rating.toFixed(1)}</h6>
                                </div>
                                <div class="social-area">
                                    <ul class="dz-social-icon style-3">
                                        <li><a href="https://www.facebook.com/dexignzone" target="_blank"><i class="fa-brands fa-facebook-f"></i></a></li>
                                        <li><a href="https://twitter.com/dexignzones" target="_blank"><i class="fa-brands fa-twitter"></i></a></li>
                                        <li><a href="https://www.whatsapp.com/" target="_blank"><i class="fa-brands fa-whatsapp"></i></a></li>
                                        <li><a href="https://www.google.com/intl/en-GB/gmail/about/" target="_blank"><i class="fa-solid fa-envelope"></i></a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div class="dz-body">
                            <div class="book-detail">
                                <ul class="book-info">
                                    <li>
                                        <div class="writer-info">
                                            <img src="images/profile2.jpg" alt="Author Image">
                                            <div>
                                                <span>Written by </span>${book.author}
                                            </div>
                                        </div>
                                    </li>
                                    <li><span>Publisher: </span>${book.publisher}</li>
                                    <li><span>Year: </span>${book.yearPublished}</li>
                                </ul>
                            </div>
                            <p class="text-1">${book.description}</p>
                            <div class="book-footer">
                                <div class="price">
                                    <h5>$${discountedPrice.toFixed(2)}</h5>
                                    <p class="p-lr10"><del>$ ${originalPrice.toFixed(2)}</del></p>
                                </div>
                                <div class="product-num">
                                        <div class="quantity btn-quantity style-1 me-3">
                                                    <input id="demo_vertical2" type="text" value="1" name="demo_vertical2"/>
                                        </div>
                                    <a href="shop-cart.html" class="btn btn-primary btnhover btnhover2" onClick="addToCart(${book.bookId},${discountedPrice})"><i class="flaticon-shopping-cart-1"></i> <span>Add to cart</span></a>
                                    <div class="bookmark-btn style-1 d-none d-sm-block">
                                        <input class="form-check-input" type="checkbox" id="flexCheckDefault1">
                                        <label class="form-check-label" for="flexCheckDefault1">
                                            <i class="flaticon-heart"></i>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error fetching book details:', error);
            document.getElementById('bookDetailsContainer').innerHTML = '<p>Error loading book details.</p>';
        });
});


document.addEventListener('DOMContentLoaded', function () {
    const params = new URLSearchParams(window.location.search);
    const bookId = params.get('bookId');  // Ensure you are capturing the correct query parameter for book ID

    if (!bookId) {
        console.error('Book ID is missing in the URL');
        return;
    }

    // Fetch comments for the book
    fetch(`https://localhost:7198/api/Shoping/${bookId}/comments`) //https://localhost:7198/api/Shoping/3/comments

        .then(response => response.json())
        .then(comments => displayComments(comments))
        .catch(error => console.error('Failed to fetch comments:', error));
});

function displayComments(comments) {
    const commentsContainer = document.querySelector('.comment-list');
    commentsContainer.innerHTML = '';  // Clear existing comments

    // Update the number of comments
    const commentsTitle = document.querySelector('.comments-title');
    commentsTitle.textContent = `${comments.length} COMMENTS`;

    // Loop through each comment and append it to the comment list
    comments.forEach(comment => {
        commentsContainer.innerHTML += `
            <li class="comment even thread-even depth-1">
                <div class="comment-body">
                    <div class="comment-author vcard">
                        <img src="${comment.userImage}" alt="${comment.userName}" class="avatar"/>
                        <cite class="fn">${comment.userName}</cite> <span class="says">says:</span>
                        <div class="comment-meta">
                            <a href="javascript:void(0);">${new Date().toLocaleString()}</a>  // Assuming current date for simplicity
                        </div>
                    </div>
                    <div class="comment-content dlab-page-text">
                        <p>${comment.commentText}</p>
                    </div>
                    <div class="reply">
                        <a rel="nofollow" class="comment-reply-link" href="javascript:void(0);"><i class="fa fa-reply"></i> Reply</a>
                    </div>
                </div>
            </li>
        `;
    });
}

function addToCart(bookId, price) {
    const cartItem = {
        cart_id: Math.random().toString(36).substr(2, 9), // Generate a random cart ID
        bookId: parseInt(bookId),
        quantity: 1,
        format: "Hard Copy", // Default format
        price: parseFloat(price)
    };
    localStorage.setItem(`item${bookId}`, JSON.stringify(cartItem));
    alert('Added to cart!');  // Example usage:
    showNotification('This is a success message!', 'success');
}