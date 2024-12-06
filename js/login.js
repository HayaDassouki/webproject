let isLoggedIn = false;

function updateCartDisplay() {
  if (isLoggedIn == true) {
    $("#cart-item").show();
    updateCartItems();
  } else {
    $("#cart-item").hide();
  }
}

let modal = document.getElementById("loginModal");

$("#loginModal form").submit(function (event) {
  event.preventDefault();
  isLoggedIn = true;
  modal.style.display = "none";
  updateCartDisplay();
});

$(document).on("click", "#log-icon", function () {
  modal.style.display = "flex";
});

function logout() {
  isLoggedIn = false;
  updateCartDisplay();
  modal.style.display = "none";
}

$(document).on("click", "#closeLoginForm", function () {
  modal.style.display = "none";
});

window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
});
