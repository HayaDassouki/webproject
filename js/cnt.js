document.addEventListener('DOMContentLoaded', function () {
    let form = document.querySelector('form')
    let messageModal = document.getElementById('messageModal')
    let modalMessage = document.getElementById('modalMessage')
    let closeModal = document.getElementById('closeModal')

    form.addEventListener('submit', function (event) {
        event.preventDefault(); 
        let name = document.getElementById('name').value.trim()
        let number = document.getElementById('num').value.trim()
        let email = document.getElementById('email').value.trim()
        let message = document.getElementById('message').value.trim()
        let noerror = true
        let error = []
        if(!name){
          noerror = false
          error.push("Please include your name")
        }
        if(!email || !/\S+@\S+\.\S+/.test(email)){
            noerror = false;
            error.push("Please enter a valid email address!")
        }
        if(!message){
            noerror = false;
            error.push("Please leave a message!")
        }
        if(noerror){
            modalMessage.textContent = "Yout message was sent successfully!"
            messageModal.style.backgroundColor = 'transparent'
            modalMessage.style.color = 'white'
            showModal()
            form.reset()
        }else{
            modalMessage.innerHTML = "Please include all requirements"
            messageModal.style.backgroundColor = 'transparent'
            modalMessage.style.color = 'white'
            showModal()
        }
    })
    function showModal(){
        messageModal.style.display ='flex'
    }
      closeModal.addEventListener('click', function () {
        messageModal.style.display = 'none'
    })
})  
