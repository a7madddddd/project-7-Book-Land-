// Fetch user data from API and load into the table
async function loadPoints() {
    const pointTable = document.getElementById("container");

    try {
        const response = await fetch('https://localhost:44309/api/EarningPoints/GetALLPoints');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const users = await response.json();

        users.forEach(point => {
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${point.id}</td>
            <td>${point.socialMediaShare}</td>
            <td>${point.bookPurchase}</td>
            <td>${point.inviteFriend}</td>
            <td>
                <a href="/EarningPoints/EditPoints.html" onclick="editPoint(${point.id}); return false;" class="btn btn-primary btn-sm">Edit</a>
            </td>
            `;

            pointTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching points:', error);
        pointTable.innerHTML = `<tr><td colspan="5">Failed to load points.</td></tr>`;
    }
}

function editPoint(id) {
    Swal.fire({
        title: 'Edit User',
        text: `You are editing points with ID: ${id}`,
        icon: 'info',
        confirmButtonText: 'OK'
    }).then(() => {
        localStorage.setItem("PointID", id);
        window.location.href = `/EarningPoints/EditPoints.html`; 
    });
}

window.onload = loadPoints;
