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
                tr.innerHTML = `
                    <td>${ID}</td>
                    <td>${JUDET}</td>
                    <td>${CATEGORIE_NATIONALA}</td>
                    <td>${CATEGORIE_COMUNITARA}</td>
                    <td>${MARCA}</td>
                    <td id="DESCRIERE_COMERCIALA_${ID}">${DESCRIERE_COMERCIALA}</td>
                    <td>
                    <button id="edit" class="btn btn-primary edit_${ID}">Edit</button>
                    <button id="delete" class="btn btn-dange delete_${ID}">Delete</button>
                   <span></span>
                  </td>
                    <!-- Add more table cells as needed -->
                `;  
                const editButton = tr.querySelector(`.edit_${ID}`); 
                const deleteButton = tr.querySelector(`.delete_${ID}`);
                

                editButton.addEventListener("click", function(){
                 if(editButton.textContent=="Edit"){
                  editButton.textContent=="Save";
                 }
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
     
        function deleteRow(button) {
          const row = button.closest('tr');
          const id = row.getAttribute('data-id');
      
          fetch('http://localhost/APa/api/delete-system.php', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ id })
          })
          .then(response => response.json())
          .then(data => {
              if (data.success) {
                  row.remove();
              } else {
                  alert('Error deleting row');
              }
          })
          .catch(error => console.error('Error:', error));
      }
      
      function updateRow(button) {
          const row = button.closest('tr');
          const id = row.getAttribute('data-id');
          const newName = prompt('Enter new name:');
          
          if (newName) {
              fetch('http://localhost/APa/api/update-system.php', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({ id, name: newName })
              })
              .then(response => response.json())
              .then(data => {
                  if (data.success) {
                      row.cells[1].innerText = newName;
                  } else {
                      alert('Error updating row');
                  }
              })
              .catch(error => console.error('Error:', error));
          }
      }


});