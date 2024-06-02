function initLoginPopup() {
    // Get the pop-up element
    const loginPopup = document.getElementById('loginPopup');
    // Get the close button element inside the pop-up
    const closeBtn = document.querySelector('.popup .close');
    // Get the register/login button element in the top bar
    const loginRegisterBtn = document.getElementById('loginRegister');

    // Function to display the pop-up
    function showPopup() {
        loginPopup.style.display = 'block'; // Show the pop-up
    }

    // Function to hide the pop-up
    function closePopup() {
        loginPopup.style.display = 'none'; // Hide the pop-up
    }

    // Add click event listener to the close button to close the pop-up
    closeBtn.addEventListener('click', closePopup);

    // Add click event listener to the register/login button to show the pop-up
    loginRegisterBtn.addEventListener('click', showPopup);

    // Handle form submission for logging in
    document.getElementById('loginForm').addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent the default form submission
        const email = document.getElementById('email').value; // Get the email value
        const password = document.getElementById('password').value; // Get the password value
        console.log(`Logging in with email: ${email} and password: ${password}`);
        // Add your login logic here
        closePopup(); // Close the pop-up after logging in
    });

    // Handle register link click
    document.getElementById('registerLink').addEventListener('click', (e) => {
        e.preventDefault(); // Prevent the default link action
        console.log('Redirect to register page');
        // Add your register logic here
        closePopup(); // Close the pop-up after clicking the register link
    });
}

// Load the login/register pop-up HTML and initialize it
document.addEventListener('DOMContentLoaded', () => {
    // Fetch the login/register pop-up HTML
    fetch('./pop-up/loginPopup.html')
        .then(response => response.text())
        .then(data => {
            // Insert the pop-up HTML into the body of the page
            document.body.insertAdjacentHTML('beforeend', data);
            // Initialize the login/register pop-up after it is loaded
            initLoginPopup();
        });
});
