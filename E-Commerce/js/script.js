const sidebarToggle = document.querySelector("#sidebar-toggle");
sidebarToggle.addEventListener("click", function () {
  document.querySelector("#sidebar").classList.toggle("collapsed");
});

// document.querySelector(".theme-toggle").addEventListener("click",() => {
//     toggleLocalStorage();
//     toggleRootClass();
// });

// function toggleRootClass(){
//     const current = document.documentElement.getAttribute('data-bs-theme');
//     const inverted = current == 'dark' ? 'light' : 'dark';
//     document.documentElement.setAttribute('data-bs-theme',inverted);
// }

// function toggleLocalStorage(){
//     if(isLight()){
//         localStorage.removeItem("light");
//     }else{
//         localStorage.setItem("light","set");
//     }
// }

// function isLight(){
//     return localStorage.getItem("light");
// }

// if(isLight()){
//     toggleRootClass();
// }
//////////////////////////
function drawProductForm(targetDiv, content) {

  const targetElement = document.querySelector(targetDiv);
  if (content == "AddProduct")
    targetElement.innerHTML = ` 
      <div class="content ">
        <div class="page-header">
          <div class="page-title">
            <h4>Product Add</h4>
            <h6>Create new product</h6>
          </div>
        </div>

        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-lg-3 col-sm-6 col-12">
                <div class="form-group">
                  <label>Product Name</label>
                  <input type="text"/>
                </div>
              </div>
              
              <div class="col-lg-3 col-sm-6 col-12">
                <div class="form-group">
                  <label>Category</label>
                  <select class="select">
                    <option>Choose Category</option>
                    <option>Fruits</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-12">
                <div class="form-group">
                  <label>Brand</label>
                  <select class="select">
                    <option>Choose Brand</option>
                    <option>Brand</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-12">
                <div class="form-group">
                  <label>Unit</label>
                  <select class="select">
                    <option>Choose Unit</option>
                    <option>Unit</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-12">
                <div class="form-group">
                  <label>SKU</label>
                  <input type="text" />
                </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-12">
                <div class="form-group">
                  <label>Minimum Qty</label>
                  <input type="text" />
                </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-12">
                <div class="form-group">
                  <label>Quantity</label>
                  <input type="text" />
                </div>
              </div>
              <div class="col-lg-12">
                <div class="form-group">
                  <label>Description</label>
                  <textarea class="form-control"></textarea>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-12">
                <div class="form-group">
                  <label>Tax</label>
                  <select class="select">
                    <option>Choose Tax</option>
                    <option>2%</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-12">
                <div class="form-group">
                  <label>Discount Type</label>
                  <select class="select">
                    <option>Percentage</option>
                    <option>10%</option>
                    <option>20%</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-12">
                <div class="form-group">
                  <label>Price</label>
                  <input type="text" />
                </div>
              </div>
              <div class="col-lg-3 col-sm-6 col-12">
                <div class="form-group">
                  <label> Status</label>
                  <select class="select">
                    <option>Closed</option>
                    <option>Open</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-12">
              <div class="form-group">
              <label for="ChooseyourfileImage">Choose your file Image</label>
              <input type="file" class="form-control-file" id="exampleFormControlFile1">
            </div>
              </div>
              <div class="col-lg-12">
                <a href="javascript:void(0);" class="btn btn-submit me-2"
                  >Submit</a
                >
                <a href="productlist.html" class="btn btn-cancel">Cancel</a>
              </div>
            </div>
          </div>
        </div>
    </div>`;
  else if (content == "ProductList") targetElement.innerHTML;
  else if (content == "EditProduct") targetElement.innerHTML = `
  <div class="content">
  <div class="page-header">
    <div class="page-title">
      <h4>Product Edit</h4>
      <h6>Update your product</h6>
    </div>
  </div>

  <div class="card">
    <div class="card-body">
      <div class="row">
        <div class="col-lg-3 col-sm-6 col-12">
          <div class="form-group">
            <label>Product Name</label>
            <input type="text" value="Macbook pro" />
          </div>
        </div>
        
        <div class="col-lg-3 col-sm-6 col-12">
          <div class="form-group">
            <label>Category</label>
            <select class="select">
              <option>None</option>
              <option>option1</option>
            </select>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 col-12">
          <div class="form-group">
            <label>Brand</label>
            <select class="select">
              <option>None</option>
              <option>option1</option>
            </select>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 col-12">
          <div class="form-group">
            <label>Unit</label>
            <select class="select">
              <option>Piece</option>
              <option>Kg</option>
            </select>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 col-12">
          <div class="form-group">
            <label>SKU</label>
            <input type="text" value="PT0002" />
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 col-12">
          <div class="form-group">
            <label>Minimum Qty</label>
            <input type="text" value="5" />
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 col-12">
          <div class="form-group">
            <label>Quantity</label>
            <input type="text" value="50" />
          </div>
        </div>
        <div class="col-lg-12">
          <div class="form-group">
            <label>Description</label>
            <textarea class="form-control">
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</textarea
            >
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 col-12">
          <div class="form-group">
            <label>Tax</label>
            <select class="select">
              <option>Choose Tax</option>
              <option>2%</option>
            </select>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 col-12">
          <div class="form-group">
            <label>Discount Type</label>
            <select class="select">
              <option>Percentage</option>
              <option>10%</option>
              <option>20%</option>
            </select>
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 col-12">
          <div class="form-group">
            <label>Price</label>
            <input type="text" value="1500.00" />
          </div>
        </div>
        <div class="col-lg-3 col-sm-6 col-12">
          <div class="form-group">
            <label> Status</label>
            <select class="select">
              <option>Active</option>
              <option>Open</option>
            </select>
          </div>
        </div>
        <div class="col-lg-12">
          <div class="form-group">
            <label> Product Image</label>
            <div class="image-upload">
              <input type="file" />
              <div class="image-uploads">
                <img src="assets/img/icons/upload.svg" alt="img" />
                <h4>Drag and drop a file to upload</h4>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="product-list">
            <ul class="row">
              <li>
                <div class="productviews">
                  <div class="productviewsimg">
                    <img src="assets/img/icons/macbook.svg" alt="img" />
                  </div>
                  <div class="productviewscontent">
                    <div class="productviewsname">
                      <h2>macbookpro.jpg</h2>
                      <h3>581kb</h3>
                    </div>
                    <a href="javascript:void(0);" class="hideset">x</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="col-lg-12">
          <a href="javascript:void(0);" class="btn btn-submit me-2"
            >Update</a
          >
          <a href="productlist.html" class="btn btn-cancel">Cancel</a>
        </div>
      </div>
    </div>
  </div>
</div>`;
  else if(content == "home"){
    targetElement.innerHTML = `
    <!-- analysis Row -->
    <div class="row">
      <div class="col-md-4">
        <div class="card bg-light rounded-3">
          <div class="card-body d-flex align-items-center">
            <div class="icon-frame" style="background-color: #0d6efd">
              <i
                class="bx bxs-calendar-check"
                style="font-size: 36px; color: #ffffff"
              ></i>
            </div>
            <div class="text ms-3">
              <h3
                class="fs-5"
                style="font-family: 'Roboto', sans-serif"
              >
                1020
              </h3>
              <p
                class="text-dark"
                style="font-family: 'Roboto', sans-serif"
              >
                New Order
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card bg-light rounded-3">
          <div class="card-body d-flex align-items-center">
            <div class="icon-frame" style="background-color: #ffc107">
              <i
                class="bx bxs-group"
                style="font-size: 36px; color: #ffffff"
              ></i>
            </div>
            <div class="text ms-3">
              <h3
                class="fs-5"
                style="font-family: 'Roboto', sans-serif"
              >
                2834
              </h3>
              <p
                class="text-dark"
                style="font-family: 'Roboto', sans-serif"
              >
                Visitors
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card bg-light rounded-3">
          <div class="card-body d-flex align-items-center">
            <div class="icon-frame" style="background-color: #fd7e14">
              <i
                class="bx bxs-dollar-circle"
                style="font-size: 36px; color: #ffffff"
              ></i>
            </div>
            <div class="text ms-3">
              <h3
                class="fs-5"
                style="font-family: 'Roboto', sans-serif"
              >
                $2543
              </h3>
              <p
                class="text-dark"
                style="font-family: 'Roboto', sans-serif"
              >
                Total Sales
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <h4>Dashboard</h4>
      </div>
    </div>
    <!-- cards Row -->
    <div class="row">
      <div class="col-md-3 mb-3">
        <div class="card bg-primary text-white h-100">
          <div class="card-body py-5">Primary Card</div>
          <div class="card-footer d-flex">
            View Details
            <span class="ms-auto">
              <i class="bi bi-chevron-right"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-3">
        <div class="card bg-warning text-dark h-100">
          <div class="card-body py-5">Warning Card</div>
          <div class="card-footer d-flex">
            View Details
            <span class="ms-auto">
              <i class="bi bi-chevron-right"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-3">
        <div class="card bg-success text-white h-100">
          <div class="card-body py-5">Success Card</div>
          <div class="card-footer d-flex">
            View Details
            <span class="ms-auto">
              <i class="bi bi-chevron-right"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="col-md-3 mb-3">
        <div class="card bg-danger text-white h-100">
          <div class="card-body py-5">Danger Card</div>
          <div class="card-footer d-flex">
            View Details
            <span class="ms-auto">
              <i class="bi bi-chevron-right"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- charts Row -->
    <div class="row">
      <div class="col-md-6 mb-3">
        <div class="card h-100">
          <div class="card-header">
            <span class="me-2"
              ><i class="bi bi-bar-chart-fill"></i
            ></span>
            Area Chart Example
          </div>
          <div class="card-body">
            <canvas class="chart" width="400" height="200"></canvas>
          </div>
        </div>
      </div>
      <div class="col-md-6 mb-3">
        <div class="card h-100">
          <div class="card-header">
            <span class="me-2"
              ><i class="bi bi-bar-chart-fill"></i
            ></span>
            Area Chart Example
          </div>
          <div class="card-body">
            <canvas class="chart" width="400" height="200"></canvas>
          </div>
        </div>
      </div>
    </div>
    <!-- tabel row -->
    <div class="row">
      <div class="col-md-12 mb-3">
        <div class="card">
          <div class="card-header">
            <span><i class="bi bi-table me-2"></i></span> Data Table
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table
                id="example"
                class="table table-striped data-table"
                style="width: 100%"
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Office</th>
                    <th>Age</th>
                    <th>Start date</th>
                    <th>Salary</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Tiger Nixon</td>
                    <td>System Architect</td>
                    <td>Edinburgh</td>
                    <td>61</td>
                    <td>2011/04/25</td>
                    <td>$320,800</td>
                  </tr>
                  <tr>
                    <td>Yuri Berry</td>
                    <td>Chief Marketing Officer (CMO)</td>
                    <td>New York</td>
                    <td>40</td>
                    <td>2009/06/25</td>
                    <td>$675,000</td>
                  </tr>
                  <tr>
                    <td>Caesar Vance</td>
                    <td>Pre-Sales Support</td>
                    <td>New York</td>
                    <td>21</td>
                    <td>2011/12/12</td>
                    <td>$106,450</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Office</th>
                    <th>Age</th>
                    <th>Start date</th>
                    <th>Salary</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
    console.log("home");
}
  // window.document.title = `${content}`;
  // window.history.pushState({}, "", `/${content}`);
  console.log(content)
}



let AddProduct = document.getElementById("AddProduct");
let ProductList = document.getElementById("ProductList");
let EditProduct = document.getElementById("EditProduct");
let home = document.getElementById("home");
AddProduct.addEventListener("click", function () {
  drawProductForm(".mainContet", "AddProduct");
});
ProductList.addEventListener("click", function () {
  drawProductForm(".mainContet", "ProductList");
});
home.addEventListener("click", function () {
  drawProductForm(".mainContet", "home");
});
EditProduct.addEventListener("click", function () {
  drawProductForm(".mainContet", "EditProduct");
});
