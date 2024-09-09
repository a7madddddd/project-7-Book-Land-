document.getElementById("resetPasswordForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const API = `https://localhost:44309/api/Admin/SendOtp`;
    const form = new FormData(document.getElementById("resetPasswordForm"));

    try {
        let response = await fetch(API, {
            method: 'POST',
            body: form
        });

        if (response.ok) {
            Swal.fire('Success', 'OTP sent to your email!', 'success');
            window.location.href = "verify-otp.html";
        } else {
            Swal.fire('Error', 'Failed to send OTP. Try again!', 'error');
        }
    } catch (error) {
        console.error(error);
        Swal.fire('Error', 'An error occurred.', 'error');
    }
});
