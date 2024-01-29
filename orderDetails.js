const urlParams = new URLSearchParams(window.location.search);
const orderId = urlParams.get("id");
let orders = JSON.parse(localStorage.getItem("orders"));

$(document).ready(function () {
    $(".card-sales-split").prepend("<h2>Order Detail: " + `<span class="badge bg-success">${orderId}</span>` + "</h2>");
    // target customerInfo class then draw the data in p tag dynamically
    let demo = {userName: "Ebrahim", userEmail: "email@example"};
    showCustomerInfo(demo);
    function drawTable(data) {
        let targetContainer = $("#dynamic-table-container");
        targetContainer.empty();  // Use .empty() instead of .innerHTML
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
      
        // Rest of the headers based on products properties
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
        for (let row of rows) {
          let tr = $("<tr>");
      
          // Create div with d-flex class
          let div = $("<div>").addClass("d-flex align-items-center");
      
          // Add an image inside the div
          let img = $("<img>")
            .attr("src", "assets/img/product/product1.jpg") // Update with the correct src
            .attr("alt", "Product Image")
            .css({ "width": "40px", "height": "40px" })
            .addClass("me-2");
          div.append(img);
      
          // Add product name or any other text inside the div
          let productName = $("<a>").text("Product Name"); // Replace with actual product name if available
          div.append(productName);
      
          // Append div to table cell and then to row
          let tdImage = $("<td>").append(div);
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
      
      let orderObject = {
        "6021484": {
          "sellerId": "2000",
          "status": "pending",
          "date": "1/27/2024",
          "products": [
            { "id": "5423", "cat": "watchs", "quantity": 1 },
            { "id": "5457", "cat": "watchs", "quantity": 1 },
            { "id": "5487", "cat": "watchs", "quantity": 1 },
            { "id": "6955", "cat": "watchs", "quantity": 1 },
            { "id": "7090", "cat": "watchs", "quantity": 1 }
          ],
          "total": 57490
        }
      };
      
      drawTable(orderObject["6021484"]);
      
});
function showCustomerInfo(object) {
    $(".customerInfo").append(  `<p>Customer Name:${object.userName}<br /><a href="${object.userEmail}">${object.userEmail}</a> <br />01140401837<br />Mansoura, ka7la cafe</p>`);
    $(".sellerInfo").append(  `<p>Seller Name:${object.userName}<br /><a href="${object.userEmail}">${object.userEmail}</a> <br />01140401837<br />Mansoura, ka7la cafe</p>`);
    $(".billStatus").html( `<span class="badge bg-success">${orders[orderId]["status"]}</span>`);
}
console.log(orders[orderId]);//order
console.log(orders[orderId].sellerId);//sellerId