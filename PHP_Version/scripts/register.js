document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    // Create a new XMLHttpRequest object
    let xhr = new XMLHttpRequest();

    // Configure it: POST-request for the URL /register.php
    xhr.open('POST', 'api/register-system.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // Define what happens on successful data submission
    xhr.onload = function () {
        if (xhr.status === 200) {
            alert("New User created.");
            document.getElementById('response').innerHTML = xhr.responseText;
        } else {
            document.getElementById('response').innerHTML = 'An error occurred: ' + xhr.status;
        }
    };

    // Define what happens in case of error
    xhr.onerror = function () {
        document.getElementById('response').innerHTML = 'Request failed';
    };

    // Convert the data to URL-encoded string
    let data = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;

    // Send the request with the data
    xhr.send(data);
});