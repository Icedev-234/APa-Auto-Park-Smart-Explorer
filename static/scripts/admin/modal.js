document.addEventListener("DOMContentLoaded", function() {
    var openModalBtn = document.getElementById("btnNew");
    var modal = document.getElementById("myModal");
    var closeBtn = document.getElementsByClassName("close")[0];

    // Ascunde modalul la inceput
    modal.style.display = "none";

    openModalBtn.addEventListener("click", function() {
        modal.style.display = "block";
    });

    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    window.addEventListener("click", function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
});