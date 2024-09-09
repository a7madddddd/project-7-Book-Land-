const couponID = localStorage.getItem("CouponID");
const API = `https://localhost:44309/api/Coupons/UpdateCoupon/${couponID}`;

async function updateCoupon(event) {
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
                text: 'Coupon updated successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = 'Cupons.html';
            });
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update coupon.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'An error occurred while updating the coupon.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

async function loadCouponData() {
    if (!couponID) return;

    try {
        const response = await fetch(`https://localhost:44309/api/Coupons/GetCouponById/${couponID}`);
        const coupon = await response.json();

        // document.getElementById('couponID').value = coupon.id;
        document.getElementById('couponName').value = coupon.name;
        document.getElementById('discount').value = coupon.discountAmount;
        document.getElementById('expire').value = coupon.expirationDate;
        document.getElementById('status').value = coupon.status;
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'Failed to load coupon data.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

document.getElementById("form").addEventListener('submit', updateCoupon);

window.onload = loadCouponData;
