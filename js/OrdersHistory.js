let user = JSON.parse(localStorage.getItem('currentUser'))
let products = JSON.parse(localStorage.getItem('products'))
let order = {}
if(!user){
    location.href = '/login.html'
}
let UserOrders = JSON.parse(localStorage.getItem('userOrders'))
let orders = JSON.parse(localStorage.getItem('orders'))||{}
if(UserOrders == null){
    UserOrders = {}
    UserOrders[user.id] = {}
    UserOrders[user.id].orders = []
}
if(orders[user.id] == undefined){
    orders[user.id] = {}
    orders[user.id].products = []

}

let table = '<table id = "OrdersTable"><thead><tr><th>Order ID</th><th>Date</th><th>Total</th><th>Action</th></tr></thead><tbody>';  

UserOrders[user.id].orders.forEach(item => {
    const orderDetails = orders[item];

    const row = `<tr>
        <td>${item}</td>
        <td>${orderDetails.date}</td>
        <td>${orderDetails.total}</td>
        <td class="action-buttons">
            ${RenderButton(item)}
        </td>
    </tr>`;

    table += row;  
});

table += '</tbody></table>';  

$('#account-order-history').append(table);


    function RenderButton(item) {
        const orderStatus = orders[item].status;
    
        if (orderStatus === "delivered") {
            return `<span class="badge badge-success">Delivered</span>`;
        } else if (orderStatus === "canceled") {
            return `<span class="badge badge-danger">Canceled</span>`;
        } else {
            return `
                <button class="btn btn-success confirm" data-item="${item}">Confirm</button>
                <button class="btn btn-secondary cancel" data-item="${item}">Cancel</button>
            `;
        }
    }
$('.confirm').on('click',function(e){
    const item = $(this).data('item');
    orders[item].status = "delivered"
    localStorage.setItem('orders',JSON.stringify(orders))
    alert("your order has been confirmed");
    location.reload();
})
$('.cancel').on('click', function(e) {
    const item = $(this).data('item');
    orders[item].status = "canceled";
    localStorage.setItem('orders', JSON.stringify(orders));
    alert("your order has been canceled");
    location.reload();
});
$('#OrdersTable').dataTable()