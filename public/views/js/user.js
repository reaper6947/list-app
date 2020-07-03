const navName = document.getElementById("nav-username");
const checkboxDelete = document.getElementById("inputDelete");
const hiddenAuthor = document.getElementById("hiddenAuthor");
const listAuthor = document.getElementById("listAuthor");

if ( !localStorage.hasOwnProperty("user-name") && localStorage.getItem("user-name") == null ) {
    window.location.href = "/login";
} else if (localStorage.hasOwnProperty("user-name")) {
  if (localStorage.getItem("user-name") == listAuthor.value) {
    navName.innerText = localStorage.getItem("user-name");
    hiddenAuthor.value = localStorage.getItem("user-name");  
  }
  else {

    window.location.href = "/user/"+ localStorage.getItem("user-name");
  }
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



if (localStorage.hasOwnProperty("listDelete")) {
  
  let items = document.getElementsByClassName("inputItemDelete");
  
  if (localStorage.getItem("listDelete") == "checked") {
  
    checkboxDelete.checked = true;
    for (i = 0; i < items.length; i++){
      items[i].disabled = false;
    }
  } else if (!localStorage.getItem("listDelete") == "notchecked") {
   
    checkboxDelete.checked = false;
    for ( i = 0; i < items.length; i++){
      items[i].disabled = true;
    }
  }

} else {
  console.log("elsed");
}



checkboxDelete.addEventListener("change", function(deletebox) {
  let items = document.getElementsByClassName("inputItemDelete");
  
  if (deletebox.target.checked) {
    localStorage.setItem("listDelete", "checked");
    for ( i = 0; i < items.length; i++){
      items[i].disabled = false;
    }
  } else if(!deletebox.target.checked){
    localStorage.setItem("listDelete", "notchecked");
    for ( i = 0; i < items.length; i++){
      items[i].disabled = true ;
    }
  }

})









