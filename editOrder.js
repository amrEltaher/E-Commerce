// extract the order id from the url
const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get("id");
console.log(orderId);