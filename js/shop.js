$(document).ready(function() {
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
            const productCard= 
            `<div class="product-card">
                <div class="card-img-container">
                  <img src="${product.image}" alt="${product.name}">
                  <h3>${product.name}</h3>
                </div>
                <div class="card-overlay">
                  <h3>${product.name}</h3>
                  <p class="price">Price: $${product.price}</p>
                  <button>Add to Cart</button>
                </div>
              </div>`
            $('#products-container').append(productCard)
          })
        }
      }
      displayProducts(products)
      $('.filtercat .filter-btn').on('click', function() {
        const selectedCategory = $(this).data('category')
        const selectedType = $('.filtertype .filter-btn.selected').data('type') || 'all'
        $('.filtercat .filter-btn').removeClass('selected')
        $(this).addClass('selected')
        filterProducts(selectedCategory, selectedType)
      })
      $('.filtertype .filter-btn').on('click', function() {
        const selectedType = $(this).data('type')
        const selectedCategory = $('.filtercat .filter-btn.selected').data('category') || 'all'
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
              const productCard = 
                  `<div class="product-card">
                      <div class="card-img-container">
                          <img src="${product.image}" alt="${product.name}">
                          <h3>${product.name}</h3>
                      </div>
                      <div class="card-overlay">
                          <h3>${product.name}</h3>
                          <p class="price">Price: $${product.price}</p>
                          <button>Add to Cart</button>
                      </div>
                  </div>`;
              $('#products-container').append(productCard);
          });
      }
  }
})

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
                          <button>Add to Cart</button>
                      </div>
                  </div>`;
              $('#products-container').append(productCard)
          })
      }
  }
  $('#search').on('input', function(){
      const query = $(this).val().toLowerCase()
      const filteredProducts = products.filter(product => 
          product.name.toLowerCase().includes(query)
      )
      displayProducts(filteredProducts)
  })
  $('.filtercat .filter-btn').on('click', function(){
      const selectedCategory = $(this).data('category')
      const selectedType = $('.filtertype .filter-btn.selected').data('type') || 'all'
      $('.filtercat .filter-btn').removeClass('selected')
      $(this).addClass('selected')
      filterProducts(selectedCategory, selectedType)
  })
  $('.filtertype .filter-btn').on('click', function(){
      const selectedType = $(this).data('type')
      const selectedCategory = $('.filtercat .filter-btn.selected').data('category') || 'all'
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

