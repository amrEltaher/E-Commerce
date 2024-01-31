const SellerUtil =  function (){
    let sellers = JSON.parse(localStorage.getItem("sellers"));
    let SellerOrders = JSON.parse(localStorage.getItem("sellerOrders"));
    let Orders = JSON.parse(localStorage.getItem("orders"));
    let sellerID = "6000";
    let PendingCount = SellerOrders[sellerID].orders.filter(function(order){
        return Orders[order].status == "pending"
    
    }).length;
    let Revenue = 0;
    SellerOrders[sellerID].orders.forEach(function(order){
        Revenue += Orders[order].total;
    })
    $('.Revenue').text(Revenue)
    $('.Pending').text(PendingCount)
}
const SellerProductsutl =  function (){
    let sellers = JSON.parse(localStorage.getItem("sellers"));
    let sellerID = "6000";
    let seller = sellers[sellerID];
    let products = seller.products;
    
}
