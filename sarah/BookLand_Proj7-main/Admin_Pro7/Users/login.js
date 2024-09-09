async function Login(event) {
    event.preventDefault();
    debugger;

    const API = `https://localhost:44309/api/Admin/Login`;
    var form = document.getElementById("loginForm");
    var formData = new FormData(form);

    try {
        var response = await fetch(API, {
            method: "POST",
            body: formData
        });

        if (response.ok) {
            var result = await response.json();
            localStorage.setItem('jwtToken', result.token);
            
            // SweetAlert for successful login
            Swal.fire({
                title: 'Login Successful!',
                text: 'You are being redirected to the dashboard...',
                icon: 'success',
                showConfirmButton: false,
                timer: 1800
            }).then(() => {
                window.location.href = "../index.html";
            });
        } else {
            // SweetAlert for login failure
            Swal.fire({
                title: 'Login Failed!',
                text: 'Please check your email and password.',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        }
    } catch (error) {
        console.error('Error:', error);
        
        // SweetAlert for error
        Swal.fire({
            title: 'Error Occurred',
            text: 'An error occurred while logging in. Please try again later.',
            icon: 'error',
            confirmButtonText: 'Ok'
        });
    }
}

document.getElementById("loginForm").addEventListener("submit", Login);
