fetch('./outputV2.json').then(res => res.json()).then((d) => localStorage.setItem('products', JSON.stringify(d)))

var products = JSON.parse(localStorage.getItem('products'))
var currentUser = JSON.parse(localStorage.getItem('currentUser'))
var cart = JSON.parse(localStorage.getItem('cart'))[currentUser.id]
let arr  =[]
for(let item in cart){
    let category = item.split('-')[0]
    let id = item.split('-')[1]
    let product = products[category][id]
  addItemToCart(product , cart[item].quantity)
}


function addItemToCart(cartitem , quantity) {
    var itemDiv = `<tr>
      <td class="col-3">
        <img src=${cartitem.pic} loading="lazy" alt="Product name" class="img-rounded" width="80" loading="lazy">
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
            <input name="quantity" value="${quantity}" size="1" min="1" class="form-control form-control-sm" type="number">
            <button class="btn btn-plus btn-sm">+</button>
          </div>
        </div>
      </td>
      <td class="col-3 text-end total px-4">
        <span class="item-total">${(cartitem.price * quantity).toFixed(2)}</span>
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
      if (cartitem.quantity > 1) {
        cartitem.quantity--;
        inputQuantity.value = cartitem.quantity;
        itemTotal.textContent = (cartitem.price * cartitem.quantity).toFixed(2);
        updateSummarySection();
      } else {
        // Remove the row
        item.remove();
        var index = cartitems.indexOf(cartitem);
        if (index > -1) {
          cartitems.splice(index, 1);
          updateSummarySection(cartitems);
        }
      }
    });

    btnPlus.addEventListener("click", function (event) {
      event.preventDefault();
      cartitem.quantity++;
      inputQuantity.value = cartitem.quantity;
      itemTotal.textContent = (cartitem.price * cartitem.quantity).toFixed(2);
      updateSummarySection(cartitems);
    });

    //one change of text input
    inputQuantity.addEventListener("change", function (event) {
      event.preventDefault();
      if (inputQuantity.value > 0) {
        cartitem.quantity = inputQuantity.value;
        itemTotal.textContent = (cartitem.price * cartitem.quantity).toFixed(2);
        updateSummarySection(cartitems);
      } else {
        // Remove the row
        item.remove();
        var index = cartitems.indexOf(cartitem);
        if (index > -1) {
          cartitems.splice(index, 1);
          updateSummarySection(cartitems);
        }
      }
    });
  }

  updateSummarySection();

function updateSummarySection() {
  var totalprice = 0;
    for(let item in cart){
      let product = products[item.split('-')[0]][item.split('-')[1]]
      totalprice += product.price * cart[item].quantity
    }
  var ecoTax = totalprice * 0.05;
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
  localStorage.setItem("cart", JSON.stringify(CartItems));
}
