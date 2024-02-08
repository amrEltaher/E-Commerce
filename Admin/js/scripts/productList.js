let data = JSON.parse(localStorage.getItem("products")) || JSON.parse(localStorage.getItem("Products"));

function transformDataToArray(data) {
    let result = [];

    $.each(data, function (category, items) {
        $.each(items, function (id, item) {
            let product = {
                id: id,
                category: category,
                title: item.title,
                price: item.price,
                pic: item.pic,
                sellerId: item.sellerId,
                specs: item.specs,
            };
            result.push(product);
        });
    });

    return result;
}

let Products = transformDataToArray(data);
localStorage.setItem("products", JSON.stringify(data));
$(document).ready(function () {
    try {
        drawTable(Products);
        initializeDataTable();
    } catch (error) {
        let targetContainer = $(".card-body");

        targetContainer.empty();
        let errorMessage = $("<h1>").text("No Product found");
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
        let thCheckbox = $("<th>").append(
            $("<label>").addClass("checkboxs").append(
                $("<input>").attr({ type: "checkbox", id: "select-all" }),
                $("<span>").addClass("checkmarks")
            )
        );
        tableHeaderRow.append(thCheckbox);
        // handle sepcs object
        for (let header of headers) {
            if (header != "specs") {
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
        let currentRow = $(this).closest("tr");
        let productId = currentRow.find("td:eq(1)").text();



        for (let j = 0; j < Products.length; j++) {
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

                // If the value is an object, handle it differently
                if (typeof rowData[i] === "object") {

                }

                //if the value is src of image
                else if (rowData[i].includes("img")) {
                    let cell = $("<td>");
                    let cell1 = $("<td>").append(
                        //rowData[i] insetead link of image
                        $("<img>").attr("src", `${rowData[i] || "/assets/img/product/product1.jpg"}`).attr("alt", "img").attr("id", "pImage")
                    );
                    row.append(cell1);
                }
                else {
                    let cell = $("<td>");
                    if (rowData[i].length > 20) {
                        rowData[i] = rowData[i].slice(0, 20);
                    }
                    cell.text(rowData[i]);
                    row.append(cell);
                }
            }

            // Create action buttons cell
            let actionCell = $("<td>");
            for (let buttonType of actionButtons) {

                let button = $("<a>").addClass("me-3").append(
                    $("<img>").attr("src", `assets/img/icons/${buttonType}.svg`).attr("alt", "img")
                );
                let productId = row.find("td:eq(1)").text();
                let productCat = row.find("td:eq(2)").text();

                switch (buttonType) {

                    case 'delete':
                        button.on("click", () => {
                            deleteAction(productId, row);
                        });
                        break;

                    case 'eye':
                        button.on("click", () => {
                            window.location.href = `./productDetail.html?category=${productCat}&id=${productId}`;
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
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                let products = JSON.parse(localStorage.getItem("products"));
                let productCat = row.find("td:eq(2)").text();
                delete products[productCat][id];
                let orders = JSON.parse(localStorage.getItem("orders"));
                handleDeleteOrders(orders, "4042");
                handleDeleteSellerProducts(id);
                localStorage.setItem("orders", JSON.stringify(orders));
                localStorage.setItem("products", JSON.stringify(products));
                localStorage.setItem("products", JSON.stringify(products));

                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                );
                setTimeout(function () {
                    window.location.reload();
                }, 1000);
            }
        });

    }
    function handleDeleteOrders(orders, productId) {
        for (let orderKey in orders) {
            let order = orders[orderKey];
            order.products = order.products.filter(product => product.id !== productId);
            if (order.products.length === 0) {
                delete orders[orderKey];
            }
        }
    }
    function handleDeleteSellerProducts(productId) {
        let sellers = JSON.parse(localStorage.getItem("sellers"));
        for (let sellerId in sellers) {
            if (sellers.hasOwnProperty(sellerId)) {
                let seller = sellers[sellerId];
                seller.Products = seller.Products.filter(product => product.product_id !== productId);
            }
        }
        localStorage.setItem("sellers", JSON.stringify(sellers));
    }
});
