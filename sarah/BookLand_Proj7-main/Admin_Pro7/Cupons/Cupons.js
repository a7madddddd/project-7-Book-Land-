// Fetch coupon data from API and load into the table
async function loadCoupons() {
    const couponsTable = document.getElementById("container");

    try {
        const response = await fetch('https://localhost:44309/api/Coupons/GetAllCoupons');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const coupons = await response.json();

        coupons.forEach(coupon => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${coupon.id}</td>
                <td>${coupon.name}</td>
                <td>${coupon.discountAmount}</td>
                <td>${coupon.expirationDate}</td>
                <td>${coupon.status}</td>
                <td>
                    <a href="/Cupons/editCupons.html" onclick="editCoupon(${coupon.id}); return false;" class="btn btn-primary btn-sm">Edit</a>
                    <button class="btn btn-danger btn-sm" onclick="deleteCoupon(${coupon.id}, this)">Delete</button>
                </td>
            `;

            couponsTable.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching coupons:', error);
        couponsTable.innerHTML = `<tr><td colspan="5">Failed to load coupons.</td></tr>`;
    }
}

function editCoupon(id) {
    Swal.fire({
        title: 'Edit Coupon',
        text: `You are editing coupon with ID: ${id}`,
        icon: 'info',
        confirmButtonText: 'OK'
    }).then(() => {
        localStorage.setItem("CouponID", id);
        window.location.href = `/Cupons/editCupons.html`; 
    });
}

async function deleteCoupon(id, buttonElement) {
    // Show SweetAlert confirmation dialog
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: `You are about to delete coupon with ID: ${id}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel'
    });

    // If confirmed
    if (result.isConfirmed) {
        const API = `https://localhost:44309/api/Coupons/DeleteCoupon/${id}`;
        
        try {
            let response = await fetch(API, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                // Show success SweetAlert
                Swal.fire(
                    'Deleted!',
                    `Coupon with ID ${id} has been deleted.`,
                    'success'
                );

                // Remove the row element from the table
                buttonElement.closest('tr').remove();
            } else {
                // Show error SweetAlert
                Swal.fire(
                    'Error!',
                    'There was a problem deleting the coupon.',
                    'error'
                );
            }
        } catch (error) {
            // Handle fetch error (network issue, etc.)
            Swal.fire(
                'Error!',
                'An error occurred while deleting the coupon.',
                'error'
            );
        }
    }
}

window.onload = loadCoupons;
