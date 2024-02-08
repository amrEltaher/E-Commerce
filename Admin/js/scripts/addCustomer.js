import { User } from "../../Modal.js";

$(document).ready(function () {
  $(".btn-submit").click(function () {
    submitForm();
  });
  $('#dropdownList .dropdown-item').click(function (e) {
    var selectedText = $(this).text();
    $('#dropdownMenuButton').text(selectedText);
  });

});

function submitForm() {
  let userName = $('#userName').val();
  let email = $('#email').val();
  let phone = $('#phone').val();
  let password = $('#password').val();
  let userType = $('#dropdownMenuButton').text();

  if (!validateName(userName)) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'First name must be between 3 and 14 characters!',
    })
  }
  else if (!validateEmail(email) | checkEmail(email)) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Email is not valid or repeated!',
    })
  }
  else if (validatePassword(password)) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Password must be at least 8 characters & complex!',
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
    let userArray = JSON.parse(localStorage.getItem('userArray'));
    let currentUser = new User(userType, userName, email, password, genId(), userType);
    currentUser.phone = phone;
    userArray.push(currentUser);

    localStorage.setItem('userArray', JSON.stringify(userArray));
    Swal.fire({
      icon: 'success',
      title: 'Done',
      text: 'Customer added successfully!',
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "customerList.html";
      }
    })
    if (currentUser.userType == "Seller") {
      addToSellerList(currentUser);
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
function genId() {
  return Math.floor(Math.random() * 1000000000);
}
function checkEmail(email) {
  let userArray = JSON.parse(localStorage.getItem('userArray'));
  let user = userArray.find(user => user.userEmail === email);
  if (user) {
    return true;
  }
  return false;
}
function addToSellerList(seller) {
  console.log(seller);
  let sellers = JSON.parse(localStorage.getItem('sellers')) || [];
  sellers[seller.id] = { Name: seller.userName, Products: [], Total_Sold: 0 };
  localStorage.setItem('sellers', JSON.stringify(sellers));
}
