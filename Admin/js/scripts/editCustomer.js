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
  //    fetch the id from the url then get the user obj from userArray
  let userId = window.location.search.split("=")[1];
  let userArray = JSON.parse(localStorage.getItem("userArray"));
  let userObj = userArray.find((obj) => obj.id == userId);
  if (!userObj) {
    window.location.href = "customerList.html";
  }
  // else if (userObj.userType === "Admin") {
  //   // window.location.href = "profileAdmin.html";
  // }
  else {
    $("#userName").val(userObj.userName);
    $("#phone").val(userObj.phone);
    $("#email").val(userObj.userEmail);
    $("#userRole").val(userObj.userType).trigger("change");
    $("#password").val(userObj.userPassword);
  }


});

function submitForm() {
    let userName = $('#userName').val();
    let email = $('#email').val();
    let phone = $('#phone').val();
    let password = $('#password').val();
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
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));

      let isUpdated = false;

      if (currentUser.userName !== userName) {
        currentUser.userName = userName;
        isUpdated = true;
      }

      if (currentUser.userEmail !== email) {
        currentUser.userEmail = email;
        isUpdated = true;
      }

      if (currentUser.phone !== phone) {
        currentUser.phone = phone;
        isUpdated = true;
      }

      if (currentUser.userPassword !== password) {
        currentUser.userPassword = password;
        isUpdated = true;
      }

      if (isUpdated) {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        window.reload();
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
    var nameRegex = /^[^\s]+\s[^\s]+$/;
    return nameRegex.test(name) && name.length > 7 && name.length < 20;
  }
  function validateEmail(email) {
    var emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(email);
  }

  function validatePassword(password) {
    return password.length >= 6; // You can adjust the minimum length
  }
  function validatePhone() {
    var phoneRegex = /^\d{11}$/;
    return phoneRegex.test(phone);
  }
