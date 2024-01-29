let customers = [
    {
        "Customer userName": "ABDO",
        "Id": "1000",
        "Phone": "123-456-7890",
        "email": "johndoe123@example.com",
        "Country": "USA"
    },
    {
        "Customer userName": "Ebrahim",
        "Id": "2000",
        "Phone": "098-765-4321",
        "email": "janesmith@example.com",
        "Country": "UK"
    },
    {
        "Customer userName": "NASR",
        "Id": "3000",
        "Phone": "456-789-0123",
        "email": "alicejohnson@example.com",
        "Country": "Canada"
    }
];
$(document).ready(function () {
    drawTable(customers);
    initializeDataTable();

    $("#filter_search").click(function () {
        $(".filter-search").toggleClass("active");
});

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
    let thCheckbox = $("<th>").append(
        $("<label>").addClass("checkboxs").append(
            $("<input>").attr({ type: "checkbox", id: "select-all" }),
            $("<span>").addClass("checkmarks")
        )
    );
    tableHeaderRow.append(thCheckbox);
    // handle sepcs object
    for (let header of headers) {
        if (header == "specs") {
            // let heads = Object.keys(test[0][header]);
            // for (let head of heads) {
            //     let th = $("<th>").text(head);
            //     tableHeaderRow.append(th);
            // }
        } else {
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
    let actionButtons = ["eye", "edit", "delete"];

    for (let j = 0; j < test.length; j++) {
        let rowData = Object.values(test[j]);
        let row = $("<tr>");

        // Create checkbox cell
        let checkboxCell = $("<td>").append(
            $("<label>").addClass("checkboxs").append(
                $("<input>").attr("type", "checkbox"),
                $("<span>").addClass("checkmarks")
            )
        );
        row.append(checkboxCell);

        // Loop through rowData and create cells
        for (let i = 0; i < rowData.length; i++) {
            let cell;
            if (i === 0) { // Assuming 'Customer userName' is the first item in rowData
                cell = $("<td>").addClass("productimgname");
                cell.append(
                    $("<a>").attr("href", "javascript:void(0);").addClass("product-img").append(
                        $("<img>").attr("src", "assets/img/favIcon.png").attr("alt", "product")
                    ),
                    $("<a>").attr("href", "javascript:void(0);").text(rowData[i])
                );
            } else {
                cell = $("<td>").text(rowData[i]);
            }
            row.append(cell);
        }

        // Create action buttons cell
        let actionCell = $("<td>");
        for (let buttonType of actionButtons) {
    
            let button = $("<a>").addClass("me-3").append(
                $("<img>").attr("src", `assets/img/icons/${buttonType}.svg`).attr("alt", "img")
            );
            const productId = row.find("td:eq(1)").text();
            
            switch (buttonType) {
              
                case 'delete':
                    button.on("click",()=>{
                      deleteAction(productId, row);
                    });
                    break;
                case 'edit':
                    button.on("click",() => {
                      window.location.href = `editCustomer.html?id=${productId}`; // Include product ID in the URL
                    });
                    break;
                case 'eye':
                    button.on("click",() => {
                      window.location.href = `customerDetails.html?id=${productId}`; // Include product ID in the URL
                    });
                    break;
            }
    
            actionCell.append(button);
        }
        row.append(actionCell);

        // Append the row to the table body
        tableBody.append(row);
    }

    target.append(tableBody);
}
function initializeDataTable() {
  if ($(".datanew").length > 0) {
      // Destroy existing DataTables
      $(".datanew").DataTable().destroy();

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
              $(".dataTables_filter").appendTo("#tableSearch");
              $(".dataTables_filter").appendTo(".search-input");
          },
      });
  }

  var selectAllItems = "#select-all";
  var checkboxItem = ":checkbox";
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
function deleteAction (id, row) {
  // Show SweetAlert confirmation
  Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
      if (result.isConfirmed) {
        customers = customers.filter(product => product.id !== id);
        console.log(customers);
        drawTable(customers); // Redraw the table
        initializeDataTable(); // Reinitialize the datatable        

          Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
          );
      }
  });
}

});
