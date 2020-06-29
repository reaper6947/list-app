console.log("workings");
if ( localStorage.getItem("user-name") == undefined || localStorage.getItem("user-name") == null ) {
    window.location.href = "/login";
  }
else {
    let loggedUser = document.getElementById("nav-brand");
    loggedUser.innerText = `${localStorage.getItem("user-name")}`;
}

