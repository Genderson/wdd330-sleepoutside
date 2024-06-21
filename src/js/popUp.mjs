// Function to initialize the newsletter pop-up
function initNewsletterPopup() {
    const popup = document.getElementById('popup');
    const closeBtn = document.querySelector('.popup .close');
    const subscribeBtn = document.getElementById('subscribe');

    function showPopup() {
        popup.style.display = 'flex';
    }

    function closePopup() {
        popup.style.display = 'none';
    }

    closeBtn.addEventListener('click', closePopup);

    subscribeBtn.addEventListener('click', () => {
        const email = document.getElementById('email').value;
        if (email) {
            // Handle the subscription logic here
            console.log(`Subscribed with email: ${email}`);
            closePopup();
        } else {
            alert('Please enter your email address.');
        }
    });

    // Show the pop-up on homepage or cart page
    // couldn't get this to work - I was tying to show the pop-up on the homepage and checkout page if the script was loading on a different page it would not load. 
    // if (window.location.pathname === '/src/index.html' || window.location.pathname === './checkout/index.html') {
    //     showPopup();
    // }
}

// Load the pop-up HTML and initialize it
document.addEventListener('DOMContentLoaded', () => {
    fetch('/pop-up/popup.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('beforeend', data);
            initNewsletterPopup();
        });
});

// Path: src/js/cart.mjs

//sources
//https://www.w3schools.com/js/js_cookies.asp
//https://www.w3schools.com/jsref/met_win_settimeout.asp
//https://www.w3schools.com/jsref/met_win_clearinterval.asp
//https://javascript.info/event-delegation
//https://javascript.info/introduction-browser-events