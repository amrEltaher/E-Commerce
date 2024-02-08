
function ordersToArray(orders) {
  let ordersArray = [];

  for (let orderKey in orders) {
    let order = orders[orderKey];
    let newOrder = {
      orderId: orderKey,
      ...order
    };
    ordersArray.push(newOrder);
  }

  return ordersArray;
}

let orders = JSON.parse(localStorage.getItem("orders"));
let Orders = ordersToArray(orders);
$(document).ready(function () {
  try {
    drawTable(Orders);
    initializeDataTable();
  } catch (error) {
    let targetContainer = $(".card-body");
    targetContainer.empty();
    let errorMessage = $("<h1>").text("No orders found");
    targetContainer.append(errorMessage);
    Swal.fire({
      title: 'Error!',
      text: 'Sorry Couldn\'t load data',
      icon: 'error',
      confirmButtonText: 'OK'
    });
  }


  function drawTable(data) {
    let targetContainer = $("#dynamic-table-container");
    targetContainer.innerHTML = "";
    let table = $("<table>").addClass("table datanew");
    drawHeader(table, data);
    drawBody(table, data);
    targetContainer.append(table);
  }

  function drawHeader(target, test) {
    let tableHeader = $("<thead>");
    let tableHeaderRow = $("<tr>");
    let headers = Object.keys(test[0]);

    // Add select all checkbox

    // handle products object
    for (let header of headers) {
      if (header != "products") {
        let th = $("<th>").text(header);
        tableHeaderRow.append(th);
      }
    }
    // add actions to the end of row
    let actions = $("<th>").text("actions");
    tableHeaderRow.append(actions);

    tableHeader.append(tableHeaderRow);
    target.append(tableHeader);
  }

  function drawBody(target, test) {
    let tableBody = $("<tbody>");
    let actionButtons = ["eye", "delete"];

    for (let j = 0; j < Orders.length; j++) {
      let rowData = Object.values(test[j]);
      let row = $("<tr>");

      for (let i = 0; i < rowData.length; i++) {
        if (typeof rowData[i] != "object") {
          // if the value of the header cell is status then add badge
          let cell = $("<td>");

          if (rowData[i] === "delivered" || rowData[i] === "pending" || rowData[i] === "Cancelled") {
            let badgeClass = rowData[i] === "delivered" ? "bg-success" : rowData[i] === "pending" ? "bg-warning" : "bg-danger";
            cell.append($("<span>").addClass(`badge ${badgeClass}`).text(rowData[i]));
          } else {
            if (rowData[i].length > 20) {
              rowData[i] = rowData[i].slice(0, 20);
            }
            cell.text(rowData[i]);
          }
          row.append(cell);
        }
      }

      let actionCell = $("<td>").addClass("text-center");
      let actionDropdownToggle = $("<a>")
        .addClass("action-set")
        .attr({
          href: "javascript:void(0);",
          "data-bs-toggle": "dropdown",
          "aria-expanded": "true"
        })
        .append(
          $("<i>").addClass("fa fa-ellipsis-v").attr("aria-hidden", "true")
        );

      let dropdownMenu = $("<ul>").addClass("dropdown-menu");
      for (let buttonType of actionButtons) {
        let dropdownItem = $("<li>");
        let button = $("<a>")
          .addClass("dropdown-item")
          .attr("href", "javascript:void(0);");

        let productId = row.find("td:eq(0)").text();

        switch (buttonType) {
          case 'delete':
            button.append(
              $("<img>").attr("src", "assets/img/icons/delete1.svg").addClass("me-2").attr("alt", "img"),
              "Cancel Order"
            ).on("click", () => {
              deleteAction(productId, row);
            });
            break;
          case 'eye':
            button.append(
              $("<img>").attr("src", "assets/img/icons/eye1.svg").addClass("me-2").attr("alt", "img"),
              "Order Details"
            ).on("click", () => {
              window.location.href = `orderDetails.html?id=${productId}`;
            });
            break;
        }

        dropdownItem.append(button);
        dropdownMenu.append(dropdownItem);
      }

      actionCell.append(actionDropdownToggle, dropdownMenu);
      row.append(actionCell);
      tableBody.append(row);
    }
    target.append(tableBody);
  }
  function initializeDataTable() {
    if ($(".datanew").length > 0) {
      $(".datanew").DataTable({
        bFilter: true,
        sDom: "fBtlpi",
        pagingType: "numbers",
        ordering: true,
        language: {
          search: " ",
          sLengthMenu: "_MENU_",
          searchPlaceholder: "Search...",
          info: "_START_ - _END_ of _TOTAL_ items",
        },
        initComplete: (settings, json) => {
          $(".dataTables_filter").appendTo(".search-input");
        },
      });
    }

    let selectAllItems = "#select-all";
    let checkboxItem = ":checkbox";
    $(selectAllItems).click(function () {
      if (this.checked) {
        $(checkboxItem).each(function () {
          this.checked = true;
        });
      } else {
        $(checkboxItem).each(function () {
          this.checked = false;
        });
      }
    });
  }
  function deleteAction(id, row) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
        if (deleteOrder(id)) {
          Swal.fire(
            'Cancel!',
            'The Order has been Cancelled.',
            'success'
          );
          window.location.reload();
        }
        else {
          Swal.fire(
            'Error!',
            'The Order is already Cancelled or deliverd',
            'error'
          );
        }


      }
    });
  }
  function deleteOrder(id) {
    let ordersDB = JSON.parse(localStorage.getItem("orders"));
    if (ordersDB[id].status === "pending") {
      ordersDB[id].status = "Cancelled";
      localStorage.setItem("orders", JSON.stringify(ordersDB));
      return true;
    }
    return false;
  }
});
