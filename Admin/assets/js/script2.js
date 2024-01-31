



///
const sidebarToggle = document.querySelector("#sidebar-toggle");
sidebarToggle.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("collapsed");
});

// document.querySelector(".theme-toggle").addEventListener("click",() => {
//     toggleLocalStorage();
//     toggleRootClass();
// });

// function toggleRootClass(){
//     const current = document.documentElement.getAttribute('data-bs-theme');
//     const inverted = current == 'dark' ? 'light' : 'dark';
//     document.documentElement.setAttribute('data-bs-theme',inverted);
// }

// function toggleLocalStorage(){
//     if(isLight()){
//         localStorage.removeItem("light");
//     }else{
//         localStorage.setItem("light","set");
//     }
// }

// function isLight(){
//     return localStorage.getItem("light");
// }

// if(isLight()){
//     toggleRootClass();
// }
//////////////////////////
function drawProductForm(targetDiv, content) {

  const targetElement = document.querySelector(targetDiv);
   if(content == "home"){
    targetElement.innerHTML = `
    <!-- analysis Row -->
    `;
    console.log("home");
}
  // window.document.title = `${content}`;
  // window.history.pushState({}, "", `/${content}`);
}



let AddProduct = document.getElementById("AddProduct");
let ProductList = document.getElementById("ProductList");
let EditProduct = document.getElementById("EditProduct");
let home = document.getElementById("home");
AddProduct.addEventListener("click", function () {
  drawProductForm(".mainContet", "AddProduct");
});
ProductList.addEventListener("click", function () {
  drawProductForm(".mainContet", "ProductList");
});
home.addEventListener("click", function () {
  drawProductForm(".mainContet", "home");
});
EditProduct.addEventListener("click", function () {
  drawProductForm(".mainContet", "EditProduct");
});
