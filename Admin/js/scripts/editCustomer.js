$(document).ready(function () {
  checkId();
  $(".btn-submit").click(function () {
    submitForm();
  });

  let urlParams = new URLSearchParams(window.location.search);
  let sellers = JSON.parse(localStorage.getItem('sellers')) || [];

});

function submitForm() {
  let userName = $('#userName').val();
  let email = $('#email').val();
  let phone = $('#phone').val();
  let password = $('#password').val();
  let userType = $('#userRole').val();
  if (!validateName(userName)) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'First name must be between 3 and 14 characters!',
    })
  }
  else if (!validateEmail(email)) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please enter a valid email address!',
    })
  }
  else if (validatePassword(password)) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Password must be at least 6 characters!',
    })
  }
  else if (!validatePhone(phone)) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Please enter a valid phone number!',
    })
  }

  else {
    let urlParams = new URLSearchParams(window.location.search);
    let userId = urlParams.get('id');
    let userArray = JSON.parse(localStorage.getItem('userArray'));
    let currentUser = userArray.find(user => user.id == userId);

    let isUpdated = false;

    if (currentUser.userName != userName) {
      currentUser.userName = userName;
      isUpdated = true;
    }

    if (currentUser.userEmail != email) {
      currentUser.userEmail = email;
      isUpdated = true;
    }

    if (currentUser.phone != phone) {
      currentUser.phone = phone;
      isUpdated = true;
    }

    if (currentUser.userPassword != password) {
      currentUser.userPassword = password;
      isUpdated = true;
    }
    if (currentUser.userType != userType) {
      currentUser.userType = userType;
      isUpdated = true;
    }
    if (isUpdated) {
      let userIndex = userArray.findIndex(user => user.id === userId);
      userArray[userIndex] = currentUser;
      localStorage.setItem('userArray', JSON.stringify(userArray));
      addToSellerList(currentUser)
      Swal.fire({
        icon: 'success',
        title: 'Your profile has been updated!',
        showConfirmButton: false,
        timer: 1500
      })
    }
    else {
      Swal.fire({
        icon: 'info',
        title: 'Your profile has not been updated!',
        showConfirmButton: false,
        timer: 1500
      })
    }

  }
}

function validateName(name) {
  let nameRegex = /^[a-zA-Z]+\s[a-zA-Z]+$/;
  return nameRegex.test(name) && name.length > 7 && name.length < 20;
}
function validateEmail(email) {
  let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return /^(?=.\d)(?=.[!@#$%^&])(?=.[a-z])(?=.*[A-Z]).{8,}$/.test(password);
}
function validatePhone(phone) {

  let phoneRegex =  /^(010|011|012)[0-9]{8}$/;
  if (phone.length != 0)
    return phoneRegex.test(phone);
  return true;
}
function checkId() {

  let urlParams = new URLSearchParams(window.location.search);
  let userId = urlParams.get("id");
  let userArray = JSON.parse(localStorage.getItem("userArray"));
  let userObj = userArray.find((obj) => obj.id == userId);

  if (!userObj) {
    window.location.href = "customerList.html";
  }
  else if (userObj.userType == "Admin") {
    window.location.href = "profileAdmin.html";
  }
  else {
    $("#userName").val(userObj.userName);
    $("#phone").val(userObj.phone);
    $("#email").val(userObj.userEmail);
    $("#userRole").val(userObj.userType).trigger("change");
    $("#password").val(userObj.userPassword);
  }
}
function addToSellerList(seller) {
  let sellers = JSON.parse(localStorage.getItem('sellers')) || [];
  sellers[seller.id] = { Name: seller.userName, Products: [], Total_Sold: 0 };
  console.log(sellers);
  localStorage.setItem('sellers', JSON.stringify(sellers));
}
