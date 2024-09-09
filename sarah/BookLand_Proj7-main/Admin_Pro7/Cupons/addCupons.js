const API = `https://localhost:44309/api/Coupons/CreateCoupon`;

async function addCoupon(event) {
    event.preventDefault();

    const form = document.getElementById("form");
    const formData = new FormData(form);

    const data = {
        name: formData.get('name'),
        discountAmount: parseInt(formData.get('discountAmount'), 10),
        expirationDate: formData.get('expirationDate'), 
        status: formData.get('status')
    };

    try {
        const response = await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify(data)
        });

        if (response.ok) {
            Swal.fire({
                title: 'Success!',
                text: 'Coupon added successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = 'Cupons.html';
            });
        } else {
            const errorMessage = await response.text();
            Swal.fire({
                title: 'Error!',
                text: `Failed to add coupon. ${errorMessage}`,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'An error occurred while adding the coupon.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}

document.getElementById("form").addEventListener('submit', addCoupon);
