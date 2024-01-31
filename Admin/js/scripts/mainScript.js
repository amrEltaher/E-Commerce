import{initUserManagement, redirect} from "./Credientials.js"
export {redirect}
$(document).ready(function () {
  initUserManagement();//check admin credientails
  $("#sidebar-toggle").click(function() {
    $(this).toggleClass("toggle-active");

    $("#sidebar").toggleClass("collapsed");

  });
  
  $('.logout').click(function(){
    
    localStorage.setItem("currentUser",JSON.stringify({}));
    window.location.href = "../login.html";
  })
  
  let currentUser = JSON.parse(localStorage.getItem("currentUser"));

  $(".profilesets").html(
    `<h6>${currentUser.userType}</h6><h6>${currentUser.userName}</h6>`
  );
  $(".sidebar-header").text(`Welocme ${currentUser.userName}`);
  }
);

