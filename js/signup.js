let sellers = JSON.parse(localStorage.getItem("sellers")) || {};
        
fetch('/outputV2.json').then(function (response) {
        return response.json();
    }).then(function (data) {
        localStorage.setItem("products", JSON.stringify(data));
    })
    fetch('./data/sellers.json').then(
        function (response) {
            console.log(response)
            return response.json();
        }
    ).then(
        function (data) {
            localStorage.setItem("sellers", JSON.stringify(data));
        }
    )
    fetch('/users.json').then(
        function (data) {
            return data.json();
        }
    ).then(
        function (data) {
            localStorage.setItem("userArray", JSON.stringify(data));
        }
    )
console.log(JSON.parse(localStorage.getItem("userArray"))||[]);
document.getElementById("reg_btn").addEventListener('click', function () {
    // Validation functions
    function validateName(name) {
        return name.length > 3 && name.length < 14;
    }

    function validateEmail(email) {
        var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
      return /^(?=.\d)(?=.[!@#$%^&])(?=.[a-z])(?=.*[A-Z]).{8,}$/.test(password);
    }

    // Fetch input values
    var userNameInput = document.getElementById("form3Example1cg");
    var userEmailInput = document.getElementById("form3Example3cg");
    var userPasswordInput = document.getElementById("form3Example4cg");
    var userConfirmPasswordInput = document.getElementById("form3Example4cdg");
    var userTypeInput = document.getElementById("usertype").value;
    var agreeCheckbox = document.getElementById("agreeCheckbox").checked;
    document.getElementById("nameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("passwordError").textContent = "";
    document.getElementById("confirmpasswordError").textContent = "";
    document.getElementById("trsv").style.color = ""; // Reset the border color
    document.getElementById("usertypeError").textContent = "";
    // Validate inputs
    if (!validateName(userNameInput.value)) {
        document.getElementById("nameError").textContent = "Name should be between 4 and 14 characters.";
        userNameInput.style.border = "2px solid red";
        return;
    } else {
        userNameInput.style.borderColor = ""; // Reset the border color
    }

    if (!validateEmail(userEmailInput.value)) {
        document.getElementById("emailError").textContent = "Invalid email address.";
        userEmailInput.style.border = "2px solid red";
        return;
    } else {
        userEmailInput.style.border = ""; // Reset the border color
    }

    if (validatePassword(userPasswordInput.value)) {
        document.getElementById("passwordError").textContent = "Password must be complex.";
        userPasswordInput.style.border = "2px solid red";
        return;
    } else {
        userPasswordInput.style.borderColor = ""; // Reset the border color
    }

    if (userPasswordInput.value !== userConfirmPasswordInput.value) {
        document.getElementById("confirmpasswordError").textContent = "Passwords do not match.";
        userConfirmPasswordInput.style.border = "2px solid red";
        return;
    } else {
        userConfirmPasswordInput.style.borderColor = ""; // Reset the border color
    }

    if (!agreeCheckbox) {
        document.getElementById("trsv").style.color = "red";
        return;
    } else {
        document.getElementById("trsv").style.color = ""; // Reset the border color
    }
    if(userTypeInput == 0){
        document.getElementById("usertype").style.border = "2px solid red";
        document.getElementById("typelabel").textContent = "";
        document.getElementById("usertypeError").textContent = "Please select your type";
        return;
    }
    else{
        document.getElementById("usertype").style.border = ""; // Reset the border color
        document.getElementById("typelabel").textContent = "Select your type";
        document.getElementById("usertypeError").textContent = "";
    }
    // Register the user if all validations pass
    var existingUserData = JSON.parse(localStorage.getItem("userArray")) || [];
    for (var i = 0; i < existingUserData.length; i++) {
        if (userEmailInput.value === existingUserData[i].userEmail) {
            document.getElementById("emailError").textContent = "This email already exists.";
            userEmailInput.style.border = "2px solid red";
            return;
        }
    }
    users = JSON.parse(localStorage.getItem("userArray")) || []
    let UniqueId = genID()
    var userData = {
        userType: userTypeInput,
        userName: userNameInput.value,
        userEmail: userEmailInput.value,
        userPassword: userPasswordInput.value,
        id : UniqueId
    };
    existingUserData.push(userData);
    localStorage.setItem("userArray", JSON.stringify(existingUserData));
    if(userTypeInput == 'seller'){
        sellers[UniqueId] = {
            Name: userNameInput.value,
            Products:[],
        }
        debugger
        localStorage.setItem("sellers", JSON.stringify(sellers));
    }
    window.location.href = "login.html";
 
});
//generate id for user randomly
function genID(){
    var id = 0;
    do{
        var id = Math.floor(Math.random() * 10000)
    }while(users.find(user => user.id === id))
    return id;
}