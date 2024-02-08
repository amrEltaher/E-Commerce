var currentUser = JSON.parse(localStorage.getItem('currentUser')).id
var products = JSON.parse(localStorage.getItem('products'));
var data = JSON.parse(localStorage.getItem('cart'));
debugger
var cartlist =data[currentUser];


function getcartItems() {
  var cart = [];

  for (var key in cartlist) {
    var category = key.split("-")[0];
    var id = key.split("-")[1];
    var quantity = cartlist[key].quantity;
    cart.push({ id: id, quantity: quantity, category: category });
  }
  return cart;
}
var cart = getcartItems();

var cartItems = []

cart.forEach((item) => {
  var cartitem;
  cartitem={...products[item.category][item.id],category:item.category,id:item.id};
  cartitem.quantity=item.quantity;
  cartItems.push(cartitem)
})

  function addItemToCart(cartitem) {
    var itemDiv = `<tr>
      <td class="col-3">
        <img src=${cartitem.pic} loading="lazy" alt="Product name" class="img-rounded" width="80" loading="lazy" style="height:200px">
      </td>
      <td class="col-3">
        <a href="">
          <span>${cartitem.title}</span>
        </a>
        <div class=" price">
          <span>${cartitem.price}$  </span>
        </div>
      </td>
      <td class="col-3 text-center">
        <div class="quantity">
          <div class="input-group">
            <button class="btn btn-minus btn-sm">-</button>
            <label for="quantity"></label>
            <input name="quantity" value="${parseInt(cartitem.quantity)}" size="1" min="1" class="form-control form-control-sm" type="number">
            <button class="btn btn-plus btn-sm">+</button>
          </div>
        </div>
      </td>
      <td class="col-3 text-end total px-4">
        <span class="item-total">${(parseInt(cartitem.price) * parseInt(cartitem.quantity)).toFixed(2)}</span>
      </td>
    </tr>`;
    var cart = document.getElementById("cart");
    var item = document.createElement("tr");
    item.innerHTML = itemDiv;
    cart.appendChild(item);

    var btnMinus = item.querySelector(".btn-minus");
    var btnPlus = item.querySelector(".btn-plus");
    var inputQuantity = item.querySelector("input[name='quantity']");
    var itemTotal = item.querySelector(".item-total");

    btnMinus.addEventListener("click", function (event) {
      event.preventDefault();
      let id= cartitem.id;
      let category = cartitem.category
      let cartItemId = category + '-' + id
      if (cartitem.quantity > 1) {
        cartitem.quantity--;
        inputQuantity.value = cartitem.quantity;
        itemTotal.textContent = (cartitem.price * cartitem.quantity).toFixed(2);
        updateSummarySection(cartItems);
        data[currentUser][cartItemId] = cartitem

        
      } else {
        // Remove the row
        item.remove();
        var index = cartItems.indexOf(cartitem);
        if (index > -1) {
          cartItems.splice(index, 1);
          delete data[currentUser][cartItemId]
          updateSummarySection(cartItems);
        }
      }
    });

    btnPlus.addEventListener("click", function (event) {
      let id= cartitem.id;
      let category = cartitem.category
      let cartItemId = category + '-' + id
      event.preventDefault();
      cartitem.quantity++;
      inputQuantity.value = cartitem.quantity;
      itemTotal.textContent = (cartitem.price * cartitem.quantity).toFixed(2);
      updateSummarySection(cartItems);
      data[currentUser][cartItemId] = cartitem

    });

    //one change of text input
    inputQuantity.addEventListener("change", function (event) {
      let id= cartitem.id;
      let category = cartitem.category
      let cartItemId = category + '-' + id
      event.preventDefault();
      if (inputQuantity.value > 0) {
        cartitem.quantity = inputQuantity.value;
        itemTotal.textContent = (cartitem.price * cartitem.quantity).toFixed(2);
        updateSummarySection(cartItems);
        data[currentUser][cartItemId] = cartitem

      } else {
        // Remove the row
        item.remove();
        
        var index = cartItems.indexOf(cartitem);
        if (index > -1) {
          cartItems.splice(index, 1);
          delete data[currentUser][cartItemId]
          updateSummarySection(cartItems);
          data[currentUser][cartItemId] = cartitem

        }
      }
    });
  }

  // var cartItems = [];
  // var cartitem = new CartItem("./smartscreens/screen_img8.jpg", "Name1", 1, 20);
  // cartItems.push(cartitem);
  // cartitem = new CartItem("smartscreens/screen_img8.jpg", "Name2", 1, 30);
  // cartItems.push(cartitem);
  // cartitem = new CartItem("smartscreens/screen_img4.jpg", "Name3", 1, 60);
  // cartItems.push(cartitem);

  for (var i = 0; i < cartItems.length; i++) {
    addItemToCart(cartItems[i]);
  }
  
  updateSummarySection(cartItems);

function updateSummarySection(cartItems) {
  var totalprice = 0;
  var itemquantity = 0;
  for (var i = 0; i < cartItems.length; i++) {
    totalprice += cartItems[i].price * cartItems[i].quantity;
    itemquantity += cartItems[i].quantity;
  }
  var ecoTax = 2.0;
  var vatRate = 0.19;
  var DynamicSummaryToCart = `<tr>
    <td colspan="6" class="text-end">
      <small>Sub-Total:</small>
    </td>
    <td class="text-end">
      <span class="text-end">${totalprice.toFixed(2)}</span>
    </td>
  </tr>
  <tr>
    <td colspan="6" class="text-end">
      <small>Eco Tax (${ecoTax}):</small>
    </td>
    <td class="text-end">${ecoTax.toFixed(2)}</td>
  </tr>
  <tr>
    <td colspan="6" class="text-end">
      <small>VAT (19%):</small>
    </td>
    <td class="text-end">${(totalprice * vatRate).toFixed(2)}</td>
  </tr>

  <tr>
    <td colspan="6" class="text-end fw-semibold">Total:</td>
    <td class="text-end fw-semibold">${((totalprice + ecoTax) * (1 + vatRate)).toFixed(2)}</td>
  </tr>`;

  // Store final prices and all tax, prices into local storage
  var checkoutData = {
    totalprice: totalprice.toFixed(2),
    ecoTax: ecoTax.toFixed(2),
    vat: (totalprice * vatRate).toFixed(2),
    finalTotal: ((totalprice + ecoTax) * (1 + vatRate)).toFixed(2)
  };
  var summary = document.getElementById("summary");
  summary.innerHTML = DynamicSummaryToCart;
  localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
  localStorage.setItem('cart',JSON.stringify(data))

}

document.getElementById("checkout").addEventListener("click", function (e) {
  e.preventDefault();
  if(Object.keys(data[currentUser]).length == 0) {
    alert("Your cart is empty")
    return;
  }
  location.href = "checkout.html";
});