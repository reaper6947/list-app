var btn = document.getElementById("change-btn");


if (
  localStorage.hasOwnProperty("user-name") &&
  localStorage.getItem("user-name") != null
) {
  let h = document.getElementById("h-username");
  h.innerHTML =
    "your current username is " + " " +
    localStorage.getItem("user-name") +
    ". now go to home page.";
    btn.style.display = "none";
    btn.disabled = true;
  console.log("nofunc");
  //  btn.style.display = "none";
} else {
  console.log("elsed")
  
}


async function checkUser(e) {
  if (e) {
    e.preventDefault();
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

  /*
   function userExists(elementId) {
    let element = document.getElementById(elementId).value.trim();
    fetch(`/exists/${element}`)
      .then((resp) => {
        return resp.text();
      })
      .then((data) => {
        console.log(data);
        return data;
      });
  }
*/
  var id = "input";
  const inputVal = document.getElementById(id).value.trim();

  if (validUser(id)) {
    let element = document.getElementById(id).value.trim();
    let resp = await fetch(`/exists/${element}`);
    let respData = await resp.json();
    console.log(respData);
    console.log("cont");

    if (respData) {
      document.getElementById(id).setCustomValidity("username taken");
      document.getElementById(id).reportValidity();
      console.log("exists");
      return false;
    } else {
      document.getElementById(id).setCustomValidity("");
      document.getElementById(id).reportValidity();
        document.getElementById("loginForm").submit();
      localStorage.setItem("user-name", inputVal);
      let h = document.getElementById("h-username");
      h.innerHTML = "your username is now " + " " + localStorage.getItem("user-name");
      document.getElementById("loginForm").submit();
      return true;
    }
  } else if (!validUser(id)) {
    document
      .getElementById(id)
      .setCustomValidity("invalid username ,try again");
    document.getElementById(id).reportValidity();
    return false;
  }
}


