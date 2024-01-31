            let user = JSON.parse(localStorage.getItem('currentUser'));

        if (!user) {
        location.href = "/login.html";
        }

        let cart = JSON.parse(localStorage.getItem('cart'))[user.id] || {};
        let products = JSON.parse(localStorage.getItem('products'));
        let product = {};
        let id = 0;
        let category = '';

        const checkoutCartTable = document.getElementById('checkoutCart');
        for (let item in cart) {
            category = item.split('-')[0]
            id = item.split('-')[1]
            const checkoutRow = document.createElement('tr');
            const checkoutTitleCell = document.createElement('td');
            const checkoutPriceCell = document.createElement('td');
            const checkoutQuantityCell = document.createElement('td');
            const checkoutTotalCell = document.createElement('td');

            checkoutTitleCell.textContent = products[category][id].title;
            checkoutPriceCell.textContent = products[category][id].price;
            checkoutQuantityCell.textContent = cart[item].quantity;
            checkoutTotalCell.textContent = (cart[item].quantity * products[category][id].price).toFixed(2);

            checkoutRow.appendChild(checkoutTitleCell);
            checkoutRow.appendChild(checkoutPriceCell);
            checkoutRow.appendChild(checkoutQuantityCell);
            checkoutRow.appendChild(checkoutTotalCell);

            checkoutCartTable.appendChild(checkoutRow);
        }
        const checkoutForm = document.getElementById('checkoutForm');
        checkoutForm.addEventListener('submit', function (event) {
            event.preventDefault();
    
            const phone = document.getElementById('phone').value;
            const governorate = document.getElementById('governorate').value;
            SendOrder(phone,governorate)
            showThankYouModal();
    
            localStorage.setItem('cart', JSON.stringify({ [user.id]: {} }));
        });
const placeOrderButton = document.querySelector('#checkoutForm button');
if (Object.keys(cart).length === 0) {
    placeOrderButton.disabled = true;
} else {
    placeOrderButton.disabled = false;
}

const showThankYouModal = () => {
    const modalContent = document.getElementById('thankYouModalContent');
    modalContent.innerHTML = '<p>Thank you for your order!</p>';

    $('#thankYouModal').modal('show');
    location.href = '/products.html'
};

function SendOrder(phone,governorate){
    let user = JSON.parse(localStorage.getItem("currentUser")).id;
    let orders = JSON.parse(localStorage.getItem("orders")) || {};
    let userOrders = JSON.parse(localStorage.getItem("userOrders")) 
    if(userOrders == null){
      userOrders = {}
    }
    if(userOrders[user] == undefined){
      userOrders[user] = {orders:[]}
    }
    let sellerOrders = JSON.parse(localStorage.getItem("sellerOrders")) || {};
    let cart = JSON.parse(localStorage.getItem("cart"));
    let products = JSON.parse(localStorage.getItem("products"));
      let temp = {};
      let cat = "";
      let id = "";
      let orderID = 0;
      for (const key in cart[user]) {
        cat = key.split("-")[0];
        id = key.split("-")[1];
        quantity = cart[user][key].quantity 
        if (temp[products[cat][id].sellerId] == undefined) {
          orderID = genOrderID();
          temp[products[cat][id].sellerId] = orderID;
          if (sellerOrders[products[cat][id].sellerId] == undefined) {
            sellerOrders[products[cat][id].sellerId] = {
              orders: [],
            };
          }
          sellerOrders[products[cat][id].sellerId] = {
          orders: [...sellerOrders[products[cat][id].sellerId].orders,temp[products[cat][id].sellerId]]
        };
        }
        if (orders[temp[products[cat][id].sellerId]] == undefined) {
          orders[temp[products[cat][id].sellerId]] = {};
          orders[temp[products[cat][id].sellerId]].sellerId =
            products[cat][id].sellerId;
            orders[temp[products[cat][id].sellerId]].status = "pending";
            orders[temp[products[cat][id].sellerId]].phone = phone;
            orders[temp[products[cat][id].sellerId]].governorate = governorate;
            
            orders[temp[products[cat][id].sellerId]].date = new Date().toLocaleDateString().split(',')[0]
          orders[temp[products[cat][id].sellerId]].products = [];
          orders[temp[products[cat][id].sellerId]].products.push({
            id: id,
            cat: cat,
            quantity: quantity,
           
          });
          debugger
          orders[temp[products[cat][id].sellerId]].total =
            parseInt( products[cat][id].price) * parseInt(quantity);
 
        } else {
          orders[temp[products[cat][id].sellerId]] = {
            ...orders[temp[products[cat][id].sellerId]],
            products: [
              ...orders[temp[products[cat][id].sellerId]].products,
              {
                id: id,
                cat: cat,
                quantity: quantity,
              },
            ],
              total:
              orders[temp[products[cat][id].sellerId]].total +
              parseInt( products[cat][id].price) * parseInt(quantity)
            };
        }
        


      }
      userOrders[user] = {
        orders: [...userOrders[user].orders, temp[products[cat][id].sellerId]],
      };
      localStorage.setItem("orders", JSON.stringify(orders));
      localStorage.setItem("sellerOrders", JSON.stringify(sellerOrders));
      localStorage.setItem("userOrders", JSON.stringify(userOrders));
      function genOrderID() {
        let orderID;
        do {
          orderID = Math.floor(Math.random() * 10000000);
        } while (orders[orderID]);
        return orderID;
      }
  
    };




