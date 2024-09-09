document.addEventListener('DOMContentLoaded', function () {
    fetch('https://localhost:44301/api/BookLibrary')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('book-table-body');
            data.forEach(book => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><img src="${book.imageUrl}" alt="${book.title}" style="width: 100px;"/></td>
                    <td>${book.title}</td>
                    <td>$${book.price}</td>
                    <td>${book.format}</td>
                    <td>$${book.totalPrice}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching books:', error));
});
