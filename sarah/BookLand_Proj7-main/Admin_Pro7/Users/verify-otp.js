document.getElementById("verifyOtpForm").addEventListener("submit", async function(event) {
    event.preventDefault();

    const API = `https://localhost:44309/api/Admin/ResetPassword`;
    const form = new FormData(document.getElementById("verifyOtpForm"));

    try {
        let response = await fetch(API, {
            method: 'POST',
            body: form
        });

        if (response.ok) {
            Swal.fire('Success', 'Password reset successfully!', 'success');
            window.location.href = "login.html";
        } else {
            Swal.fire('Error', 'Failed to reset password. Invalid OTP or email!', 'error');
        }
    } catch (error) {
        console.error(error);
        Swal.fire('Error', 'An error occurred.', 'error');
    }
});
