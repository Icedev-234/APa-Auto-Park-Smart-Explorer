document.addEventListener('DOMContentLoaded', function () {
    let page_nr=1;
    let nr_entries=10;
    const next=document.getElementById('next');
    const previous=document.getElementById('previous');
    const current_page=document.getElementById('btn1');
    let color="white";
    async function fetchData(){
        await fetch('http://localhost/APa/api/admin-data.php')
        .then(async response => await response.json())
        .then(data => {
            orig_data=data;
            current_page.textContent=page_nr;
            const tableBody = document.getElementById('user-table').getElementsByTagName('tbody')[0];
            tableBody.innerHTML = '';
            let start=0;
            let end= nr_entries*page_nr;

            data=data.slice(start,end);
            data.forEach(row => {
                const tr = document.createElement('tr');
                const ID=row.ID;
                const JUDET=row.JUDET;
                const CATEGORIE_NATIONALA=row.CATEGORIE_NATIONALA;
                const CATEGORIE_COMUNITARA=row.CATEGORIA_COMUNITARA;
                const MARCA=row.MARCA;
                const DESCRIERE_COMERCIALA=row.DESCRIERE_COMERCIALA;
                const AN= row.AN;
                tr.innerHTML = `
                    <td>${ID}</td>
                    <td>${JUDET}</td>
                    <td>${CATEGORIE_NATIONALA}</td>
                    <td>${CATEGORIE_COMUNITARA}</td>
                    <td>${MARCA}</td>
                    <td id="DESCRIERE_COMERCIALA_${ID}">${DESCRIERE_COMERCIALA}</td>
                    <td>${AN}</td>
                    <td>
                    <button id="edit" class="btn btn-primary edit_${ID}" onclick="updateRow(${ID}, 'DESCRIERE_COMERCIALA', 'modified')">Update</button>
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
                    updateRow(ID,DESCRIERE_COMERCIALA,"modified");
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
    
    

        next.addEventListener("click",function(){
          nextPage();
        });

        previous.addEventListener("click", function(){
          prevPage();
        });
    
        function nextPage(){
            
            if ((page_nr * nr_entries) < orig_data.length) {
                page_nr++;
                fetchData();
            }
           
        }

        function prevPage(){
            if(page_nr>1){
                page_nr--;
                fetchData();
            }
              
        }

        fetchData();
     
        function deleteRow(id) {
            if (confirm("Are you sure you want to delete this row?")) {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "http://localhost/APa/api/delete-system.php", true);
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
                fetchData();
            }
        }

        function updateRow(id, field, value) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "http://localhost/APa/api/update-system.php", true);
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
            fetchData();
        }


});