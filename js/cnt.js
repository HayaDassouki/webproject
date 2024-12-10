$(document).ready(function () {
  $("#subbtn").click(function (e) {
    e.preventDefault()
    $(".error").text("")
    let name = $("#name").val().trim()
    let num = $("#num").val().trim()
    let email = $("#email").val().trim()
    let message = $("#message").val().trim()
    let hasError = false

    if (!name || !/^[a-zA-Z\s]+$/.test(name)) {
      $("#form").after('<span class="error">Please enter a valid name</span>')
      hasError = true
    }

    if (num && !/^\d+$/.test(num)) {
      $("#num").after('<span class="error">Please enter a valid number</span>')
      hasError = true
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      $("#email").after('<span class="error">Please enter a valid email</span>')
      hasError = true
    }

    if (!message) {
      $("#message").after('<span class="error">Please enter a message</span>')
      hasError = true
    }

    if (hasError) return

    $("#messageModal").fadeIn()
    $("#modalMessage").text("Thank You for Your Feedback!")
    $("#toreset")[0].reset()
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
})
