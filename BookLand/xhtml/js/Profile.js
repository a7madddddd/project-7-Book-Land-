// // Function to fetch user profile data and populate the form
// async function UserProfile(id) {
//     debugger
//     try {
//         const apiUrl = `https://localhost:44301/api/UserProfile/${id}`;
//         const response = await fetch(apiUrl );
//          console.log(response);

//         if (!response.ok) {
//             throw new Error(`Network response was not ok (${response.status})`);
//         }

//         const userData = await response.json();

//         populateForm(userData);

//     } catch (error) {
//         alert('Error fetching the user profile:', error);
//     }
// }

// // Function to populate the form with user data
// function populateForm(userData) {
//     const formFields = {
//         name: 'name',
//         professionalTitle: 'formcontrolinput2',
//         languages: 'formcontrolinput3',
//         age: 'formcontrolinput4',
//         description: 'exampleFormControlTextarea',
//         contactNumber: 'phoneNumber',
//         email: 'email',
//         country: 'formcontrolinput7',
//         postcode: 'formcontrolinput8',
//         city: 'formcontrolinput9',
//         fullAddress: 'address',
//     };

//     Object.keys(formFields).forEach((key) => {
//         const elementId = formFields[key];
//         const value = userData[key] || '';
//         document.getElementById(elementId).value = value;
//     });
// }



// document.getElementById('UserProfile').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent the default form submission behavior

//     const apiUrl = 'https://localhost:44301/api/UserProfile/1';
//     const formData = new FormData(); // Use FormData to handle multipart/form-data type

//     // Append form fields to formData
//     formData.append('Name', document.getElementById('name').value);
//     formData.append('Email', document.getElementById('email').value);
//     // formData.append('Image', document.getElementById('image').value); // Assuming there's an input with ID 'image'
//     formData.append('Address', document.getElementById('address').value);
//     formData.append('PhoneNumber', document.getElementById('phoneNumber').value);

//     fetch(apiUrl, {
//         method: 'PUT',
//         body: formData,
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log(data);
//         alert('Profile updated successfully!');
//     })
//     .catch(error => {
//         console.error('Error updating the profile:', error);
//         alert('Failed to update profile.');
//     });
// });


// // Call the function when the page loads or when the user ID is available
// window.onload = function () {
//     const userId = 1;  // Replace with dynamic userId
//     UserProfile(userId);
// };







// //////////////////////////////
// document.addEventListener('DOMContentLoaded', function () {
//     const userId = 1; // Replace with the actual user ID

//     // Fetch user profile data and populate the form
//     fetch(`https://localhost:44301/api/UserProfile/GetUserProfile/${userId}`)
//         .then(response => response.json())
//         .then(data => {
//             // Populate the form with user data
//             document.getElementById('username').value = data.UserName;
//             document.getElementById('email').value = data.Email;
//             document.getElementById('phoneNumber').value = data.PhoneNumber;
//             document.getElementById('professionalTitle').value = data.ProfessionalTitle;
//             document.getElementById('languages').value = data.Languages;
//             document.getElementById('age').value = data.Age;
//             document.getElementById('description').value = data.Description;
//             document.getElementById('country').value = data.Country;
//             document.getElementById('city').value = data.City;
//             document.getElementById('postcode').value = data.Postcode;
//         })
//         .catch(error => console.error('Error fetching user profile:', error));
// });


















// document.getElementById('UserProfile').addEventListener('submit', function(event) {
//     event.preventDefault(); // Prevent form from submitting the default way

// const userId = 1; // Replace with dynamic user ID
//     const userApiUrl = `https://localhost:44301/api/UserProfile/UpdateUserDetail/${userId}`;
//     const userDetailApiUrl = `https://localhost:44301/api/UserProfile/${userId}`;

// const userFormData = new FormData();
// const userDetailFormData = new FormData();

// // User data (e.g. Email, Phone)
// userFormData.append('Email', document.getElementById('email').value);
// userFormData.append('PhoneNumber', document.getElementById('phoneNumber').value);

// // UserDetail data (Professional Title, etc.)
// userDetailFormData.append('ProfessionalTitle', document.getElementById('professionalTitle').value);
// userDetailFormData.append('Languages', document.getElementById('languages').value);
// userDetailFormData.append('Age', document.getElementById('age').value);
// userDetailFormData.append('Description', document.getElementById('description').value);
// userDetailFormData.append('Country', document.getElementById('country').value);
// userDetailFormData.append('City', document.getElementById('city').value);
// userDetailFormData.append('Postcode', document.getElementById('postcode').value);

// // Update User (Email, Phone, etc.)
// fetch(userApiUrl, {
//     method: 'PUT',
// body: userFormData
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
// return response.json();
//     })
//     .then(data => {
//     console.log('User updated successfully:', data);
//     })
//     .catch(error => console.error('Error updating user:', error));

// // Update UserDetail (Professional Title, Languages, etc.)
// fetch(userDetailApiUrl, {
//     method: 'PUT',
// body: userDetailFormData
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(`HTTP error! Status: ${response.status}`);
//         }
// return response.json();
//     })
//     .then(data => {
//     console.log('UserDetail updated successfully:', data);
//     })
//     .catch(error => console.error('Error updating user detail:', error));
// });


// ${ userId }

// $(document).ready(function () {
//     debugger
//     fetch(`https://localhost:44301/api/UserDetails/1`)
//         .then(response => response.json())
//         .then(data => {
//             $("#formcontrolinput2").val(data.professionalTitle);
//             $("#formcontrolinput3").val(data.languages);
//             $("#formcontrolinput4").val(data.age);
//             $("#exampleFormControlTextarea").val(data.description);
//             $("#formcontrolinput7").val(data.country);
//             $("#formcontrolinput9").val(data.city);
//             $("#formcontrolinput8").val(data.postcode);
//         })
//         .catch(error => console.error('Error:', error));
// });




// async function fetchUserProfile(userId) {
//     debugger
//     const url = `https://localhost:44301/api/UserProfile/${userId}`;

//     try {
//         const response = await fetch(url);

//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         updateProfileFields(data);
//     } catch (error) {
//         console.error('Error fetching user profile:', error);
//         alert('Error fetching user profile.');
//     }
// }

// function updateProfileFields(data) {
//     $('#name').val(data.name);
//     $('#phoneNumber').val(data.phoneNumber);
//     $('#email').val(data.email);
//     $('#address').val(data.address);
// }



// async function fetchUserProfile(userId) {
//     console.log('Fetching user profile for userId:', userId);
//     const url = `https://localhost:44301/api/UserProfile/${userId}`;

//     try {
//         const response = await fetch(url);

//         if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }

//         const data = await response.json();
//         console.log('User profile data:', data);
//         updateProfileFields(data);
//     } catch (error) {
//         console.error('Error fetching user profile:', error);
//         alert('Error fetching user profile.');
//     }
// }

// function updateProfileFields(data) {
//     console.log('Updating profile fields with data:', data);
//     $('#name').val(data.name);
//     $('#phoneNumber').val(data.phoneNumber);
//     $('#email').val(data.email);
//     $('#address').val(data.address);
// }

// // Example usage
// fetchUserProfile(1); // Replace 1 with the actual user ID





// $(document).ready(function () {
//     const userId = 1;

//     function fetchUserData(id) {
//         return fetch(`https://localhost:44301/api/CompinedData/${id}/fullProfile`)
//             .then(response => response.json())
//             .catch(error => console.error('Error:', error));
//     }

//     function populateForm(data) {
//         // Populate Basic Information
//         $("#name").val(data.name);
//         $("#phoneNumber").val(data.phoneNumber);
//         $("#email").val(data.email);
//         $("#address").val(data.address);

//         // Populate Contact Information
//         $("#formcontrolinput2").val(data.professionalTitle);
//         $("#formcontrolinput3").val(data.languages);
//         $("#formcontrolinput4").val(data.age);
//         $("#exampleFormControlTextarea").val(data.description);
//         $("#formcontrolinput7").val(data.country);
//         $("#formcontrolinput9").val(data.city);
//         $("#formcontrolinput8").val(data.postcode);
//     }

//     fetchUserData(userId)
//         .then(data => populateForm(data))
//         .catch(error => console.error('Error:', error));

//     async function updateProfile(userId, updatedProfile) {
//         try {
//             const response = await fetch(`https://localhost:44301/api/CompinedData/${userId}/fullProfile`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(updatedProfile)
//             });

//             if (!response.ok) {
//                 throw new Error(`Failed to update profile: ${response.status} ${response.statusText}`);
//             }

//             return response;
//         } catch (error) {
//             console.error('Error updating profile:', error);
//             throw error;
//         }
//     }

//     async function updateUserProfile(userId) {
//         const updatedProfile = {
//             // Get values from form fields
//             name: $('#name').val(),
//             email: $('#email').val(),
//             phoneNumber: $('#phoneNumber').val(),
//             address: $('#address').val(),

//             // Contact Information
//             professionalTitle: $("#formcontrolinput2").val(),
//             languages: $("#formcontrolinput3").val(),
//             age: $("#formcontrolinput4").val(),
//             description: $("#exampleFormControlTextarea").val(),
//             country: $("#formcontrolinput7").val(),
//             city: $("#formcontrolinput9").val(),
//             postcode: $("#formcontrolinput8").val(),
//         };

//         try {
//             const response = await updateProfile(userId, updatedProfile);
//             alert('Profile updated successfully!');
//         } catch (error) {
//             alert('Error updating profile.');
//         }
//     }

//     // Move the updateUserProfile function call inside the $(document).ready function
//     updateUserProfile(userId);
// });







$(document).ready(function () {
    const userId = 1;
    // Function to fetch user data
    function fetchUserData(id) {
        return fetch(`https://localhost:44301/api/CompinedData/${id}/fullProfile`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch user data: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
                throw error; // Rethrow the error
            });
    }

    // Function to populate the form with user data
        function populateForm(data) {
            $("#name").val(data.name);
            $("#phoneNumber").val(data.phoneNumber);
            $("#email").val(data.email);
            $("#address").val(data.address);
            $("#formcontrolinput2").val(data.professionalTitle);
            $("#formcontrolinput3").val(data.languages);
            $("#formcontrolinput4").val(data.age);
            $("#exampleFormControlTextarea").val(data.description);
            $("#formcontrolinput7").val(data.country);
            $("#formcontrolinput9").val(data.city);
            $("#formcontrolinput8").val(data.postcode);
            
            $(".account-detail h4 a").text(data.name);  // Update the name
            $(".account-detail p a").text(data.professionalTitle);  // Update the professional title
            $(".my-image img").attr("src", data.profileImage);  // Update image
        }

    // Function to update the user profile
    async function updateProfile(id, updatedProfile) {
        try {
            const response = await fetch(`https://localhost:44301/api/CompinedData/${id}/fullProfile`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedProfile)
            });

            // Check if the response is not OK
            if (!response.ok) {
                let errorMessage = `${response.status} ${response.statusText}`;

                // Attempt to parse the error response
                try {
                    const contentType = response.headers.get('Content-Type');
                    if (contentType && contentType.includes('application/json')) {
                        const errorData = await response.json();
                        errorMessage += `: ${errorData.message || ''}`;
                    } else {
                        errorMessage += `: Unable to parse error details. Response is not JSON.`;
                    }
                } catch (e) {
                    errorMessage += `: Unable to parse error details.`;
                }

                throw new Error(`Failed to update profile: ${errorMessage}`);
            }

            // Optionally return response data if needed
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json(); // Assuming server responds with JSON
            } else {
                return {}; // Return an empty object if response is not JSON
            }

        } catch (error) {
            // Log and alert the error message
            console.error('Error updating profile:', error);
            alert(`Error updating profile: ${error.message}`);
            throw error; // Re-throw to allow higher-level handling if necessary
        }
    }


    // Function to handle the form submission event
    $("#UserProfile").submit(function (event) {
        event.preventDefault(); // Prevent the default form submission

        const updatedProfile = {
            name: $('#name').val(),
            email: $('#email').val(),
            phoneNumber: $('#phoneNumber').val(),
            address: $('#address').val(),
            professionalTitle: $("#formcontrolinput2").val(),
            languages: $("#formcontrolinput3").val(),
            age: $("#formcontrolinput4").val(),
            description: $("#exampleFormControlTextarea").val(),
            country: $("#formcontrolinput7").val(),
            city: $("#formcontrolinput9").val(),
            postcode: $("#formcontrolinput8").val()
        };

        // Validate the input data
        if (!updatedProfile.name || !updatedProfile.email) {
            alert('Please fill in the required fields.');
            return;
        }

        updateProfile(userId, updatedProfile)
            .then(() => alert('Profile updated successfully!'))
            .catch(() => alert('Error updating profile.'));
       
});

    // Fetch and populate user data on page load
    fetchUserData(userId)
        .then(data => populateForm(data))
        .catch(error => console.error('Error:', error));
}
);
