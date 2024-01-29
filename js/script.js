
//open and close side bar
  function openmenu(){
    document.getElementById("side-bar").style.display="block";
    document.getElementById("menu-btn").style.display="none";
    document.getElementById("close-btn").style.display="block";
}
function closemenu(){
    document.getElementById("side-bar").style.display="none";
    document.getElementById("menu-btn").style.display="block";
    document.getElementById("close-btn").style.display="none";
}




//nav to sign in and back
document.addEventListener("DOMContentLoaded", function () {
    // Function to check if the user is signed in (replace with your actual logic)
    function isUserSignedIn() {
        // Placeholder logic, replace with your actual authentication check
        return false; // Assume the user is not signed in for testing purposes
    }

    // Function to get the user's name (replace with your actual logic)
    function getUserFirstName() {
        // Placeholder logic, replace with your actual user data retrieval logic
        return "John"; // Replace with the actual user's first name
    }

    // Get the account link element
    const accountLink = document.getElementById("account-link");

    // Check if the user is signed in
    const userIsSignedIn = isUserSignedIn();

    // Update the account link based on the user's sign-in status
    if (userIsSignedIn) {
        // Get the user's first name
        const userFirstName = getUserFirstName();

        // Update the account link HTML with user's name
        accountLink.innerHTML = `<a href="HomePage.html"><i class="fa-solid fa-user"></i> Hello, ${userFirstName}</a>`;
    } else {
        // If the user is not signed in, display the default "Hello, Sign In" link
        accountLink.innerHTML = '<a href="login.html"><i class="fa-solid fa-user"></i> Hello, Sign In</a>';
    }
});



//nav to products to search
function searchProducts() {
    // Get the search input value
    var searchQuery = document.getElementById("searchInput").value;

    // Redirect to the product page with the search query as a parameter
    window.location.href = "productPage.html?search=" + encodeURIComponent(searchQuery);
  }

  // Handle Enter key press event
  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      searchProducts();
    }
  }
  





   // Fetch the JSON file using Fetch API
fetch('output.json')
.then(response => response.json())
.then(data => {
  // Save JSON data to a file named "output.json" in local storage
  localStorage.setItem('output.json', JSON.stringify(data));

  // Retrieve JSON data from the "output.json" file in local storage
  var jsonData = JSON.parse(localStorage.getItem('output.json'));



  //desing to display products
  function createProductElement(product) {
    var productDiv = document.createElement("div");
    productDiv.className = "product";
    productDiv.id = "product-" + product.id;

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
    numberOfRatings.textContent = "(" + (product.numberOfRatings || 0) +")";
    numberOfRatings.style.color = "#888"; // Set the color of the number of ratings

    function updateStars(index) {
        for (let i = 0; i < 5; i++) {
            stars[i].innerHTML = i < index ? "&#9733;" : "&#9734;";
        }
    }

    // Add a click event listener to the product element
    productDiv.addEventListener("click", function () {
        // Redirect to the product details page, passing the product ID
        window.location.href = 'product-details.html?id=' + product.id;
    });

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
              var productElement = createProductElement(product);
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
          displayMultipleProducts("screens", container,2);
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
              var productElement = createProductElement(product);
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
              var productElement = createProductElement(product);
              container.appendChild(productElement);
      
              count++;
          }
      }
      
      // Display sales in the "Sales" container
      displaySales();

      






          })
    .catch(error => console.error('Error fetching JSON file:', error));


    