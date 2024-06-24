document.addEventListener('DOMContentLoaded', function() {
    let page = 1;
    const itemsPerPage = 10;
    let totalItems = 0;

    const incrementPage = () => {
        page++;
        fetchData();
    };

    const decrementPage = () => {
        if (page > 1) {
            page--;
            fetchData();
        }
    };

    const goToFirstPage = () => {
        page = 1;
        fetchData();
    };

    const goToLastPage = () => {
        page = Math.ceil(totalItems / itemsPerPage);
        fetchData();
    };

    const fetchData = () => {
        fetch(`/api/data?page=${page}&items_per_page=${itemsPerPage}`)
            .then(response => response.json())
            .then(data => {
                populateTable(data.data);
                totalItems = data.total_items;
                updatePaginationControls();
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    const updatePaginationControls = () => {
        document.getElementById('previous').disabled = (page === 1);
        document.getElementById('next').disabled = (page * itemsPerPage >= totalItems);
        document.getElementById('first').disabled = (page === 1);
        document.getElementById('last').disabled = (page * itemsPerPage >= totalItems);
    };

    document.getElementById('next').addEventListener('click', incrementPage);
    document.getElementById('previous').addEventListener('click', decrementPage);
    document.getElementById('first').addEventListener('click', goToFirstPage);
    document.getElementById('last').addEventListener('click', goToLastPage);

    fetchData();
});