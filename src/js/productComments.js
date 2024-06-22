document.addEventListener('DOMContentLoaded', () => {
    const commentsList = document.getElementById('comments-list'); // Get the comments list element
    const commentForm = document.getElementById('comment-form'); // Get the comment form element
    const commentText = document.getElementById('comment-text'); // Get the comment text input element

    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('product'); 
    if (!productId) {
        console.error('Product ID not found in URL'); // Log an error message if product ID is not found in the URL
        return;
    }

    function fetchComments() {
        const comments = JSON.parse(localStorage.getItem(`comments_${productId}`)) || []; // Get the comments from local storage or initialize an empty array
        commentsList.innerHTML = comments.map(comment => `<li>${comment}</li>`).join(''); // Render the comments as list items and update the comments list element
    }

    commentForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
        const comment = commentText.value.trim(); // Get the trimmed value of the comment text input
        if (comment) {
            const comments = JSON.parse(localStorage.getItem(`comments_${productId}`)) || []; // Get the comments from local storage or initialize an empty array
            comments.push(comment); // Add the new comment to the comments array
            localStorage.setItem(`comments_${productId}`, JSON.stringify(comments)); // Store the updated comments array in local storage
            commentText.value = ''; // Clear the comment text input
            fetchComments(); // Fetch and render the updated comments
        }
    });

    fetchComments(); // Fetch and render the initial comments
});