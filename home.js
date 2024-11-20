let currentSection = 0;
const sections = document.querySelectorAll('.section');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

function showSection(index) {
    // Hide all sections
    sections.forEach(section => section.style.display = 'none');

    // Show the selected section
    if (sections[index]) {
        sections[index].style.display = 'block';
    }
}

function updateButtons() {
    // Disable next button if it's the last section
    nextBtn.disabled = currentSection === sections.length - 1;

    // Disable prev button if it's the first section
    prevBtn.disabled = currentSection === 0;
}

// Event listeners for buttons
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

// Initialize the first section
showSection(currentSection);
updateButtons();
