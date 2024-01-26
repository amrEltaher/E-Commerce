$(document).ready(function () {
     
    let params = new URLSearchParams(window.location.search);
    let cat = params.get("category");
    let id = params.get("id");
    let data = JSON.parse(localStorage.getItem("data"))[cat][id];
    $('#title').text(data.title);
    $('#category').text(data.category);
    $('#seller').text(data.seller);
    $('#price').text(data.price);
    $('#mainImg').attr('src', data["pic"])
    $('#crumb-product').text(data.title)
    $('#crumb-category').text(cat)

})