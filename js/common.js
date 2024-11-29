function addItemToStore(id) {
    let cartItems = JSON.parse(localStorage.getItem("cartItems"));

    if (!cartItems) {
      cartItems = {
        [id]: 1,
      };
    } else {
      if (id in cartItems) {
        cartItems[id] += 1;
      } else {
        cartItems[id] = 1;
      }
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    console.log("id", id), console.log("cartItems", cartItems);
  }