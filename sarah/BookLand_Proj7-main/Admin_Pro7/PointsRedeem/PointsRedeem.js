async function loadPoints() {
    const pointTable = document.getElementById("container");

    try {
        const response = await fetch('https://localhost:44309/api/PointsRedeem/GetALLRedeem');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const users = await response.json();

        users.forEach(point => {
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${point.id}</td>
            <td>${point.pointsAmount}</td>
            <td>${point.discountPercentage}</td>
            <td>${point.spinningWheel}</td>
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
        title: 'Edit Points',
        text: `You are editing points with ID: ${id}`,
        icon: 'info',
        confirmButtonText: 'OK'
    }).then(() => {
        localStorage.setItem("PointID", id);
        window.location.href = `/EarningPoints/EditPoints.html`; 
    });
}

window.onload = loadPoints;
