console.log("workings");
const navName = document.getElementById("nav-username");


if ( !localStorage.hasOwnProperty("user-name") && localStorage.getItem("user-name") == null ) {
    window.location.href = "/login";
} else if (localStorage.hasOwnProperty("user-name") && localStorage.getItem("user-name") != null) {
  navName.innerText = localStorage.getItem("user-name");
}
  


const showEdit = function (checkbox) {
  let items = document.getElementsByClassName("inputItemDelete");

  if (checkbox.checked) {
    for ( i = 0; i < items.length; i++){
      items[i].disabled = false;
    }
  } else {
    //let items = document.getElementsByClassName("inputItemDelete");
    for ( i = 0; i < items.length; i++){
      items[i].disabled = true ;
    }
  }
}





 


