let sellers = JSON.parse(localStorage.getItem('sellers'))
let products = JSON.parse(localStorage.getItem('products'))
let orders = JSON.parse(localStorage.getItem('orders'))
let sellerorders = JSON.parse(localStorage.getItem('sellerOrders'))
let SelectedSeller = sellers["5000"]
let pendingOrders = sellerorders["5000"].orders.filter(item=> orders[item].status === 'pending').length
let canceledOrders = sellerorders["5000"].orders.filter(item=> orders[item].status === 'canceled').length
let delivered =sellerorders["5000"].orders.filter(item=> orders[item].status === 'delivered').length
let Revenue = sellerorders["5000"].orders.map(item => orders[item].total).reduce((a,b)=> a+b)
let filterRole = ""
$('.side-item').on( 'click', function(e){
    
   let item =  $(e.target).closest('.side-item')
   item.addClass('active')
    item.siblings().removeClass('active');
})
$('.side-items').on('click',function(e){
    $('.content').empty()
    let SellerProducts = SelectedSeller.Products.map(item => products[item.category][item.product_id])
    let itemClicked  = $(e.target).closest('.side-item')
    if(itemClicked.is('.Insights')){
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
$('.pending').text(pendingOrders)
$('.canceled').text(canceledOrders)
$('.delivered').text(delivered)
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
        $('.content').append(
            `<table class="table" style="overflow: scrolly;">
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
              ${SellerProducts.filter(item => item !== undefined)
                .map (item =>`<tr><td><input type="checkbox"></td> <td>${item.title}</td><td>${item.price}</td><td><input type="button" class="btn btn-danger" data-category="" value="Delete"></td> <td><input type="button" class="btn btn-danger" value="Edit" "></td> <tr>`).join('')}
            </tbody>
          </table>
      `
        )
        
    }
    if(itemClicked.is('.Orders')){
        $('.content').append(
            `<table class="table">
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
            ${sellerorders["5000"].orders.map(item => `
                <tr>
                    <td>${item}</td>
                    <td>${orders[item].date}</td>
                    <td>
                        ${orders[item].status === 'pending' ? 
                            `<span class="badge badge-warning">Pending</span>` : 
                            `<span class="badge badge-success">Success</span>`
                        }
                    </td>
                    <td>${orders[item].total}</td>
                    <td>
                    <a class="btn btn-primary" data-toggle="collapse" href="#c-${item}" role="button" aria-expanded="false" aria-controls="collapseExample">
                    Details
                  </a>               
                </td>
                </tr>
                <tr>
                    <td colspan="5" id=c-${item} class="collapse table">
                    
                        <table class="table">
                                <tr>
                                    <td>Product</td>
                                    <td>Quantity</td>
                                    <td>Price</td>
                                    <td>Category</td>
                                    <td> Total </td>
                                </tr>
                            <tbody>
                            ${orders[item].products.map(item =>`<tr> <td>${products[item.cat][item.id].title}</td> <td>${item.quantity}</td> <td>${products[item.cat][item.id].price}</td> <td>${item.cat}</td> <td>${item.quantity * products[item.cat][item.id].price}</td> </tr>`).join('')}
                            </tbody>
                        </table>
                    </td>
                </tr>
            `).join('')}
        </tbody>        
            </table>`
        )
    }
})


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
        sellerorders["5000"].orders.forEach(item => {
            if(orders[item].date === element){
                p2+= orders[item].total;
            }
        })
        arrToReturn.push(p2);
    });
    return arrToReturn;
}
getDateForLastNDays(10);
GetOrdersDates(getDateForLastNDays(10));