/*$(document).ready(function() {
  let products;
  fetch('products.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then(products => {
      function displayProducts(filteredProducts) {
        $('#products-container').empty()
        if (filteredProducts.length === 0) {
          $('#products-container').html('<p>No products</p>')
        } else {
          filteredProducts.forEach(product => {
            let productCard = $('<div class="product-card"></div>')
            productCard.append(`
              <div class="card-img-container">
                <img src="${product.image}">
                <h3>${product.name}</h3>
              </div>
              <div class="card-overlay">
                <h3>${product.name}</h3>
                <p class="price">Price: $${product.price}</p>
                <button id="addToCart" class="add-to-cart">Add to Cart</button>
              </div>`)
            $('#products-container').append(productCard)
          
          })
        }
        $('#cartbtn').click(function() {
          $('.thecart').fadeIn()
          $('.thecart').css({
            'display':'flex',
            'justify-content': 'center',
            'align-items': 'center',
            'text-align': 'center'
          });
          console.log('Cart opened');
          //showPdts();
        })
          
        $('.closeCart').on('click', function() {
          $('.thecart').fadeOut()
        })
      }
      
      displayProducts(products)
      $('.filtercat .filter-btn').on('click', function() {
        let selectedCategory = $(this).data('category')
        let selectedType = $('.filtertype .filter-btn.selected').data('type') || 'all'
        $('.filtercat .filter-btn').removeClass('selected')
        $(this).addClass('selected')
        filterProducts(selectedCategory, selectedType)
      })
      $('.filtertype .filter-btn').on('click', function() {
        let selectedType = $(this).data('type')
        let selectedCategory = $('.filtercat .filter-btn.selected').data('category') || 'all'
        $('.filtertype .filter-btn').removeClass('selected')
        $(this).addClass('selected')
        filterProducts(selectedCategory, selectedType)
      })

      function filterProducts(category, type) {
        let filteredProducts = products
        if (category !== 'all') {
          filteredProducts = filteredProducts.filter(product => product.category === category)
        }
        if (type !== 'all') {
          filteredProducts = filteredProducts.filter(product => product.type === type)
        }
        displayProducts(filteredProducts)
      }
    })
    .catch(error => {
      console.error('Error', error)
    })
let typee = document.getElementsByClassName("filtertype")  
let catt = document.getElementsByClassName("filtercat")   
    for(let i = 0; i<catt.length; i++) {
      catt[i].addEventListener("click", () => {
        for (let j = 0; j<typee.length; j++) {
          if(typee[j].style.display === "none") {
              typee[j].style.display = "block"
          } 
          else{
            typee[j].style.display = "none"
          }
        }
      })
    }
    function displayProducts(filteredProducts) {
      $('#products-container').empty();
      if (filteredProducts.length === 0) {
          $('#products-container').html('<p>No products found</p>');
      } else {
          filteredProducts.forEach(product => {
              let productCard = 
                  `<div class="product-card">
                      <div class="card-img-container">
                          <img src="${product.image}" alt="${product.name}">
                          <h3>${product.name}</h3>
                      </div>
                      <div class="card-overlay">
                          <h3>${product.name}</h3>
                          <p class="price">Price: $${product.price}</p>
                          <button class="add-to-cart">Add to Cart</button>
                      </div>
                  </div>`;
              $('#products-container').append(productCard);
          });
      }
  }
})*/
$(document).ready(function() {
  let products;

  // Fetch the JSON data (assuming the file is 'products.json')
  fetch('products.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      products = data;
      // Call displayProducts with the initial list of products
      displayProducts(products);

      // Handle category and type filter clicks
      $('.filtercat .filter-btn').on('click', function() {
        let selectedCategory = $(this).data('category');
        let selectedType = $('.filtertype .filter-btn.selected').data('type') || 'all';
        $('.filtercat .filter-btn').removeClass('selected');
        $(this).addClass('selected');
        filterProducts(selectedCategory, selectedType);
      });

      $('.filtertype .filter-btn').on('click', function() {
        let selectedType = $(this).data('type');
        let selectedCategory = $('.filtercat .filter-btn.selected').data('category') || 'all';
        $('.filtertype .filter-btn').removeClass('selected');
        $(this).addClass('selected');
        filterProducts(selectedCategory, selectedType);
      });

      // Function to filter products based on selected category and type
      function filterProducts(category, type) {
        let filteredProducts = products;
        if (category !== 'all') {
          filteredProducts = filteredProducts.filter(product => product.category === category);
        }
        if (type !== 'all') {
          filteredProducts = filteredProducts.filter(product => product.type === type);
        }
        displayProducts(filteredProducts);
      }

      // Function to display the filtered products in the DOM
      function displayProducts(filteredProducts) {
        $('#products-container').empty();
        if (filteredProducts.length === 0) {
          $('#products-container').html('<p>No products found</p>');
        } else {
          filteredProducts.forEach(product => {
            // Check if product has an ID to avoid undefined ID
            if (!product.id) {
              console.error('Product missing ID:', product);
              return;
            }

            let productCard = `
              <div class="product-card">
                <div class="card-img-container">
                  <img src="${product.image}" alt="${product.name}">
                  <h3>${product.name}</h3>
                </div>
                <div class="card-overlay">
                  <h3>${product.name}</h3>
                  <p class="price">Price: $${product.price}</p>
                  <button class="add-to-cart" data-id="${String(product.id)}">Add to Cart</button>
                </div>
              </div>`;
            $('#products-container').append(productCard);
          });
        }
      }

      // Handle Add to Cart button click event
      $(document).on('click', '.add-to-cart', function() {
        let productId = $(this).data('id');
        console.log('Product ID clicked:', productId);  // Debugging line to see the ID

        // If productId is undefined, log and stop execution
        if (productId === undefined) {
          console.error('Product ID is undefined');
          return;
        }

        let product = products.find(p => p.id === productId);
        if (product) {
          addToCart(product);
        } else {
          console.error('Product not found for ID:', productId);
        }
      });

      // Cart array
      let cart = [];

      // Function to add products to the cart
      function addToCart(product) {
        cart.push(product);
        updateCartDisplay();
      }

      // Function to update the cart display
      function updateCartDisplay() {
        $('#cart-container').empty();
        if (cart.length === 0) {
          $('#cart-container').html('<p>Your cart is empty.</p>');
        } else {
          cart.forEach(product => {
            $('#cart-container').append(`
              <div class="cart-item">
                <img src="${product.image}" alt="${product.name}">
                <h4>${product.name}</h4>
                <p>Price: $${product.price}</p>
              </div>
            `);
          });
        }
      }

      // Handle cart button click (to show cart)
      $('#cartbtn').click(function() {
        $('.thecart').fadeIn();
        $('.thecart').css({
          'display': 'flex',
          'justify-content': 'center',
          'align-items': 'center',
          'text-align': 'center'
        });
        console.log('Cart opened');
      });

      // Handle closing the cart
      $('.closeCart').on('click', function() {
        $('.thecart').fadeOut();
      });
    })
    .catch(error => {
      console.error('Error fetching products:', error);
    });

  // Toggle visibility of types when clicking on categories
  let typee = document.getElementsByClassName("filtertype");
  let catt = document.getElementsByClassName("filtercat");
  for (let i = 0; i < catt.length; i++) {
    catt[i].addEventListener("click", () => {
      for (let j = 0; j < typee.length; j++) {
        if (typee[j].style.display === "none") {
          typee[j].style.display = "block";
        } else {
          typee[j].style.display = "none";
        }
      }
    });
  }
});







$(document).ready(function(){
  let products = []
  fetch('products.json')
      .then(response => {
          if (!response.ok){
              throw new Error('Network response was not ok')
          }
          return response.json()
      })
      .then(data => {
          products = data
          displayProducts(products)
      })
      .catch(error => {
          console.error('Error:', error)
      });
  function displayProducts(filteredProducts){
      $('#products-container').empty()
      if (filteredProducts.length === 0) {
          $('#products-container').html('<p>No products found</p>')
      } else {
          filteredProducts.forEach(product => {
              const productCard = 
                  `<div class="product-card">
                      <div class="card-img-container">
                          <img src="${product.image}" alt="${product.name}">
                          <h3>${product.name}</h3>
                      </div>
                      <div class="card-overlay">
                          <h3>${product.name}</h3>
                          <p class="price">Price: $${product.price}</p>
                          <button class="add-to-cart">Add to Cart</button>
                      </div>
                  </div>`;
              $('#products-container').append(productCard)
          })
      }
  }
  $('#search').on('input', function(){
      let query = $(this).val().toLowerCase()
      let filteredProducts = products.filter(product => 
          product.name.toLowerCase().includes(query)
      )
      displayProducts(filteredProducts)
  })
  $('.filtercat .filter-btn').on('click', function(){
      let selectedCategory = $(this).data('category')
      let selectedType = $('.filtertype .filter-btn.selected').data('type') || 'all'
      $('.filtercat .filter-btn').removeClass('selected')
      $(this).addClass('selected')
      filterProducts(selectedCategory, selectedType)
  })
  $('.filtertype .filter-btn').on('click', function(){
      let selectedType = $(this).data('type')
      let selectedCategory = $('.filtercat .filter-btn.selected').data('category') || 'all'
      $('.filtertype .filter-btn').removeClass('selected')
      $(this).addClass('selected')
      filterProducts(selectedCategory, selectedType)
  })
  function filterProducts(category, type){
      let filteredProducts = products;
      if (category !=='all'){
          filteredProducts = filteredProducts.filter(product => product.category === category)
      }
      if (type !=='all'){
          filteredProducts = filteredProducts.filter(product => product.type === type)
      }
      displayProducts(filteredProducts)
  }
 

})


