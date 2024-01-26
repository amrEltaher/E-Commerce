var order = {};

// Retrieve checkout data from local storage
var checkoutData = JSON.parse(localStorage.getItem("checkoutData"));
var cartitems = JSON.parse(localStorage.getItem("cart"));
var cartItemsContainer = document.getElementById("checkout-sum");

// Loop through each cart item in checkout data
cartitems.forEach(function (cartItem) {
  var cartItemHTML = `<tr>
    <td class="text-center">
      <a href="#40">
        <img src="${cartItem.image}" style="height: 90px; width:100px ;" alt="Product name" loading="lazy" class="img-rounded">
      </a>
    </td>
    <td class="">
      <a href="#40" class="d-block">${cartItem.name}</a>
    </td>
    <td class="text-end">
      <span class="text-small">
        <span>${cartItem.quantity}</span>
        <span class="text-muted">x</span>
        <span>${cartItem.price}</span>
      </span>
    </td>
  </tr>`;
  cartItemsContainer.innerHTML += cartItemHTML;
});


checkout=JSON.parse(localStorage.getItem('checkoutData'));
    
$("#subtotal")[0].innerHTML=checkout.totalprice;
$('#ecotax')[0].innerHTML=checkout.ecoTax;
$('#vat')[0].innerHTML=checkout.vat;
$('#total')[0].innerHTML=checkout.finalTotal;

function handleSubmit(event) {
    event.preventDefault(); 
    order.first_name = $('#first_name').val();
    order.last_name = $('#last_name').val();
    order.email = $('#email').val();
    order.shipping_country_id = $('#shipping_country_id').val();
    order.street_address = $('#street_address').val();
    order.appartment = $('#appartment').val();
    order.shipping_post_code = $('#shipping_post_code').val();
    order.shipping_city = $('#shipping_city').val();
    order.shipping_region_id = $('#shipping_region_id').val();
    order.phone_number = $('#phone_number').val();
    order.cartItems = cartitems;
    localStorage.setItem('order', JSON.stringify(order));
    location.href = "order.html";
}

$('#submit').on('click', handleSubmit);
