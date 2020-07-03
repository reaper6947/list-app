var btn = document.getElementById("change-btn");

if ( window.history.replaceState ) {
  window.history.replaceState( null, null, window.location.href );
}

if (
  localStorage.hasOwnProperty("user-name")) {
  let h = document.getElementById("h-username");
  h.innerHTML =
    "your current username is " +
    " " +
    localStorage.getItem("user-name") +
    ". now go to home page.";
  btn.style.display = "none";
  btn.disabled = true;
  console.log("nofunc");
  window.location.href = "/user" + localStorage.getItem("user-name");
  //  btn.style.display = "none";
} else {
  console.log("elsed");
}

const userExists = async function (elemId) {
  let element = document.getElementById(elemId).value.trim();
  let resp = await fetch(`/exists/${element}`);
  let respData = await resp.json();
  console.log(respData);
  return respData
}

const validUser = function (id) {
  let userId = document.getElementById(id).value.trim();
  if (
    userId === null ||
    userId === "undefined" ||
    userId === "null" ||
    userId.length > 15 ||
    userId.length < 3
  ) {
    return false;
  } else {
    return true;
  }
};


const checkUser = async function (e) {
  if (e) {
    e.preventDefault();
  }

  var id = "input";
  const inputVal = document.getElementById(id).value.trim();
  let resp = await userExists(id);
  if (validUser(id)) {

    if (resp) {
      document.getElementById(id).setCustomValidity("username taken");
      document.getElementById(id).reportValidity();
      console.log("exists");
     // return false;
    } else if(!resp){
      document.getElementById(id).setCustomValidity("");
      document.getElementById(id).reportValidity();
      document.getElementById("loginForm").submit();
      localStorage.setItem("user-name", inputVal);
      let h = document.getElementById("h-username");
      h.innerHTML =
        "your username is now " + " " + localStorage.getItem("user-name");
      document.getElementById("loginForm").submit();
      document.getElementById(id).disabled = true;

    //  return true;
    }
  } else if (!validUser(id)) {
    document
      .getElementById(id)
      .setCustomValidity("invalid username ,try again");
    document.getElementById(id).reportValidity();
   // return false;
  }
}
