const navName = document.getElementById("nav-username");


if ( !localStorage.hasOwnProperty("user-name") && localStorage.getItem("user-name") == null ) {
    window.location.href = "/login";
} else if (localStorage.hasOwnProperty("user-name") && localStorage.getItem("user-name") != null) {
  navName.innerText = localStorage.getItem("user-name");
}
  


const validInput = function () {
  const id = "inputTitle"
  let userId = document.getElementById(id).value.trim();
  if (
    userId === null ||
    userId === "undefined" ||
    userId === "null" ||
    userId.length > 20 ||
    userId.length < 2
  ) {
    return false;
  } else {
    return true;
  }
};



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




