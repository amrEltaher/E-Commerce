$(document).ready(function () {
    let userArray = JSON.parse(localStorage.getItem('userArray'));
    console.log(userArray);
    drawTable(userArray);
    initializeDataTable();
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
    let thCheckbox = $("<th>").append(
        $("<label>").addClass("checkboxs").append(
            $("<input>").attr({ type: "checkbox", id: "select-all" }),
            $("<span>").addClass("checkmarks")
        )
    );
    tableHeaderRow.append(thCheckbox);
    let thUserName = $("<th>").text(" userName");
    let thId = $("<th>").text("Id");
    let thEmail = $("<th>").text("Email");
    let thRole = $("<th>").text("Role");
    tableHeaderRow.append(thUserName, thId, thEmail, thRole);
    let actions = $("<th>").text("actions");
    tableHeaderRow.append(actions);

    tableHeader.append(tableHeaderRow);
    target.append(tableHeader);
}


function drawBody(target, test) {
    let tableBody = $("<tbody>");
    let actionButtons = [ "edit", "delete"];
    for (let j = 0; j < test.length; j++) {
        let row = $("<tr>");
        let checkboxCell = $("<td>").append(
            $("<label>").addClass("checkboxs").append(
                $("<input>").attr("type", "checkbox"),
                $("<span>").addClass("checkmarks")
            )
        );
        row.append(checkboxCell);

        let tdName = $("<td>");
        tdName.append(
            $("<span>").append(
                $("<img>").attr("src", `${"assets/img/profile.png" || test[j].src}`).attr("alt", "product").attr("id", "pImage")
            ),
            $("<span>").text(test[j].userName)

        );
        let tdId = $("<td>").text(test[j].id);
        let tdEmail = $("<td>").text(test[j].userEmail || test[j].email);
        let tdRole = $("<td>").text(test[j].userType);
        row.append(tdName, tdId, tdEmail, tdRole);

        // Create action buttons cell
        let actionCell = $("<td>");
        for (let buttonType of actionButtons) {

            let button = $("<a>").addClass("me-3").append(
                $("<img>").attr("src", `assets/img/icons/${buttonType}.svg`).attr("alt", "img")
            );
            let usertId = row.find("td:eq(2)").text();

            switch (buttonType) {

                case 'delete':
                    button.on("click", () => {
                        deleteAction(usertId, row);
                    });
                    break;
                case 'edit':
                    button.on("click", () => {
                        window.location.href = `editCustomer.html?id=${usertId}`;
                    });
                    break;
                // case 'eye':
                //     button.on("click", () => {
                //         window.location.href = `customerDetails.html?id=${usertId}`;
                //     });
                //     break;
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
    $(".datanew").DataTable({
        bFilter: true,
        sDom: "fBtlpi",
        pagingType: "numbers",
        ordering: true,
        language: {
            search: " ",
            searchPlaceholder: "Search...",
            info: "_START_ - _END_ of _TOTAL_ users", // dataTables_info class
        },
        initComplete: (settings, json) => {
            $(".dataTables_filter").appendTo(".search-input");
        },
    });

}
function deleteAction(id) {
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
    let userObj = userArray.find((obj) => obj.id == id);

    switch (userObj.userType.toString().toLowerCase()) {
        case "admin":
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You can\'t delete an admin!',
            });
            break;
        case "seller":
            let sellers = JSON.parse(localStorage.getItem('sellers'));
            delete sellers[id]
            localStorage.setItem('sellers', JSON.stringify(sellers));
            let filteredArray = userArray.filter((obj) => obj.id != id);
            localStorage.setItem('userArray', JSON.stringify(filteredArray));
            break;
        default:
            filteredArray = userArray.filter((obj) => obj.id != id);
            localStorage.setItem('userArray', JSON.stringify(filteredArray));
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            );
    }




}