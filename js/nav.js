//handle signin and user name change
let user = JSON.parse(localStorage.getItem('currentUser'));
let userType = user.userType;
console.log(user);
if(!user){
  document.getElementById("account-link").textContent = "Hello, sign in"; 
  document.getElementById("account-link").addEventListener("click", function() {
    location.href = "/login.html";
  });
}else{
  document.getElementById("account-link").textContent = "Hello, "+user.userName.split(" ")[0];
  document.getElementById("account-link").addEventListener("click", function redirectToDashboard(e) {
    switch (userType) {
        case "customer":
            // Redirect to the home page with the user's name as a parameter
            window.location.href = "profile.html";
            break;
        case "seller":
            // Redirect to the seller page
            window.location.href = "Seller.html";
            break;
        case "Admin":
            window.location.href = "./Admin/Admin.html";
            break;
        default:
            break;
    }
});
}
document.getElementById("searchid").onclick = function(e){
  e.preventDefault();

let word =  document.getElementById('searchInput').value
if(!word){
  alert("please enter a word")
  return;
}
location.href = `products.html?search=${word}`
}
