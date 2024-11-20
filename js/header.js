const navbar1 = document.querySelector('.scroll1')
window.addEventListener('scroll', () => {
    if (window.scrollY > 550) {
        navbar1.classList.add('scrolled')
    } else {
        navbar1.classList.remove('scrolled')
    }
})
const navbar2 = document.querySelector('.scroll2')
window.addEventListener('scroll', () => {
    if (window.scrollY > 350) {
        navbar2.classList.add('scrolled')
    } else {
        navbar2.classList.remove('scrolled')
    }
})
const back = document.querySelector('.backbtn')
window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
        back.classList.add('scrolledd')
    } else {
        back.classList.remove('scrolledd')
    }
})
