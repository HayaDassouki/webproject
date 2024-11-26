$(document).ready(function () {
  $("#backbtn").click(function(){
    window.location="#logo"
  })
    $("#subbtn").click(function (e) {
      e.preventDefault()
        let name = $("#name").val().trim()
        let num = $("#num").val().trim()
        let email = $("#email").val().trim()
        let message = $("#message").val().trim()
        if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
        alert("Please enter your name.")
        return
      }
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("Please enter a valid email address.")
        return
      }
      if (!message) {
        alert("Please enter a message.")
        return
      }
        $("#messageModal").fadeIn()
        $("#modalMessage").text("Thank You for Your Feedback!")
        $("form")[0].reset()
    })
      $("#closeModal").click(function () {
      $("#messageModal").fadeOut()
    })
      $(window).click(function (e) {
      if ($(e.target).is("#messageModal")) {
        $("#messageModal").fadeOut()
      }
    })
      $("#num").on("input", function () {
      this.value = this.value.replace(/[^\d]/g, "")
    })
      $("#name").on("input", function () {
      this.value = this.value.replace(/[^a-zA-Z\s]/g, "")
    })

    $("#backbtn").click(function(){
      window.location.href="contact.html"
    })
})
  