let modal = document.getElementById('loginModal');
let addButton = document.getElementById('addButton');
let closeButton = document.getElementsByClassName('close-btn')[0];

addButton.onclick = function () {
    modal.style.display = "flex";
}

closeButton.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
