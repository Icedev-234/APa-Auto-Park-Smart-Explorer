function changePassword() {
    var currentPassword = document.getElementById('current_password').value;
    var newPassword = document.getElementById('new_password').value;
    var confirmPassword = document.getElementById('confirm_password').value;

    if (newPassword !== confirmPassword) {
        document.getElementById('responseMessage').innerText = "New passwords do not match.";
        alert("Passwords don't match at all!");
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "Security_and_Policy_System.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
                        if (response.status === "success") {
                            alert("Password successfully changed!");
                        } else {
                            alert("Error: " + response.message);
                        }
        }
    };

    var params = "currentPassword=" + encodeURIComponent(currentPassword) +
                 "&newPassword=" + encodeURIComponent(newPassword);
    xhr.send(params);
}
