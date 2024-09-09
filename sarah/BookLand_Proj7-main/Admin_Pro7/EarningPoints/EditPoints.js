const pointID = localStorage.getItem("PointID");
const API = `https://localhost:44309/api/EarningPoints/UpdateEarningPoints/${pointID}`;

// Handle form submission
async function editPoint(event) {
    event.preventDefault();

    const form = document.getElementById("form");
    const formData = new FormData(form);
    try {
        const response = await fetch(API, {
            method: "PUT",
            body: formData
        });

        if (response.ok) {
            Swal.fire({
                title: 'Success!',
                text: 'Points updated successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = 'EarningPoints.html';
            });
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update points.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'An error occurred.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

// Load point data into the form
async function loadPointsData() {
    if (!pointID) return;

    try {
        const response = await fetch(`https://localhost:44309/api/EarningPoints/GetAllEarningPoints/id/${pointID}`);
        const point = await response.json();

        document.getElementById('socialmedia').value = point.socialMediaShare;
        document.getElementById('bookpurchase').value = point.bookPurchase;
        document.getElementById('invitefriend').value = point.inviteFriend;
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'Failed to load points data.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

// Attach the submit event handler
document.getElementById("form").addEventListener('submit', editPoint);

// Load data on page load
window.onload = loadPointsData;
