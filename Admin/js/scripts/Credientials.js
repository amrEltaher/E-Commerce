
import { Admin } from "../../Modal.js";

let initUserManagement = ()=> {
  //handling localStorage
  let userArrayData = localStorage.getItem("userArray");
  let userArray = userArrayData ? JSON.parse(userArrayData) : [];

  let currentUserData = localStorage.getItem("currentUser");
  let currentUser = currentUserData ? JSON.parse(currentUserData) : null;

  //validate admin credentials
  validateUserCredentials(currentUser, userArray);
}

export { initUserManagement, redirect };
//redirect to another page
function redirect(page) {
  window.location.replace(page);
}
//validate user credentials
function validateUserCredentials(currentUser, userArray) {
  if (!currentUser) {
    redirect("../login.html");
  } else if (currentUser.userType !== "Admin") {
    ensureAdminUserExists(userArray, currentUser);
    redirect("ErrorPage.html");
  }
}
//create admin user if not exist in local storage
function ensureAdminUserExists(userArray, currentUser) {
  if (!userArray) {
    localStorage.setItem("userArray", JSON.stringify([currentUser]));
  }
  if (!isAdminExist(userArray)) {
    let admin = new Admin("Admin", "Ebrhim Dawoud", "hema@example.com", "123456", "1998", "01111111111", "Cairo", "img/profile.jpg");
    userArray.push(admin.getAdminProperties());
    localStorage.setItem("userArray", JSON.stringify(userArray));
  }
}
//check if admin user exist in local storage or not
function isAdminExist(userArray) {
  console.log(userArray);
  return userArray.some(user => user.userType === "Admin");
}
