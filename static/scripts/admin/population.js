document.addEventListener('DOMContentLoaded', function() {
    fetchDataFromBackend();
});

async function fetchDataFromBackend() {
    try {
        const response = await fetch('http://localhost:8000/api/data');
        if (!response.ok) {
            throw new Error('Eroare la obținerea datelor');
        }
        const data = await response.json();
        populateTable(data);
    } catch (error) {
        console.error('Eroare la preluarea datelor din backend:', error);
    }
}

function populateTable(data) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = ''; // Clear existing rows

    data.forEach(row => {
        const tr = document.createElement('tr');
        tr.setAttribute('id', `row-${row.id}`);
        tr.innerHTML = `
            <td>${row.JUDET}</td>
            <td>${row.CATEGORIE_NATIONALA}</td>
            <td>${row.CATEGORIA_COMUNITARA}</td>
            <td>${row.MARCA}</td>
            <td>
                <button name="${row.id}" onclick="editRow(event)">Edit</button>
                <button name="${row.id}" onclick="deleteData(event)">Delete</button>
            </td>
        `;
        tableBody.appendChild(tr);
    });
}

function editRow(id) {
    console.log(`Editare rand cu id-ul ${id}`);
}

function deleteRow(id) {
    console.log(`Stergere rand cu id-ul ${id}`);
}