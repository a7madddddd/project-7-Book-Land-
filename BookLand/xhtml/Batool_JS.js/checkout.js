

// countries dropdown
$(document).ready(function () {
    // Initialize the selectpicker or dropdown
    $('#countriesSelect').selectpicker({ liveSearch: true });
    $('#anotherDropdown').selectpicker({ liveSearch: true });

    window.addEventListener("load", async function () {
        const countriesAPI = "https://restcountries.com/v2/all?fields=name";

        const selectCountries = document.getElementById("countriesSelect");
        const selectAnother = document.getElementById("anotherDropdown");

        const response = await fetch(countriesAPI);
        const data = await response.json();

        data.forEach(country => {
            // create the options for the first dropdown
            const option = document.createElement("option");
            option.value = country.name;
            option.textContent = country.name;
            selectCountries.appendChild(option);
            // create the options for the second dropdown
            const option2 = document.createElement("option");
            option2.value = country.name;
            option2.textContent = country.name;
            selectAnother.appendChild(option2);
        });

        // Refresh the selectpicker after dynamically adding options
        $('#countriesSelect').selectpicker('refresh');
        $('#anotherDropdown').selectpicker('refresh');

    });
});



// fil user info into form
const userID = localStorage.getItem("userId");

async function getUserInfo(id) {
    const url = `https://localhost:7198/api/Orders/getUserInfo/${id}`;
    const response = await fetch(url);
    let Data = await response.json();

    Data.forEach(element => {
        document.getElementById("userName").value = element.name;
        document.getElementById("userEmail").value = element.email;
        document.getElementById("userPhone").value = element.phoneNumber;
    }
    );

};
getUserInfo(userID);



// disable the first part of the form if you open the second part

// Get references to necessary elements
let billingInputs = document.querySelectorAll('#billingShippingAddress input, #billingShippingAddress select');
let giftButton = document.getElementById('sendGift');
let giftSection = document.getElementById('different-address');

// Function to disable/enable billing form inputs
function toggleBillingInputs(disable) {
    billingInputs.forEach(input => {
        input.disabled = disable;
    });
}

// Event listener for when the gift section is shown
giftSection.addEventListener('shown.bs.collapse', function () {
    toggleBillingInputs(true);  // Disable the billing section when the gift section is shown
});

// Event listener for when the gift section is hidden
giftSection.addEventListener('hidden.bs.collapse', function () {
    toggleBillingInputs(false);  // Re-enable the billing section when the gift section is hidden
});



// localStorage.setItem("orderID", 30); // tester order
// localStorage.setItem("couponPercentage", 20); // tester coupon


const getOrderId = localStorage.getItem("orderID");
const getCouponPercent = localStorage.getItem("couponPercentage");
const getUserId = localStorage.getItem("userId");


// fill order items table
async function fillOrderItemsTable(orderid) {
    const url = `https://localhost:7198/api/Orders/getFinalOrderItemsInfo/${orderid}`;
    const response = await fetch(url);
    let Data = await response.json();

    const tbody = document.getElementById("orderItemsTableBody");

    Data.forEach(element => {
        let itemTotal = element.price * element.quantity;
        tbody.innerHTML += `
        										<tr>
											<td class="product-item-img"><img src="${element.pi.imageUrl}" alt="">
											</td>
											<td class="product-item-name">${element.pi.title}</td>
											<td class="product-quantity">${element.quantity}</td>
											<td class="product-price">${element.format}</td>
											<td class="product-price">$${itemTotal}</td>
										</tr>
        `});
};
fillOrderItemsTable(getOrderId);



// fill order total table
async function getOrderTotal(orderid, couponPercent) {
    // debugger
    const url = `https://localhost:7198/api/Orders/OrderTotal/${orderid}/${couponPercent}`;
    const response = await fetch(url);
    let Data = await response.json();

    Data.forEach(element => {
        document.getElementById("orderSubTotal").textContent += element.totalAmount;
        document.getElementById("appliedCoupons").textContent += element.couponDiscount;
        document.getElementById("finalTotal").textContent += element.finalPrice;

        // add total amount to localstorage to add to paypal
        localStorage.setItem("totalAmount", element.finalPrice);
    });

};
getOrderTotal(getOrderId, getCouponPercent);




// paypal integration
function initPayPalButton() {

    const total = localStorage.getItem('totalAmount');
    let totalValue = total ? parseFloat(total) : 99.99;

    paypal.Buttons({
        style: {
            shape: 'rect',
            color: 'gold',
            layout: 'vertical',
            label: 'paypal',
        },

        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{ "amount": { "currency_code": "USD", "value": totalValue.toFixed(2) } }]
            });
        },

        onApprove: function (data, actions) {
            return actions.order.capture().then(function (orderData) {

                // Full available details
                console.log('Capture result', orderData, JSON.stringify(orderData, null, 2));

                // Show a success message within this page, for example:
                const element = document.getElementById('paypal-button-container');
                element.innerHTML = '';
                element.innerHTML = '<h3>Thank you for your payment!</h3>';

                // Or go to another URL:  actions.redirect('thank_you.html');

            });
        },

        onError: function (err) {
            console.log(err);
        }
    }).render('#paypal-button-container');
};
initPayPalButton();



async function finishOrder() {

    const orderid = localStorage.getItem("orderID");
    const userid = localStorage.getItem("userId");

    // update status of the order in the database to "Paid" 
    // add transaction id to the order

    const editOrderURL = `https://localhost:7198/api/Orders/FinishOrder/${orderid}`;

    let response = await fetch(editOrderURL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: userid })
    });


    // send orders to library

    const sendToLibraryURL = `https://localhost:7198/api/Orders/SendBooksToLibrary/${userid}-${orderid}`;

    let sendResponse = await fetch(sendToLibraryURL, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }

    });

    location.href = "services.html";

};





