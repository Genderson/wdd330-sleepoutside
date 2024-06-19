// Function to initialize the pop-up
function initNewsletterPopup() {
    // Get the pop-up element
    const popup = document.getElementById('popup');
    // Get the close button element inside the pop-up
    const closeBtn = document.querySelector('.popup .close');
    // Get the subscribe button element inside the pop-up
    const subscribeBtn = document.getElementById('subscribe');

    // Function to display the pop-up
    function showPopup() {
        popup.style.display = 'block';
    }

    // Function to hide the pop-up
    function closePopup() {
        popup.style.display = 'none';
    }

    // Add click event listener to close button to close the pop-up
    closeBtn.addEventListener('click', closePopup);

    // Add click event listener to subscribe button to handle subscription logic
    subscribeBtn.addEventListener('click', () => {
        // Get the value of the email input field
        const email = document.getElementById('email').value;
        if (email) {
            // Handle the subscription logic here, e.g., send the email to the server
            console.log(`Subscribed with email: ${email}`);
            // Close the pop-up after subscribing
            closePopup();
        } else {
            // Alert the user if the email field is empty
            alert('Please enter your email address.');
        }
    });

    // Show the pop-up when the user visits the homepage or the cart page
    if (window.location.pathname === '/' || window.location.pathname === '/cart') {
        showPopup();
    }
}

// Load the pop-up HTML and initialize it
document.addEventListener('DOMContentLoaded', () => {
    // Fetch the pop-up HTML
    fetch('/pop-up/popup.html')
        .then(response => response.text())
        .then(data => {
            // Insert the pop-up HTML into the body of the page
            document.body.insertAdjacentHTML('beforeend', data);
            // Initialize the pop-up after it is loaded
            initNewsletterPopup();
        });
});