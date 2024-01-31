$(document).ready(function () {
  togglePassword();
  fillForm();
  $(".btn-submit").click(function () {
    submitForm();
  });
});

function togglePassword() {
  $('.toggle-password').on('click', function () {
    var passwordField = $('#passwordField');

    var fieldType = passwordField.attr('type') === 'password' ? 'text' : 'password';
    passwordField.attr('type', fieldType);
    $(this).toggleClass('fa-eye fa-eye-slash');
    $('.btn-submit').click(function () {
      submitForm();
    }
    );
  
  });

}
function fillForm() {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));

  const [firstName, lastName] = currentUser.userName.split(' ');
  $('#firstName').val(firstName);
  $('#lastName').val(lastName);
  $('#userName').val(currentUser.userName)
  $((`#email`)).val(currentUser.userEmail);
  $((`#phone`)).val(currentUser.phone);
  $((`#passwordField`)).val(currentUser.userPassword);
  $('#photo').attr('src', currentUser.userPhoto);
  $('#triggerFileInput').click(function () {
    $('#imgInp').click();
  });

}
function submitForm() {
  let fName = $('#firstName').val();
  let lName = $('#lastName').val();
  let userName = $('#userName').val();
  let email = $('#email').val();
  let phone = $('#phone').val();
  let password = $('#passwordField').val();
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
    else{
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
function validatePhone(phone) {
  var phoneRegex = /^\d{3}-\d{8}$/;
  return phoneRegex.test(phone);
}

