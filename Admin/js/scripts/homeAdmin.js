
$(document).ready(function() {
  $('.counters').each(function() {
    $(this).text('0');

    let updateCounter = () => {
      let target = parseInt($(this).attr('data-count'));
      let count = parseInt($(this).text());
      let increment = target / 500; 

      if (count < target) {
        $(this).text(Math.ceil(count + increment));
        setTimeout(updateCounter, 10);
      } else {
        $(this).text(target);
      }
    };

    updateCounter();
    $('.counters').eq(0).attr('data-count', `${getTotalIncome()}`);  // Total Income
    $('.counters').eq(1).attr('data-count', `${getTotalUsers()}`);  // Users
    $('.counters').eq(2).attr('data-count', '10');  // Seller
    $('.counters').eq(3).attr('data-count', `${getOrders()}`);  // New Order

  });
  function getOrders() {
    let orders = JSON.parse(localStorage.getItem('orders'));
    let ordersNumber = Object.keys(orders).length;
    return ordersNumber;
  }
  function getTotalIncome(){
    let orders = JSON.parse(localStorage.getItem('orders'));
    let totalIncome = 0;
    for (let orderKey in orders) {
      let order = orders[orderKey];
      totalIncome += order.total;
    }
    if(totalIncome == NaN){
      return 203050;
    }
    return totalIncome;
  }
  function getTotalUsers(){
    let users = JSON.parse(localStorage.getItem('userArray'));
    let totalUsers = Object.keys(users).length;
    return totalUsers;
  }
});



