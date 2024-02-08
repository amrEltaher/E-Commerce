//open and close side bar
function openmenu() {
  document.getElementById("side-bar").style.display = "block";
  document.getElementById("menu-btn").style.display = "none";
  document.getElementById("close-btn").style.display = "block";
}
function closemenu() {
  document.getElementById("side-bar").style.display = "none";
  document.getElementById("menu-btn").style.display = "block";
  document.getElementById("close-btn").style.display = "none";
}

//handle signin and user name change
let user = JSON.parse(localStorage.getItem('currentUser'));
let userType = user.userType;
console.log(user);
if(!user){
  document.getElementById("account-link").textContent = "Hello, sign in"; 
  document.getElementById("account-link").addEventListener("click", function() {
    location.href = "/login.html";
  });
}else{
  document.getElementById("account-link").textContent = "Hello, "+user.userName.split(" ")[0];
  document.getElementById("account-link").addEventListener("click", function redirectToDashboard(e) {
    console.log(userType);
    switch (userType) {
        case "customer":
          console.log(userType);
            // Redirect to the home page with the user's name as a parameter
            window.location.href = "profile.html";
            break;
        case "seller":
            // Redirect to the seller page
            window.location.href = "Seller.html";
            break;
        case "Admin":
            window.location.href = "./Admin/Admin.html";
            break;
        default:
            break;
    }
});
}


//nav to products to search
function searchProducts() {
  // Get the search input value
  var searchQuery = document.getElementById("searchInput").value;

  // Redirect to the product page with the search query as a parameter
  window.location.href =
    "products.html?search=" + encodeURIComponent(searchQuery);
}

// Handle Enter key press event
function handleKeyPress(event) {
  if (event.key === "Enter") {
    searchProducts();
  }
}

// Fetch the JSON file using Fetch API
fetch("output.json")
  .then((response) => response.json())
  .then((data) => {
    // Save JSON data to a file named "output.json" in local storage
    localStorage.setItem("output.json", JSON.stringify(data));

    // Retrieve JSON data from the "output.json" file in local storage
    var jsonData = JSON.parse(localStorage.getItem("output.json"));
    //desing to display products
    function createProductElement(product,category,id) {
      var productDiv = document.createElement("div");
      productDiv.className = "product";
      productDiv.id = id;
      productDiv.dataset.cat = category;
      
      var title = document.createElement("h3");
      title.textContent = product.title;

      var price = document.createElement("p");
      price.textContent = "Price: $" + product.price;

      var image = document.createElement("img");
      image.src = product.pic;
      image.alt = product.title;

      var ratingContainer = document.createElement("div");
      ratingContainer.className = "rating-container";

      var stars = [];

      // Set the initial rating based on the value in the JSON data
      var initialRating = parseInt(product.rating) || 0;

      // Create stars for the rating
      for (let i = 1; i <= 5; i++) {
        var star = document.createElement("span");
        star.innerHTML = i <= initialRating ? "&#9733;" : "&#9734;";
        star.dataset.rating = i; // Set the rating value as a data attribute

        // Add a click event listener to update stars on click
        star.addEventListener("click", function () {
          updateStars(i);
        });

        star.style.fontSize = "25px";
        star.style.color = "#FFD700"; // Set the color of the filled star

        ratingContainer.appendChild(star);
        stars.push(star);
      }

      //rating number
      var numberOfRatings = document.createElement("p");
      numberOfRatings.textContent = "(" + (product.numberOfRatings || 0) + ")";
      numberOfRatings.style.color = "#888"; // Set the color of the number of ratings

      function updateStars(index) {
        for (let i = 0; i < 5; i++) {
          stars[i].innerHTML = i < index ? "&#9733;" : "&#9734;";
        }
      }

      // Add a click event listener to the product element


      productDiv.appendChild(image);
      productDiv.appendChild(title);
      productDiv.appendChild(price);
      productDiv.appendChild(ratingContainer);
      productDiv.appendChild(numberOfRatings);

      return productDiv;
    }

    //disply products
    function displayProducts(category, containerId, limit = 3) {
      var container = document.getElementById(containerId);
      var count = 0;

      for (var productId in jsonData[category]) {
        if (count >= limit) {
          break; // Break the loop if the limit is reached
        }

        var product = jsonData[category][productId];
        var productElement = createProductElement(product,category,productId);
        container.appendChild(productElement);

        count++;
      }
    }

    // Display only 3 products for each category
    displayProducts("watchs", "smartwatches", 3);
    displayProducts("screens", "screens", 3);
    displayProducts("laptops", "laptops", 3);

    // Function to display trending products
    function displayTrending() {
      var container = document.getElementById("trending");

      // Display three laptops in the "Trending" section
      displayMultipleProducts("laptops", container, 3);
    }

    // Display trending products in the "Trending" container
    displayTrending();

    // Function to display new arrivals
    function displayNewArrivals() {
      var container = document.getElementById("newArrivals");

      // Display one laptop, one smartwatch, and one screen from each category
      displayMultipleProducts("screens", container, 2);
      displaySingleProduct("laptops", container);
    }

    // Function to display a single product from a category
    function displaySingleProduct(category, container) {
      var count = 0;

      for (var productId in jsonData[category]) {
        if (count >= 1) {
          break; // Display only one product from each category
        }

        var product = jsonData[category][productId];
        var productElement = createProductElement(product,category,productId);
        container.appendChild(productElement);

        count++;
      }
    }

    // Display new arrivals in the "New Arrivals" container
    displayNewArrivals();

    // Function to display sales
    function displaySales() {
      var container = document.getElementById("sales");

      // Display two smartwatches and one laptop from their respective categories
      displayMultipleProducts("watchs", container, 2);
      displaySingleProduct("laptops", container);
    }

    // Function to display multiple products from a category
    function displayMultipleProducts(category, container, limit) {
      var count = 0;

      for (var productId in jsonData[category]) {
        if (count >= limit) {
          break; // Display only specified number of products
        }

        var product = jsonData[category][productId];
        var productElement = createProductElement(product,category,productId);
        container.appendChild(productElement);

        count++;
      }
    }

    // Display sales in the "Sales" container
    displaySales();
  })
  .catch((error) => console.error("Error fetching JSON file:", error));
  // Convert HTMLCollection to an array

