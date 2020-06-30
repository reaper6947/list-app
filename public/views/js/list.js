console.log("workings");

if ( localStorage.getItem("user-name") == undefined || localStorage.getItem("user-name") == null ) {
    window.location.href = "/login";
  }


if (document.getElementById("edit-btn").getAttribute("signedIn") != "signed") {
    let loggedUser = document.getElementById("nav-username");
    loggedUser.innerText = `${localStorage.getItem("user-name")}`;
    let edit = document.getElementById("edit-btn");
    edit.setAttribute("value", `${localStorage.getItem("user-name")}`);
}

