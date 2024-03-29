let urlParams = new URLSearchParams(window.location.search);
let orderId = urlParams.get("id");
let orders = JSON.parse(localStorage.getItem("orders"));

$(document).ready(function () {
  $(".card-sales-split").prepend("<h2>Order Detail: " + `<span class="badge bg-success">${orderId}</span>` + "</h2>");

  showCustomerInfo();

  let orderObject = orders[orderId];
  drawTable(orderObject);


});
function showCustomerInfo() {
  let object = orders[orderId];
  console.log(object);
  $(".customerInfo").append(`<p>Customer Name:Ebrahim<br /> <br />01140401837<br />Mansoura, ka7la cafe</p>`);
  $(".sellerInfo").append(`<span class="badge bg-success">Seller Id:${object.sellerId}</span> `);
  $(".billStatus").html(`<span class="badge bg-success">${orders[orderId]["status"]}</span>`);
}
function drawTable(data) {
  let targetContainer = $("#dynamic-table-container");
  targetContainer.empty();
  let table = $("<table>").addClass("table datanew");
  drawHeader(table, data);
  drawBody(table, data);
  targetContainer.append(table);
}

function drawHeader(target, data) {
  let header = $("<thead>");
  let row = $("<tr>");
  let headers = data["products"];

  // Image header
  let th = $("<th>").text("Image");
  row.append(th);

  for (let key in headers[0]) {
    let th = $("<th>").text(key);
    row.append(th);
  }

  header.append(row);
  target.append(header);
}

function drawBody(target, data) {
  let body = $("<tbody>");
  let rows = data["products"];
  let products = JSON.parse(localStorage.getItem("products"));

  for (let row of rows) {
    let tr = $("<tr>");

    let cSpan = $("<span>")

    let product = products[row.cat][row['id']] || { "pic": "https://via.placeholder.com/150", "title": "Product not found" };
    let img = $("<img>")
      .attr("src", `${product.pic}`)
      .attr("alt", `${product.title}`)
      .attr("id", "pImage")
      .addClass("me-2");
    cSpan.append(img);

    let productName = $("<span>").text(`${product.title}`);
    cSpan.append(productName);

    let tdImage = $("<td>").append(cSpan);
    tr.append(tdImage);

    // Add other cells for product details
    for (let key in row) {
      let td = $("<td>").text(row[key]);
      tr.append(td);
    }

    body.append(tr);
  }
  target.append(body);
}
