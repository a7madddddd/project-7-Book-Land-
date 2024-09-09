document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(document.getElementById('contactForm'));

    // Convert form data to URL-encoded string
    const formBody = Array.from(formData.entries())
        .map(([key, value]) => encodeURIComponent(key) + '=' + encodeURIComponent(value))
        .join('&');

    // Send a POST request to the server with URL-encoded data
    fetch('https://localhost:44301/api/UserProfile', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody,  // Send the data as URL-encoded
    })
        .then(response => {
            console.log("Response Status:", response.status);  // Debugging purposes

            if (!response.ok) {
                return response.json().then(data => { throw new Error(data.title || 'Network response was not ok.'); });
            }

            return response.text();  // Read response as text
        })
        .then(data => {
            console.log("Response Data:", data);  // Debugging purposes
            alert('Message sent successfully!');
            document.getElementById('contactForm').reset();
        })
        .catch(error => {
            console.error('Error:', error);
            alert(`An error occurred while sending the message: ${error.message}`);
        });
});
