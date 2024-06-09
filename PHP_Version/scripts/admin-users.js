document.addEventListener('DOMContentLoaded', function () {
let page_nr=1;
    let nr_entries=10;
const next=document.getElementById('next');
    const previous=document.getElementById('previous');
    const current_page=document.getElementById('btn1');
    async function fetchData(){
        await fetch('http://localhost/APa/api/admin-users-data.php')
        .then(async response => await response.json())
        .then(data => {
            orig_data=data;
            current_page.textContent=page_nr;
            const tableBody = document.getElementById('user-table').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = '';
            data.forEach(row => {
                const tr = document.createElement('tr');
                const ID=row.ID;
                const USERNAME=row.USERNAME;
                const PASSWORD=row.PASSWORD;
                const ROLE=row.ROLE;
                tr.innerHTML = `
                    <td>${ID}</td>
                    <td id="User">${USERNAME}</td>
                    <td>${PASSWORD}</td>
                    <td>${ROLE}</td>
                    <td>
                    <button id="edit" class="btn btn-primary edit_${ID}" onclick="updateRow(${ID}, 'User', 'modified')">Update</button>
                    <button id="delete" class="btn btn-dange delete_${ID}" onclick="deleteRow(${ID})">Delete</button>
                   <span></span>
                  </td>
                    <!-- Add more table cells as needed -->
                `;  
                const editButton = tr.querySelector(`.edit_${ID}`); 
                const deleteButton = tr.querySelector(`.delete_${ID}`);
                

                editButton.addEventListener("click", function(){
                 if(editButton.textContent=="Update"){
                  editButton.textContent=="Save";
                 }else{
                    updateRow(ID,username,"modified");
                 }
                });

                deleteButton.addEventListener("click", function(){
                    deleteRow(ID);

                });

                tableBody.appendChild(tr);
                
                 
            });
    })
    .catch(error => console.error('Error fetching data:', error));   
    }


    function deleteRow(id) {
        if (confirm("Are you sure you want to delete this row?")) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "delete-system-admin.php", true);
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    if (response.status === "success") {
                        alert("Row deleted successfully.");
                        // Optionally, remove the row from the table
                        document.getElementById("row_" + id).remove();
                    } else {
                        alert("Error: " + response.message);
                    }
                }
            };
            xhr.send("id=" + id);
        }
    }

    function updateRow(id, field, value) {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "update-system-admin.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                if (response.status === "success") {
                    alert("Row updated successfully.");
                    // Optionally, update the UI with the new value
                    document.getElementById(field + "_" + id).innerText = value;
                } else {
                    alert("Error: " + response.message);
                }
            }
        };
        xhr.send("id=" + id + "&field=" + field + "&value=" + value);
    }

    fetchData();

});
