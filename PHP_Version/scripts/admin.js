document.addEventListener('DOMContentLoaded', function () {
    let page_nr=1;
    let nr_entries=10;
    const next=document.getElementById('next');
    const previous=document.getElementById('previous');
    const current_page=document.getElementById('btn1');
    const interv1=document.getElementById('int1');
    const interv2=document.getElementById('int2');
    const interv3=document.getElementById('int3');
    let cat=1;
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
                    <td contenteditable="true" id="DESCRIERE_COMERCIALA_${ID}">${DESCRIERE_COMERCIALA}</td>
                    <td>${AN}</td>
                    <td>
                    <button id="edit" class="btn btn-primary edit_${ID}" onclick="updateCell(${ID})">Update</button>
                    <button id="delete" class="btn btn-dange delete_${ID}" onclick="deleteRow(${ID})">Delete</button>
                   <span></span>
                  </td>
                    <!-- Add more table cells as needed -->
                `;  
                const editButton = tr.querySelector(`.edit_${ID}`); 
                const deleteButton = tr.querySelector(`.delete_${ID}`);
                

                editButton.addEventListener("click", function(){
                    updateCell(ID);
                });

                deleteButton.addEventListener("click", function(){
                    deleteRow(ID);

                });

                tableBody.appendChild(tr);
                
                 
            });
    })
    .catch(error => console.error('Error fetching data:', error));   
    }

    async function fetchData2(){
        await fetch('http://localhost/APa/api/admin-data2.php')
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
                    <td contenteditable="true" id="DESCRIERE_COMERCIALA_${ID}">${DESCRIERE_COMERCIALA}</td>
                    <td>${AN}</td>
                    <td>
                    <button id="edit" class="btn btn-primary edit_${ID}" onclick="updateCell(${ID})">Update</button>
                    <button id="delete" class="btn btn-dange delete_${ID}" onclick="deleteRow(${ID})">Delete</button>
                   <span></span>
                  </td>
                    <!-- Add more table cells as needed -->
                `;  
                const editButton = tr.querySelector(`.edit_${ID}`); 
                const deleteButton = tr.querySelector(`.delete_${ID}`);
                

                editButton.addEventListener("click", function(){
                    updateCell(ID);
                });

                deleteButton.addEventListener("click", function(){
                    deleteRow(ID);

                });

                tableBody.appendChild(tr);
                
                 
            });
    })
    .catch(error => console.error('Error fetching data:', error));   
    }
    
    async function fetchData3(){
        await fetch('http://localhost/APa/api/admin-data3.php')
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
                    <td contenteditable="true" id="DESCRIERE_COMERCIALA_${ID}">${DESCRIERE_COMERCIALA}</td>
                    <td>${AN}</td>
                    <td>
                    <button id="edit" class="btn btn-primary edit_${ID}" onclick="updateCell(${ID})">Update</button>
                    <button id="delete" class="btn btn-dange delete_${ID}" onclick="deleteRow(${ID})">Delete</button>
                   <span></span>
                  </td>
                    <!-- Add more table cells as needed -->
                `;  
                const editButton = tr.querySelector(`.edit_${ID}`); 
                const deleteButton = tr.querySelector(`.delete_${ID}`);
                

                editButton.addEventListener("click", function(){
                    updateCell(ID);
                });

                deleteButton.addEventListener("click", function(){
                    deleteRow(ID);

                });

                tableBody.appendChild(tr);
                
                 
            });
    })
    .catch(error => console.error('Error fetching data:', error));   
    }

    interv1.addEventListener("click", function(){
        interv1.classList.toggle('active');
        interv2.classList.remove('active');
        interv3.classList.remove('active');
        cat=1;
        page_nr=1;
        fetchData();
    });

    interv2.addEventListener("click", function(){
        interv1.classList.remove('active');
        interv2.classList.toggle('active');
        interv3.classList.remove('active');
        cat=2;
        page_nr=1;
        fetchData2();
    });

    interv3.addEventListener("click", function(){
        interv1.classList.remove('active');
        interv2.classList.remove('active');
        interv3.classList.toggle('active');
        cat=3;
        page_nr=1;
        fetchData3();
    });

        next.addEventListener("click",function(){
          nextPage();
        });

        previous.addEventListener("click", function(){
          prevPage();
        });
    
        function nextPage(){
            if(cat==1){
            if ((page_nr * nr_entries) < orig_data.length) {
                page_nr++;
                fetchData();
            }
        } else if (cat==2){
            if ((page_nr * nr_entries) < orig_data.length) {
                page_nr++;
                fetchData2();
            }
        } else {
            if ((page_nr * nr_entries) < orig_data.length) {
                page_nr++;
                fetchData3();
            }
        }
           
        }

        function prevPage(){
            if(cat==1){
            if(page_nr>1){
                page_nr--;
                fetchData();
            }
        } else if (cat==2){
            if(page_nr>1){
                page_nr--;
                fetchData2();
            } 
        } else {
            if(page_nr>1){
                page_nr--;
                fetchData3();
            } 
        }
              
        }

        fetchData();
     
        function deleteRow(id) {
            if(cat==1){
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
        } else if (cat==2){
            if (confirm("Are you sure you want to delete this row?")) {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "http://localhost/APa/api/delete-system2.php", true);
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
                fetchData2();
            }
        }else {
            if (confirm("Are you sure you want to delete this row?")) {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "http://localhost/APa/api/delete-system3.php", true);
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
                fetchData3();
            }
        }
        }

        function updateCell(id) {
            if(cat==1){
                if(confirm("Are you sure you want to update this cell?")){
            var cell = document.getElementById('DESCRIERE_COMERCIALA_' + id);
            var newValue = cell.innerText;

            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost/APa/api/update-system.php', true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    alert('Update successful!');
                }
            };

            xhr.send('id=' + id + '&value=' + encodeURIComponent(newValue));
            fetchData();
        }
        } else if (cat==2){
            if(confirm("Are you sure you want to update this cell?")){
            var cell = document.getElementById('DESCRIERE_COMERCIALA_' + id);
            var newValue = cell.innerText;

            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost/APa/api/update-system2.php', true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    alert('Update successful!');
                }
            };

            xhr.send('id=' + id + '&value=' + encodeURIComponent(newValue));
            fetchData2();
        }
        } else {
            if(confirm("Are you sure you want to update this cell?")){
            var cell = document.getElementById('DESCRIERE_COMERCIALA_' + id);
            var newValue = cell.innerText;

            var xhr = new XMLHttpRequest();
            xhr.open('POST', 'http://localhost/APa/api/update-system3.php', true);
            xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    alert('Update successful!');
                }
            };

            xhr.send('id=' + id + '&value=' + encodeURIComponent(newValue));
            fetchData3();
        }
        }
        }


});