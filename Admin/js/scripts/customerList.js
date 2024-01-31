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
    let userArray = JSON.parse(localStorage.getItem('userArray'));

    drawTable(userArray);
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

        // Add select all checkbox
        let thCheckbox = $("<th>").append(
            $("<label>").addClass("checkboxs").append(
                $("<input>").attr({ type: "checkbox", id: "select-all" }),
                $("<span>").addClass("checkmarks")
            )
        );
        tableHeaderRow.append(thCheckbox);
        let thUserName = $("<th>").text(" userName");
        let thId = $("<th>").text("Id");
        let thPhone = $("<th>").text("Phone");
        let thEmail = $("<th>").text("email");
        let thRole = $("<th>").text("Role");
        tableHeaderRow.append(thUserName, thId, thPhone, thEmail, thRole);
        let actions = $("<th>").text("actions");
        tableHeaderRow.append(actions);

        tableHeader.append(tableHeaderRow);
        target.append(tableHeader);
    }


    function drawBody(target, test) {
        let tableBody = $("<tbody>");
        let actionButtons = ["eye", "edit", "delete"];
        for (let j = 0; j < test.length; j++) {
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
            let tdName = $("<td>").addClass("productimgname");

            tdName.append(
                $("<a>").attr("href", "javascript:void(0);").addClass("product-img").append(
                    $("<img>").attr("src", `${"assets/img/favIcon.png" || test[j].src}`).attr("alt", "product")
                ),
                $("<a>").attr("href", "javascript:void(0);").text(test[j].userName)
            );
            let tdId = $("<td>").text(test[j].id);
            let tdPhone = $("<td>").text(test[j].phone);
            let tdEmail = $("<td>").text(test[j].userEmail);
            let tdRole = $("<td>").text(test[j].userType);
            row.append(tdName, tdId, tdPhone, tdEmail, tdRole);

            // Create action buttons cell
            let actionCell = $("<td>");
            for (let buttonType of actionButtons) {

                let button = $("<a>").addClass("me-3").append(
                    $("<img>").attr("src", `assets/img/icons/${buttonType}.svg`).attr("alt", "img")
                );
                const usertId = row.find("td:eq(2)").text();

                switch (buttonType) {

                    case 'delete':
                        button.on("click", () => {
                            deleteAction(usertId, row);
                        });
                        break;
                    case 'edit':
                        button.on("click", () => {
                            window.location.href = `editCustomer.html?id=${usertId}`; // Include product ID in the URL
                        });
                        break;
                    case 'eye':
                        button.on("click", () => {
                            window.location.href = `customerDetails.html?id=${usertId}`; // Include product ID in the URL
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
                handleDelete(id);

            }
        });
    }
    function handleDelete(id) {
        let userArray = JSON.parse(localStorage.getItem('userArray'));
        //checkfirst the userType is not admin
        let userObj = userArray.find((obj) => obj.id == id);
        console.log(userObj.userType)
        if (userObj.userType === "Admin") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You can\'t delete an admin!',
            })
        }
        else {
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            );
            let filteredArray = userArray.filter((obj) => obj.id != id);
            localStorage.setItem('userArray', JSON.stringify(filteredArray));
            // window.location.reload();
        }


    }
});
