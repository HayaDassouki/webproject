// let navbar1 = document.querySelector('.scroll1')
// window.addEventListener('scroll', () => {
//     if (window.scrollY > 550) {
//         navbar1.classList.add('scrolled')
//     } else {
//         navbar1.classList.remove('scrolled')
//     }
// })
// let navbar2 = document.querySelector('.scroll2')
// window.addEventListener('scroll', () => {
//     if (window.scrollY > 350) {
//         navbar2.classList.add('scrolled')
//     } else {
//         navbar2.classList.remove('scrolled')
//     }
// })
// let back = document.querySelector('.backbtn')
// window.addEventListener('scroll', () => {
//     if (window.scrollY > 700) {
//         back.classList.add('scrolledd')
//     } else {
//         back.classList.remove('scrolledd')
//     }
// })
// let navigation =document.getElementById('navbar')
// document.getElementById('hamburger').addEventListener('click',()=>{
//     navigation.classList.toggle('show')    
// })


$(document).ready(function(){
$(function () {
  $(document).scroll(function () {
      $nav = $(".nav-container")
      $nav.toggleClass('scrolled', $(this).scrollTop() > $nav.height())
    })
})
let navigation=document.getElementById('navbar')
document.getElementById('hamburger').addEventListener('click',()=>{
    navigation.classList.toggle('show')    
})

})
