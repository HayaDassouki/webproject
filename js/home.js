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

let isLoggedIn = false; // Track login state
let cart = [];

// Handle login submission
$("#loginModal form").submit(function (event) {
    event.preventDefault(); // Prevent form submission
    // Assuming a successful login process (replace with your actual authentication logic)
    isLoggedIn = true; // Set login state to true
    modal.style.display = "none"; // Close login modal
    updateCartDisplay(); // Update cart visibility
});

// Handle logout or closing the modal
function logout() {
    isLoggedIn = false;
    updateCartDisplay(); // Update cart visibility
    modal.style.display = "none";
}

let modal = document.getElementById("loginModal");

// Handle the cart visibility based on login state
function updateCartDisplay() {
    if (isLoggedIn) {
        $('#cart-container').show();
        $('#yourItems').html('<h3>Your cart</h3>');
        updateCartItems();
    } else {
        $('#cart-container').hide();
        $('#yourItems').html('<h3>Your cart is empty!</h3>');
    }
}

// Update cart items display
function updateCartItems() {
    $('#cart-container').empty(); // Clear the cart display
    if (cart.length === 0) {
        $('#cart-container').hide();
    } else {
        $('#cart-container').show();
        cart.forEach(item => {
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
            $('#cart-container').append(cartItemHTML);
        });
    }
}

// Handle adding items to the cart
$(document).on('click', '.add-to-cart', function () {
    if (!isLoggedIn) {
        modal.style.display = "flex"; // Show login modal if not logged in
        return;
    }

    let productId = $(this).data('id');
    let product = products.find(p => p.id === productId);

    if (product) {
        let cartItem = cart.find(item => item.id === productId);
        if (cartItem) {
            cartItem.quantity += 1; // Increase quantity if already in the cart
        } else {
            cart.push({ ...product, quantity: 1 }); // Add new item to the cart
        }
        updateCartItems(); // Update the cart display
    }
});

// Handle the decrease button click
$(document).on('click', '.decrease-btn', function () {
    let productId = $(this).data('id');
    let cartItem = cart.find(item => item.id === productId);
    if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
        updateCartItems();
    }
});

// Handle the increase button click
$(document).on('click', '.increase-btn', function () {
    let productId = $(this).data('id');
    let cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity += 1;
        updateCartItems();
    }
});

// Close the modal when clicked outside
window.addEventListener("click", function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
});


$(document).ready(function () {
    $("#backbtn").click(function () {
        window.location.href = "index.html"
    })
    $('#cart-container').hide()

    let products = []
    let cart = []
    fetch('products.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let selectedProducts = data.filter(product => [3, 4, 30].includes(product.id));
            products = selectedProducts;
            displayProducts(selectedProducts);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    function displayProducts(filteredProducts) {
        $('#products-container').empty();
        filteredProducts.forEach(product => {
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
            $('#products-container').append(productCard);
        });
    }
    $(document).on('click', '.add-to-cart', function () {
        let productId = $(this).data('id')
        let product = products.find(p => p.id === productId)

        if (product) {
            let cartItem = cart.find(item => item.id === productId)
            if (cartItem) {
                cartItem.quantity += 1;
            } else {
                cart.push({ ...product, quantity: 1 })
            }
            updateCartDisplay();
        }
    })
    function addToCart(product) {
        cart.push(product)
        updateCartDisplay()
    }
    $('#yourItems').html('<h3>Your cart is empty!</h3>')
    function updateCartDisplay() {
        $('#cart-container').empty()
        if (cart.length === 0) {
            $('#yourItems').html('<h3>Your cart is empty!</h3>')
            $('#yourItems').css({ 'color': 'white', 'align-items': 'center' })
            $('#cart-container').hide()
        }
        else {
            $('#yourItems').html('<h3>Your Items</h3>')
            $('#yourItems').css({ 'color': 'black', 'position': 'absolute', 'top': '10px' })
            $('#cart-container').show()
            cart.forEach(product => {
                $('#cart-container').append(`
              <div>
              <div class="cart-item">
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <div class="quantity-control">
                                <button class="decrease-qty" data-id="${product.id}">-</button>
                                <span class="quantity">${product.quantity}</span>
                                <button class="increase-qty" data-id="${product.id}">+</button>
                            </div>
                            <p class="price">$${(product.price * product.quantity)}</p>
                            <button class="remove-item" data-id="${product.id}"><span class="material-icons">delete</span></button>
              </div>
            `)
            })
        }
    }
    $(document).on('click', '.increase-qty', function () {
        let productId = $(this).data('id')
        let cartItem = cart.find(item => item.id === productId)
        if (cartItem) {
            cartItem.quantity += 1
            updateCartDisplay()
        }
    })
    $(document).on('click', '.decrease-qty', function () {
        let productId = $(this).data('id')
        let cartItem = cart.find(item => item.id === productId)

        if (cartItem) {
            cartItem.quantity -= 1
            if (cartItem.quantity <= 0) {
                cart = cart.filter(item => item.id !== productId)
            }
            updateCartDisplay()
        }
    })
    $(document).on('click', '.remove-item', function () {
        let productId = $(this).data('id')
        cart = cart.filter(item => item.id !== productId)
        updateCartDisplay()
    });

    $('#cartbtn').click(function () {
        $('.thecart').fadeIn().css({
            'display': 'flex',
            'justify-content': 'center',
            'align-items': 'center',
            'text-align': 'center'
        });
        console.log('Cart opened');
    });
    $('.closeCart').on('click', function () {
        $('.thecart').fadeOut();
    });
    $(window).click(function (e) {
        if ($(e.target).is('.thecart')) {
            $('.thecart').fadeOut();
        }
    });
});
