user = JSON.parse(localStorage.getItem('currentUser'))|{};
  if(user.userType  == undefined){
    location.href = '/login.html'
  }

let sellers = JSON.parse(localStorage.getItem('sellers'))
let products = JSON.parse(localStorage.getItem('products'))
let orders = JSON.parse(localStorage.getItem('orders'))
let sellerorders = JSON.parse(localStorage.getItem('sellerOrders'))
let SelectedSeller = sellers["1000"]
let SellerOrders = sellerorders["1000"].orders.map(item => orders[item])
let pendingOrders = sellerorders["1000"].orders.filter(item=> orders[item].status === 'pending')
let canceledOrders = sellerorders["1000"].orders.filter(item=> orders[item].status === 'canceled')
let delivered =sellerorders["1000"].orders.filter(item=> orders[item].status === 'delivered')
let Revenue = sellerorders["1000"].orders.filter(item=> orders[item].status === 'pending').map(item => orders[item].total).reduce((a,b)=> a+b)
let filterRole = ""
$('.side-item').on( 'click', function(e){
    
   let item =  $(e.target).closest('.side-item')
   item.addClass('active')
    item.siblings().removeClass('active');
})
$('.side-items').on('click',function(e){
    // 
    let SellerProducts = SelectedSeller.Products.map(item => ({
        ...products[item.category][item.product_id],
        category: item.category,
        id: item.product_id
      }));
      let itemClicked  = $(e.target).closest('.side-item')
      if(itemClicked.is('.Insights')){
        $('.content').empty()        
        $('.content').append(
            `
            <div class="container-fluid d-flex justify-content-center align-items-center flex-column p-0">
                    <div class="d-flex  justify-content-around flex-lg-row flex-column align-items-start container-fluid">
                        <div class=" mt-3 p-4 bg-light rounded shadow col-12 col-lg-2">
                            <div class="d-flex flex-row align-items-center justify-content-center h6">
                                <i class="fa-regular fa-clock text-warning" style="font-size: 1.8rem;"></i> 
                                <div class="pl-3"> Pending  <span class="Pending text-secondary pending"></span></div> 
                            </div>
                        </div>
                        <div class=" mt-3 p-4 bg-light rounded shadow col-12 col-lg-2">
                            <div class="d-flex flex-row align-items-center justify-content-center h6">
                                <i class="fa-solid fa-xmark text-danger" style="font-size: 1.8rem;"></i>
                                <div class="pl-3"> Canceled  <span class="Canceled text-secondary canceled"></span></div> 
                            </div>
                        </div>
                        <div class=" mt-3 p-4 bg-light rounded shadow col-12 col-lg-2">
                            <div class="d-flex flex-row align-items-center justify-content-center h6">
                                <i class="fa-solid fa-truck text-info" style="font-size: 1.8rem;"></i>
                                <div class="pl-3"> Deliverd <span class="Delivered text-secondary delivered"></span></div> 
                            </div>
                        </div>
                        <div class=" mt-3 p-4 bg-light rounded shadow col-12 col-lg-2">
                            <div class="d-flex flex-row align-items-center justify-content-center h6">
                            <i class="fa-solid fa-money-bill text-success" style="font-size: 1.8rem;"></i>
                                <div class="pl-3"> Revenue <span class="Delivered text-secondary revenue "></span></div> 
                            </div>
                        </div>
                    </div>
                    <div class ="container-fluid">
                        <canvas id="myChart">
                        </canvas>
                    </div>
        </div>
        `
        )
$('.pending').text(pendingOrders.length)
$('.canceled').text(canceledOrders.length)
$('.delivered').text(delivered.length)
$('.revenue').text(Revenue)

 const ctx = document.getElementById('myChart');
 const labels = getDateForLastNDays(12);
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        data: GetOrdersDates(labels),
        borderWidth: 4,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
    }
    if(itemClicked.is('.Products')){
        $('.content').empty()
        $('.content').append(
            `<table class="table  shadow">
            <thead>
              <tr>
                <th scope="col"><input type="checkbox"></th>
                <th scope="col">Product Name</th>
                <th scope="col">Price</th>
                <th scope="col">Delete</th>
                <th scope="col">Edit</th>
              </tr>
            </thead>
            <tbody>
              ${SellerProducts.filter(item => item !== undefined && !item.deleted)
                .map (item =>`<tr><td><input type="checkbox"></td> <td>${item.title}</td><td>${item.price}</td>
                <td><input type="button" class="btn btn-danger delete" data-category="${item.category}" id=${item.id} value="Delete" onclick="Delete(this)"></td>
                 <td><input type="button" class="btn btn-danger edit" data-category="${item.category}" id=${item.id} value="Edit" onclick = "Edit(this)"></td> 
                 ${item.hidden ? `<td> <button onclick="ToggleVisibility(this)" data-category="${item.category}" id=${item.id} class="btn "><i class="fa-solid fa-eye-slash"></i></button> </td>` :
                 `<td> <button onclick="ToggleVisibility(this)" data-category="${item.category}" id=${item.id} class="btn "><i class="fa-solid fa-eye"></i></button> </td>`
                
                }
                 
                 <tr>`).join('')}
            </tbody>
          </table>
      `
        )
        
    }
    if(itemClicked.is('.Orders')){
        let statusRender = {
            pending : `<span class="badge badge-warning">Pending</span>`,
            success : `<span class="badge badge-success">Success</span>`,
            canceled : `<span class="badge badge-danger">Canceled</span>`
        }
        $('.content').empty()
        $('.content').append(
            `<table class="table table  shadow">
            <thead>
            <tr>
                <td>orderID</td>
                <td>Order Date</td>
                <td>Status</td>
                <td>Total</td>
                <td>Details<td>
            </tr>
            </thead>
            <tbody>
            ${sellerorders["1000"].orders.map(item => `
                <tr>
                    <td>${item}</td>
                    <td>${orders[item].date}</td>
                    <td>
                        ${statusRender[orders[item].status]
                }
                    </td>
                    <td>${orders[item].total}</td>
                    <td>
                    <a class="btn btn-primary"  data-toggle="modal" href="#exampleModal" onclick= "OrderDetails(this)" id="${item}">
                    Details
                  </a>               
                </td>
                </tr>
            `).join('')}
        </tbody>        
            </table>`
        )
    }
    if(itemClicked.is('.Edit-prod')){
        let itemToEdit =  JSON.parse(localStorage.getItem('itemToEdit')) || {id: 0, category: ''}
        choosenProduct = products[itemToEdit.category][itemToEdit.id] || {}
        $('.content').empty();
        $('.content').append(`
        <div class="container-fluid  p-3">
        <div class="h3">Edit Product</div>
        <div class="mt-3 text-secondary h6">Add your products for Your Customers</div>
         <div class="mt-3 bg-white p-3 shadow border">
             <div class="h5">Basic Information</div>
             <form action="" id="sProduct" onsubmit="SaveProduct(this)">
                 <div class="p-3 border rounded ">
                     <div class="text-secondary" >Enter Your Product Name</div>
                     <input type="text" class="form-control rounded mt-3 mb-3" placeholder="Product Name" id="product-name" value="${choosenProduct.title}" required>
                     <div class="text-secondary">Category</div>
                     <select name="category" class="form-control rounded mt-3 mb-3" id="categories" disabled required>
                         <option value="watchs">watchs</option>
                         <option value="screens">screens</option>
                         <option value="laptops">laptops</option>
                     </select>
                     <div class="text-secondary">Price</div>
                     <input type="number" min="100" max="1000000" class="form-control rounded mt-3 mb-3" placeholder="price" id="product-price" value=${choosenProduct.price} required>
                     <div class="mt-3">
                         <div class="text-secondary mb-3">Specs</div>
                         <div class="container-fluid d-flex flex-row justify-content-start align-items-end">
                             <ul class="list-group list-unstyled" id = "propertiesList">
                                ${Object.entries(choosenProduct.specs).map(([key,value])=> `
                                <li class="d-flex flex-row  properties justify-content-between align-items-center">
                                    <input type="text" class=" form-control property-name" placeholder="Property Name" id="" value="${key}">
                                    <input type="text" class=" form-control proprty-value" placeholder="Property Name" id="" value="${value}">
                                <li>
                                `).join('')}
                             </ul>
                             <input type="button" class="btn btn-info" value="Add Property" onclick="appendListItem()">
                         </div>
                     
                     </div>

                     <div class="mt-3">
                         <input type="submit" class="btn btn-danger" value="Save Changes">
                     </div>
                 </div>
             </form>
         </div>

           
       </div>
        `)
    }
     if(itemClicked.is('.Add-prod')){
        $('.content').empty();
        $('.content').append(`
        <div class="container-fluid  p-3">
        <div class="h3">Add Product</div>
        <div class="mt-3 text-secondary h6">Add your products for Your Customers</div>
         <div class="mt-3 bg-white p-3 shadow border">
             <div class="h5">Basic Information</div>
             <form action="" id="nProduct" onsubmit="submitnewProduct(this)">
                 <div class="p-3 border rounded ">
                     <div class="text-secondary" >Enter Your Product Name</div>
                     <input type="text" class="form-control rounded mt-3 mb-3" placeholder="Product Name" id="product-name" required>
                     <div class="text-secondary">Category</div>
                     <select name="category" class="form-control rounded mt-3 mb-3" id="categories" required>
                         <option value="watchs">watchs</option>
                         <option value="screens">screens</option>
                         <option value="laptops">laptops</option>
                     </select>
                     <div class="text-secondary">Price</div>
                     <input type="number" class="form-control rounded mt-3 mb-3" placeholder="price" id="product-price" required>
                     <div class="mt-3">
                         <div class="text-secondary mb-3">Specs</div>
                         <div class="container-fluid d-flex flex-row justify-content-start align-items-center">
                             <ul class="list-group list-unstyled" id = "propertiesList">
                                 <li class="d-flex flex-row  properties justify-content-between align-items-center">
                                     <input type="text" class=" form-control property-name" placeholder="Property Name" id="">
                                     <input type="text" class=" form-control proprty-value" placeholder="Property Name" id="">
                                 </li>
                             </ul>
                             <input type="button" class="btn btn-info" value="Add Property" onclick="appendListItem()">
                         </div>
                     
                     </div>
                     <div class="mt-3 d-flex flex-row justify-content-start align-items-center">
                        <input type="file" id="file">
                        <span id="filename"></span>
                     </div>
                     <div class="mt-3">
                         <input type="submit" class="btn btn-danger" value="Add Product">
                     </div>
                 </div>
             </form>
         </div>

           
       </div>
        `)
    }
})

function UploadImg(){

 

}
const submitnewProduct = function(form) {
    event.preventDefault();
    let name = $('#product-name').val();
    let category = $('#categories').val();
    let price = $('#product-price').val();
    let path = {
      "watchs": "../smartscreens/",
      "screens": "../smartwatchs/",
      "laptops": "../laptops/"
    };
  
    // const file = document.querySelector('#file').files[0];
    // const reader = new FileReader();
  
    // // Read the file and construct the image name based on timestamp
    // reader.onloadend = function (e) {
    //   const timestamp = new Date().getTime();
    //   const imageName = `img_${timestamp}.jpg`;
    //     console.log(e.target.result);
    //   // Construct the object with the desired properties
    //   const productObject = {
    //     title: name,
    //     pic: path[category] + imageName
    //   };
    // fetch(`/${path[category]}`, {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(productObject)
    //  })      
    // };
  
    // if (file) {
    //   reader.readAsDataURL(file);
    // }
  
    let specs = {};
    let properties = $('#propertiesList').find('.properties');
    $.each(properties, function(index, item) {
      let keyInput = $(item).find('.property-name').val();
      let valueInput = $(item).find('.proprty-value').val();
      if (keyInput !== null && keyInput.trim() !== '' && valueInput !== null && valueInput.trim() !== '') {
        specs[keyInput] = valueInput;
      }
    });
    let UniqueId = GenerateUniqeId(category);
    let product = {
      title: name,
      price: price,
      specs: specs,
      pic:path[category],
      sellerId:"2000"
    };
    sellers["2000"].Products.push({
        category:category,
      product_id: toString(UniqueId)
    })
    products[category][UniqueId] = product;
    console.log(products);
    console.log(sellers);
  };
  function GenerateUniqeId(category){
    let id = 0;
    do{

        id = Math.floor(Math.random() * 100000)
    }while(products[category][id])
    console.log(id);
    return id
}
function appendListItem() {
    let propertiesList = $('#propertiesList');
    let newItem = $(`<li class="d-flex flex-row  properties justify-content-between align-items-center">
                                <input type="text" class=" form-control property-name" placeholder="Property Name" id="">
                                <input type="text" class=" form-control proprty-value" placeholder="Property Name" id="">
                    </li>`);

    propertiesList.append(newItem);
  }

const getDateForLastNDays = (n) => {
    const res = new Date();
    res.setDate(res.getDate() - n+1)
    const lastNDays = Array.from({ length: n }, (_, i) => {
      const date = new Date('1/26/2024');
      date.setDate(res.getDate() + i);
      return date.toLocaleDateString('en-EG', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      }); 
    });
    return lastNDays;
  };

  const GetOrdersDates = function(arr){
    let arrToReturn = [];
    let p1 = 0 , p2 = 0; 
    arr.forEach(element => {
        p1++;
        p2 = 0;
        sellerorders["1000"].orders.forEach(item => {
            if(orders[item].date === element){
                p2+= orders[item].total;
            }
        })
        arrToReturn.push(p2);
    });
    return arrToReturn;
}
function Delete(button) {
    let id = button.id;
    let category = button.getAttribute('data-category');

    if (ExistInthePendingOrders(id,category)){
        $('.content').append($(`<div class="alert alert-warning alert-dismissible fade show" role="alert" style="position:fixed; top:0; left:50% ;transform: translate(-50%, 0);">
       this product is in the pending orders  please set to hidden and try again !
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>`))
    }
    else{
        products[category][id].deleted = true;
        localStorage.setItem('products', JSON.stringify(products));
        location.reload();
    }
    }

function ExistInthePendingOrders(id,cat){
    let exist = false;
    pendingOrders.forEach(item => {
       orders[item].products.forEach(
            function(item){
                if(item.id === id && item.cat === cat){
                         exist = true;
                }
            }
       )
    })
    console.log(exist);
    return exist;
}

function Edit(btn){


    let id = btn.id;
    let category = btn.getAttribute('data-category');
    localStorage.setItem('itemToEdit',JSON.stringify({id:id,category:category}))
    $('.Edit-prod').trigger( "click" )
}
function SaveProduct(form){
    event.preventDefault();
    let itemToEdit = JSON.parse(localStorage.getItem('itemToEdit'));
    let name = $('#product-name').val();
    let price = $('#product-price').val();
    let specs = {};
    let properties = $('#propertiesList').find('.properties');
    $.each(properties, function(index, item) {
      let keyInput = $(item).find('.property-name').val();
      let valueInput = $(item).find('.proprty-value').val();
      if (keyInput !== null && keyInput.trim() !== '' && valueInput !== null && valueInput.trim() !== '') {
        specs[keyInput] = valueInput;
      }
    });
    products[itemToEdit.category][itemToEdit.id].title = name;
    products[itemToEdit.category][itemToEdit.id].specs = specs;
   console.log(products);
   console.log(itemToEdit.id);
   localStorage.setItem('itemToEdit',null);

}
function ToggleVisibility(btn){
    let id = btn.id;
    let category = btn.getAttribute('data-category');
    products[category][id].hidden =  !products[category][id].hidden;
    localStorage.setItem('products', JSON.stringify(products));
    location.reload();
}
function OrderDetails(btn){
    let id = btn.id;
    let order = orders[id];
    $('#order-details').empty();
    localStorage.setItem('orderToView',null);
    $('#order-details').append($(`${order.products.map(item => `<tr><td>${products[item.cat][item.id].title}</td><td>${item.quantity}</td><td>${products[item.cat][item.id].price}</td>`).join('')}`))
    localStorage.setItem('orderToView',JSON.stringify(order))
}


getDateForLastNDays(10);
GetOrdersDates(getDateForLastNDays(10));