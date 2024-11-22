let currentSection = 0;
let sections = document.querySelectorAll('.section');
let nextBtn = document.getElementById('nextBtn');
let prevBtn = document.getElementById('prevBtn');

function showSection(index) {
    sections.forEach(section => section.style.display = 'none');

    if (sections[index]) {
        sections[index].style.display = 'block';
    }
}

function updateButtons() {
    nextBtn.disabled = currentSection === sections.length - 1;

    prevBtn.disabled = currentSection === 0;
}

nextBtn.addEventListener('click', () => {
    if (currentSection < sections.length - 1) {
        currentSection++;
        showSection(currentSection);
        updateButtons();
    }
});

prevBtn.addEventListener('click', () => {
    if (currentSection > 0) {
        currentSection--;
        showSection(currentSection);
        updateButtons();
    }
});
showSection(currentSection);
updateButtons();

let modal = document.getElementById("loginModal");

let addButtons = document.querySelectorAll(".add-btn");

let closeButton = document.getElementsByClassName("close")[0];

addButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        modal.style.display = "flex";
    });
});

closeButton.addEventListener("click", function () {
    modal.style.display = "none";
});

window.addEventListener("click", function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});
