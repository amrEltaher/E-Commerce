user = JSON.parse(localStorage.getItem('currentUser'));
 if(!user){
location.href = '/login.html'
 }
 userId = user.id;
let RangeObj = {
    1: [5000, 10000],
    2: [10000, 20000],
    3: [20000, 70000],
    4: [0, 700000],
  };
  let data = JSON.parse(localStorage.getItem("products"));
  let pramas = new URLSearchParams(window.location.search);
  let sellers = pramas.getAll("Seller");
  let category = pramas.getAll("category");
  let search = pramas.get("search");
  console.log(search);
  let range =  pramas.get("Range") == null ? 4 : pramas.get("Range");
  sellers.forEach((item) => {
    document.getElementById(item).checked = true;
  });
  category.forEach((item) => {
    document.getElementById(item).checked = true;
  });
  document.getElementById('p'+range).checked = true;
  // following the hierarcy we dont have to search the entire dataset  === improved performance
  function filter(ObjectOfProducts, sellers, category, range) {
    category =
      category.length === 0 ? ["laptops", "watchs", "screens"] : category;
    sellers =
      sellers.length === 0
        ? ["3000", "1000", "4000", "5000", "6000", "2000"]
        : sellers;
    let filteredProducts = [];
    for (const key in ObjectOfProducts) {
      if (category.indexOf(key) != -1) {
        for (const item in ObjectOfProducts[key]) {
          if (
            sellers.indexOf(ObjectOfProducts[key][item]["sellerId"]) != -1
          ) {
            if (
              parseInt(ObjectOfProducts[key][item]["price"]) >=
                RangeObj[range][0] &&
              parseInt(ObjectOfProducts[key][item]["price"]) <=
                RangeObj[range][1]
            ) {
              filteredProducts.push({
                id: item,
                category: key,
                ...ObjectOfProducts[key][item],
              });
            }
          }
        }
      }
    }
    return filteredProducts;
  }
  const RenderProducts = function (ArrayOfProducts) {
     cart = JSON.parse (localStorage.getItem("cart"))
     if(cart == null){
      cart = {}
     }
     if(cart[userId] == undefined){
      cart[userId] = {}
     }
    $("#data-container").get(0).innerHTML = "";
    for (let i = 0; i < ArrayOfProducts.length; i++) {
      if (ArrayOfProducts[i].title.length > 20) {
        ArrayOfProducts[i].title =
          ArrayOfProducts[i].title.slice(0, 15) + "...";
      }
    if(ArrayOfProducts[i].hidden || ArrayOfProducts[i].deleted) continue;
      
    $("#data-container").append(
        `<div
    
    class="text-decoration-none col-lg-3 col-md-4 col-sm-6 col-12"
  >
    <div class="p-2 shadow rounded">
      <a href=${
        "/product.html?category=" +
        ArrayOfProducts[i].category +
        "&id=" +
        ArrayOfProducts[i].id
      } class="text-decoration-none">
      <img src="${ArrayOfProducts[i].pic}" alt="" class="col-12 item-img" />
      <div class="px-3">
        <div class="h7 item-title">${ArrayOfProducts[i].title}</div>

        <div>
          <span class="text-danger h5 item-price">${ArrayOfProducts[i].price} EGP</span>
        </div>
      </div>
      </a>
      ${cart[userId][ArrayOfProducts[i].category + "-" + ArrayOfProducts[i].id] !== undefined ?
      `<input value = "Remove From Cart" class="Remove btn btn-outline-primary form-control mt-3 " data-id=${ArrayOfProducts[i].id} data-cat=${ArrayOfProducts[i].category}>`:
      `<input value = "Add To Cart" class="Add btn btn-danger form-control mt-3 " data-id=${ArrayOfProducts[i].id} data-cat=${ArrayOfProducts[i].category}>`
      }
      </div>
    </div>
  </div>
 `
      );
    }
  };
  let filteredProducts = filter(data, sellers, category, range);
  $("#count").text(filteredProducts.length);
  // in case we have search Query 
  if(search != null){
    f = filteredProducts.filter(
      (item) =>
        item.title.toLowerCase().includes(search)
    );
    $("#count").text(f.length);
    RenderProducts(f);
  }else{
    RenderProducts(filteredProducts);

  }
//////////////////////////////////////////////////////////////////////////////////
  $(".search").on("click", function () {
    let val = $("#search").val();
    f = filteredProducts.filter(
      (item) =>
        item.title.toLowerCase().includes(val.toLowerCase())
    );
    $("#count").text(f.length);
    RenderProducts(f);
  });
  $('.filterForm').on('reset',
  ()=>window.location.replace('products.html')
  )
  $('.Remove,.Add').on('click',function(e){
    if(!user){
      location.href = '/login.css'
    }
    let id = $(this).data('id');
    let cat = $(this).data('cat');
    console.log(id , cat);
    if(e.target.classList.contains('Remove')){
      delete cart[userId][cat+'-'+id];
    }else{
     cart[userId][cat+'-'+id] = {
      
        quantity:1,
     
    }
    }
    localStorage.setItem('cart',JSON.stringify(cart));

    window.location.reload();
  })