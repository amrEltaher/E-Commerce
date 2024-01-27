let sellers = JSON.parse(localStorage.getItem('sellers'))
let products = JSON.parse(localStorage.getItem('products'))
let orders = JSON.parse(localStorage.getItem('orders'))
let sellerorders = JSON.parse(localStorage.getItem('sellerOrders'))
let SelectedSeller = sellers["2000"]

$('.side-item').on( 'click', function(e){
    
   let item =  $(e.target).closest('.side-item')
   item.addClass('active')
    item.siblings().removeClass('active');
})
$('.side-items').on('click',function(e){
    $('.content').empty()
    let SellerProducts = SelectedSeller.Products.map(item => products[item.category][item.product_id])
    console.log(SellerProducts);
    let itemClicked  = $(e.target).closest('.side-item')
    if(itemClicked.is('.Insights')){
        $('.content').append(
            `<div class="d-flex  justify-content-around align-items-start">
            <div class=" mt-3 p-4 bg-light rounded shadow col-3">
                <div class="d-flex flex-row align-items-center justify-content-center h6">
                    <i class="fa-regular fa-clock text-warning" style="font-size: 1.8rem;"></i> 
                    <div class="pl-3"> Pending Orders <span class="Pending text-secondary">(57)</span></div> 
                </div>
            </div>
            <div class=" mt-3 p-4 bg-light rounded shadow col-3">
                <div class="d-flex flex-row align-items-center justify-content-center h6">
                    <i class="fa-solid fa-xmark text-danger" style="font-size: 1.8rem;"></i>
                    <div class="pl-3"> Canceled Orders <span class="Canceled text-secondary">(3)</span></div> 
                </div>
            </div>
            <div class=" mt-3 p-4 bg-light rounded shadow col-3">
                <div class="d-flex flex-row align-items-center justify-content-center h6">
                    <i class="fa-solid fa-truck text-success" style="font-size: 1.8rem;"></i>
                    <div class="pl-3"> Deliverd <span class="Delivered text-secondary">(28)</span></div> 
                </div>
            </div>
        </div>`
        )
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
                .map (item =>`<tr><td><input type="checkbox"></td> <td>${item.title}</td><td>${item.price}</td><td><input type="button" class="btn btn-danger" value="Delete"></td> <td><input type="button" class="btn btn-danger" value="Edit"></td> <tr>`).join('')}
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
            ${sellerorders["2000"].orders.map(item => `
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

