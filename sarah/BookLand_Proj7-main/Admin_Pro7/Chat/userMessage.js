var userId = localStorage.getItem('userId');

async function GetAllMessage() {
    debugger;
    if (!userId) {
        console.error('User ID is not found in localStorage.');
        return;
    }

    const API = `https://localhost:44309/api/Chat/showMessage/${userId}`;

    try {
        const response = await fetch(API);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const messageContainer = document.getElementById("message-container");

        // Clear previous messages
        messageContainer.innerHTML = '';

        // Display new messages
        data.forEach(message => {
            messageContainer.innerHTML += `
                <div><strong>${message.flag === 1 ? 'Admin' : 'User'}:</strong></div>
                <div class="message-item">${message.cmessages}</div>
            `;
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
}

// Call the function to load messages
GetAllMessage();

async function sendMessage() {
    debugger;
    const messageInput = document.getElementById('message-input').value.trim();

    // Ensure the admin has entered a message
    if (!messageInput) {
        alert("Please enter a message before sending.");
        return;
    }

    const API = `https://localhost:44309/api/Chat/replayMessage/${userId}`;
    const messageData = {
        cmessages: messageInput, // Ensure this field matches your backend
        flag: 1 // Default flag for admin message
    };

    try {
        const response = await fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(messageData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Clear the input field after sending the message
        document.getElementById('message-input').value = '';

        // Reload the messages to reflect the new message
        GetAllMessage(); // Call this function to refresh messages instead of reloading the page
    } catch (error) {
        console.error('Error sending message:', error);
    }
}
