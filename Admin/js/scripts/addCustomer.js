import {  User } from "../../Modal.js";

$(document).ready(function () {
  if ($(".select-role").length > 0) {
    $(".select-role").select2({
      minimumResultsForSearch: -1,
      width: "100%",
    });
    $(".btn-submit").click(function () {
      submitForm();
    });
  }

  

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
  else if (!validateEmail(email) | checkEmail(email)) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Email is not valid or repeated!',
    })
  }
  else if (!validatePassword(password)) {
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
    let userArray = JSON.parse(localStorage.getItem('userArray')); 
    let currentUser = new User();
    currentUser.userName = userName;
    currentUser.userEmail = email;
    currentUser.phone = phone;
    currentUser.userPassword = password;
    currentUser.userType = userType;
    currentUser.id =  genId();
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

   

  }
}

function validateName(name) {
  let nameRegex = /^[^\s]+\s[^\s]+$/;
  return nameRegex.test(name) && name.length > 7 && name.length < 20;
}
function validateEmail(email) {
  let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  return password.length >= 6; 
}
function validatePhone(phone) {

  let phoneRegex = /^\d{11}$/;
  if (phone.length != 0)
    return phoneRegex.test(phone);
  return true;
}
function  genId(){
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