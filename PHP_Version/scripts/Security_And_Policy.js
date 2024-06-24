
document.getElementById('passwordChangeForm').addEventListener('submit',function(e){
    e.preventDefault();
    var currentPassword = document.getElementById('current_password').value;
    var newPassword = document.getElementById('new_password').value;
    var confirmPassword = document.getElementById('confirm_password').value;

    if (newPassword !== confirmPassword) {
        alert("Passwords don't match at all!");
        return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "api/Security_and_Policy_System.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            alert("Password successfully changed!");    
        }
    };

    var params = "current_password=" + encodeURIComponent(currentPassword) +
                 "&new_password=" + encodeURIComponent(newPassword);
    xhr.send(params);

})
