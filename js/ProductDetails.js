
     
    let params = new URLSearchParams(window.location.search);
    let cat = params.get("category");
    let id = params.get("id");
    let data = JSON.parse(localStorage.getItem("products"))[cat][id];
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        window.location.href = "./login.html"
    }
    let Sellers = JSON.parse(localStorage.getItem("sellers"));
    let userId = currentUser.id;
    let cart = JSON.parse(localStorage.getItem('cart')) ;
    $('#title').text(data.title);
    $('#category').text(data.category);
    $('#seller').text(data.seller);
    $('#price').text(data.price);
    $('#mainImg').attr('src', data["pic"])
    $('#crumb-product').text(data.title)
    $('#crumb-category').text(cat)
    $('#crumb-category').attr('href', `./products.html?category=${cat}`)
    $('#seller').text(Sellers[data.sellerId].Name)
    $('#category').text(cat)
    for(let i in data.specs){
        $('.specs').append(`<li class="list-group-item">${i} : ${data.specs[i]}</li>`)
    }
    if(cart[userId] == undefined){
        cart[userId] = {}
    }
   
    cart[userId][cat + "-" + id] ? $('.toggle-item').text('Remove From Cart') : $('.toggle-item').text('Add To Cart')
    $('.toggle-item').on('click', function () {
     
        if (!cart[userId][cat + "-" + id]) {
            cart[userId][cat + "-" + id] = {
               Quantity:1
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            $(this).text('Remove From Cart')
        } else {
            delete cart[userId][cat + "-" + id];
            localStorage.setItem('cart', JSON.stringify(cart));
            $(this).text('Add To Cart')
        }
    })
