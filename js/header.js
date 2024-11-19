const navbar = document.querySelector('.nav-container')
window.addEventListener('scroll', () => {
    if (window.scrollY > 550) {
        navbar.classList.add('scrolled')
    } else {
        navbar.classList.remove('scrolled')
    }
})
