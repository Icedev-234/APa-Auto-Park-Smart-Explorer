// Extragem parametrii din URL
let paramString = window.location.href.split('?')[1];
let queryString = new URLSearchParams(paramString);
let page = queryString.get('pageNumber') || 1;
let maxPage;

let judetFilter = queryString.get('judet') || "";
let categorienationalaFilter = queryString.get('categorie_nationala') || "";
let marcaFilter = queryString.get('marca') || "";
document.getElementById("judetFilter").value = judetFilter;
document.getElementById("categorienationalaFilter").value = categorienationalaFilter;
document.getElementById("marcaFilter").value = marcaFilter;

function getData(judetFilter = null, categorieNationalaFilter = null, categorieComunitaraFilter = null, marcaFilter = null) {
    let url = `/OVi/api/bmi-data?pageNumber=${page}`;
    url = judetFilter && judetFilter !== "" ? url.concat(`&judet=${judetFilter}`) : url;
    url = categorieNationalaFilter && categorieNationalaFilter !== "" ? url.concat(`&year=${categorieNationalaFilter}`) : url;
    //url = categorieComunitaraFilter && categorieComunitaraFilter !== "" ? url.concat(`&categoriecomunitara=${categorieComunitaraFilter}`) : url;
    url = marcaFilter && marcaFilter !== "" ? url.concat(`&marca=${marcaFilter}`) : url;

    fetch(url)
    .then((response) => response.json())
    .then((body) => {
        maxPage = body["totalPages"];
        const tableBody = document.getElementById("table-body");
        tableBody.innerHTML = "";
        body['data'].forEach((item) => {
            const row = document.createElement("tr");
            const judet = document.createElement("td");
            const categorieNationala = document.createElement("td");
            const categorieComunitara = document.createElement("td");
            const marca = document.createElement("td");
            const id = document.createElement("td");
            const buttons = document.createElement("td");
            const deleteBtn = document.createElement("button");
            deleteBtn.className = "btnDelete";
            deleteBtn.innerHTML = "Delete";
            deleteBtn.type = "button";
            deleteBtn.name = item.id;
            deleteBtn.onclick = function (event) {
                deleteData(event);
            };
            const editBtn = document.createElement("button");
            editBtn.className = "btnEdit";
            editBtn.innerHTML = "Edit";
            editBtn.type = "button";
            editBtn.name = item.id;
            editBtn.onclick = function (event) {
                enableEditable(event);
            };

            judet.textContent = item.geo;
            judet.className = "geo";
            categorieNationala.textContent = item.time_period;
            categorieNationala.className = "time_period";
            categorieComunitara.textContent = item.obs_value;
            categorieComunitara.className = "obs_value";
            marca.textContent = item.bmi;
            marca.className = "bmi";
            id.textContent = item.id;
            id.className = "id";
            id.style.display = "none";
            row.id = item.id;

            row.appendChild(judet);
            row.appendChild(categorieNationala);
            row.appendChild(categorieComunitara);
            row.appendChild(marca);
            row.appendChild(id);
            buttons.appendChild(editBtn);
            buttons.appendChild(deleteBtn);
            row.appendChild(buttons);
            tableBody.appendChild(row);
        });
    })
    .catch((error) => {
        console.error("Error:", error);
    });
}

getData();