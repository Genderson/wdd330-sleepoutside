document.addEventListener('DOMContentLoaded', () => {

    document.body.addEventListener('click', (event) => {
        if (event.target.id == 'loginRegister') {
            // Check if the pop-up is already loaded
            if (!document.getElementById('loginPopup')) {
                // Fetch the login/register pop-up HTML
                fetch('./pop-up/loginPopup.html')
                // /src/pop-up/popup.html
                    .then(response => response.text())
                    .then(data => {
                        // Insert the pop-up HTML into the body of the page
                        document.body.insertAdjacentHTML('beforeend', data);
                        // Initialize the login/register pop-up after it is loaded
                        initLoginPopup();
                        // Show the pop-up
                        document.getElementById('loginPopup').style.display = 'block';
                    })
                    .catch(error => console.error('Error fetching pop-up HTML:', error));
            } else {
                // If the pop-up is already loaded, just display it
                document.getElementById('loginPopup').style.display = 'block';
            }
        }
    });

});

function initLoginPopup() {
    const loginPopup = document.getElementById('loginPopup');
    const closeBtn = document.querySelector('.popup .close');


    if (loginPopup && closeBtn) {
        function showPopup() {
            loginPopup.style.display = 'block'; // Show the pop-up
        }

        function closePopup() {
            loginPopup.style.display = 'none'; // Hide the pop-up
        }

        closeBtn.addEventListener('click', closePopup);

        // Handle form submission for logging in
        document.getElementById('loginForm').addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent the default form submission
            const email = document.getElementById('email').value; // Get the email value
            const password = document.getElementById('password').value; // Get the password value
            console.log(`Logging in with email: ${email} and password: ${password}`);
            closePopup(); // Close the pop-up after logging in
        });

        // Handle register link click
        document.getElementById('registerLink').addEventListener('click', (e) => {
            e.preventDefault(); // Prevent the default link action
            console.log('Redirect to register page');
            closePopup(); // Close the pop-up after clicking the register link
        });
    } else {
        console.log('Pop-up or close button not found in the DOM');
    }
}