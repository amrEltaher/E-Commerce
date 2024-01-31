import{initUserManagement, redirect} from "./Credientials.js"
export {redirect}
$(document).ready(function () {
  initUserManagement();//check admin credientails
  $("#sidebar-toggle").click(function() {
    $(this).toggleClass("toggle-active");

    $("#sidebar").toggleClass("collapsed");

  });
  
  
  
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  // change the content of the profile settings to two elements of h6 using jqeury
  $(".profilesets").html(
    `<h6>${currentUser.userType}</h6><h6>${currentUser.userName}</h6>`
  );
  $(".sidebar-header").text(`Welocme ${currentUser.userName}`);
  }
);

