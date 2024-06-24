async function editRow(event) {
    const id = event.target.name;
    const row = document.getElementById(`row-${id}`);
    const judet = prompt("Enter new JUDET", row.children[0].innerText);
    const categorieNationala = prompt("Enter new CATEGORIE_NATIONALA", row.children[1].innerText);
    const categorieComunitara = prompt("Enter new CATEGORIA_COMUNITARA", row.children[2].innerText);
    const marca = prompt("Enter new MARCA", row.children[3].innerText);

    if (judet && categorieNationala && categorieComunitara && marca) {
        const data = {
            JUDET: judet,  
            CATEGORIE_NATIONALA: categorieNationala,  
            CATEGORIA_COMUNITARA: categorieComunitara,
            MARCA: marca
        };

        try {
            const response = await fetch(`http://localhost:8000/api/bmi-data/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Failed to update data');
            }

            const result = await response.json();
            if (result.status === 'success') {
                alert('Data updated successfully');
                fetchDataFromBackend(); // Refresh the data display
            } else {
                alert('Failed to update data');
            }
        } catch (error) {
            console.error('Error updating data:', error);
            //alert('Error updating data');
        }
    }
}
