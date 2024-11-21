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

