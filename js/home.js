let currentSection = 0;
let sections = document.querySelectorAll(".section");
let nextBtn = document.getElementById("nextBtn");
let prevBtn = document.getElementById("prevBtn");

function showSection(index) {
  sections.forEach((section) => (section.style.display = "none"));

  if (sections[index]) {
    sections[index].style.display = "block";
  }
}

function updateButtons() {
  nextBtn.disabled = currentSection === sections.length - 1;

  prevBtn.disabled = currentSection === 0;
}

nextBtn.addEventListener("click", () => {
  if (currentSection < sections.length - 1) {
    currentSection++;
    showSection(currentSection);
    updateButtons();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentSection > 0) {
    currentSection--;
    showSection(currentSection);
    updateButtons();
  }
});
showSection(currentSection);
updateButtons();

let cart = [];
let products = [];

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
function logout() {
  isLoggedIn = false;
  updateCartDisplay();
  modal.style.display = "none";
}

function updateCartItems() {
  $("#cart-items").empty();
  if (cartItems === 0) {
    $("#cart-items").hide();
  } else {
    $("#cart-items").show();
    cart.forEach((item) => {
      let cartItemHTML = `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <span>${item.name}</span>
                    <span>$${item.price}</span>
                    <div class="cart-item-quantity">
                        <button class="decrease-btn" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="increase-btn" data-id="${item.id}">+</button>
                    </div>
                </div>
            `;
      $("#cart-container").append(cartItemHTML);
    });
  }
}

$(document).on("click", ".decrease-btn", function () {
  let productId = $(this).data("id");
  let cartItems = JSON.parse(localStorage.getItem("cartItems"));
  if (cartItems[productId] > 0) {
    cartItems[productId]--;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    renderCart();
  }
});

$(document).on("click", ".increase-btn", function () {
  let productId = $(this).data("id");
  let cartItems = JSON.parse(localStorage.getItem("cartItems"));
  cartItems[productId]++;
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  renderCart();
});

function renderCart() {
  let cartItems = JSON.parse(localStorage.getItem("cartItems"));

  let cartItemHTML = "";
  Object.keys(cartItems)
    ?.filter((key) => {
      if (cartItems[key] > 0) {
        return key;
      }
    })
    .forEach((key) => {
      console.log("products", products);
      let product = products?.find((product) => product.id == key);
      console.log("product", product);

      cartItemHTML += `
      <div class="cart-item">
          <img src="${product.image}" alt="${product.name}">
          <span>${product.name}</span>
          <div class="cart-product-quantity">
              <button class="decrease-btn" data-id="${product.id}">-</button>
              <span class="quantity"> ${cartItems[product.id]}</span>
              <button class="increase-btn" data-id="${product.id}">+</button>
          </div>
      </div>
  `;
    });
  console.log("cartItemHTML", cartItemHTML);
  $("#cart-container").html(cartItemHTML);
}

$(document).on("click", ".add-to-cart", function () {
  if (!isLoggedIn) {
    modal.style.display = "flex";
    return;
  }

  let productId = $(this).data("id");

  addItemToStore(productId);
  renderCart();
});

$(document).ready(function () {
  $("#backbtn").click(function () {
    window.location.href = "index.html";
  });


  fetch("products.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      let selectedProducts = data.filter((product) =>
        [3, 4, 30].includes(product.id)
      );
      displayProducts(selectedProducts);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  function displayProducts(filteredProducts) {
    $("#products-container").empty();
    filteredProducts.forEach((product) => {
      let productCard = `
                <div class="product-card">
                    <div class="card-img-container">
                        <img src="${product.image}" alt="${product.name}">
                        <h3>${product.name}</h3>
                    </div>
                    <div class="card-overlay">
                        <h3>${product.name}</h3>
                        <p class="price">Price: $${product.price}</p>
                        <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>`;
      $("#products-container").append(productCard);
    });
  }

  $("#cartbtn").click(function () {
    $(".thecart").fadeIn().css({
      display: "flex",
      "justify-content": "center",
      "align-items": "center",
      "text-align": "center",
    });
    console.log("Cart opened");
  });
  $(".closeCart").on("click", function () {
    $(".thecart").fadeOut();
  });
  $(window).click(function (e) {
    if ($(e.target).is(".thecart")) {
      $(".thecart").fadeOut();
    }
  });
});
