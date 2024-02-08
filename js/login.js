
document.getElementById("login_btn").addEventListener("click", function (event) {
  // Prevent the default form submission
  event.preventDefault();

  // Fetch input values
  var userEmailInput = document.getElementById("typeEmailX");
  var userPasswordInput = document.getElementById("typePasswordX");

  // Reset previous error messages
  document.getElementById("emailError").textContent = "";
  document.getElementById("passwordError").textContent = "";

  // Validate inputs
  var isValid = true;

  if (!validateEmail(userEmailInput.value)) {
      document.getElementById("emailError").textContent = "Invalid email address.";
      isValid = false;
  }

  if (!validatePassword(userPasswordInput.value)) {
      document.getElementById("passwordError").textContent = "Password is required.";
      isValid = false;
  }

  // If all validations pass, check against stored data in local storage
  if (isValid) {
      var existingUserData = JSON.parse(localStorage.getItem("userArray")) || [];
      var foundUser = existingUserData.find(function (user) {
          return user.userEmail === userEmailInput.value && user.userPassword === userPasswordInput.value;
      });

      if (foundUser) {
          // Successful login
          alert("Login successful");

          // Store the current user in local storage
          localStorage.setItem("currentUser", JSON.stringify(foundUser));

          // Redirect based on user type
          redirectToDashboard(foundUser.userType, foundUser.userFirstName);
      } else {
          // Invalid credentials
          document.getElementById("emailError").textContent = "Invalid email or password.";
      }
  }
});

function redirectToDashboard(userType, userFirstName) {
  switch (userType) {
      case "customer":
          // Redirect to the home page with the user's name as a parameter
          //window.location.href = "MyAccount.html?userFirstName=" + encodeURIComponent(userFirstName);
          window.location.href = "HomePage.html";
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
}




          // Validation functions (same as before)
          function validateEmail(email) {
              var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              return emailRegex.test(email);
          }

          function validatePassword(password) {
              return password.trim() !== "";
          }
          // Function to retrieve the current user from local storage
          function getCurrentUser() {
              return JSON.parse(localStorage.getItem("currentUser")) || null;
          }
          // Example of how to use the getCurrentUser function
          var currentUser = getCurrentUser();
          console.log("Current user:", currentUser);