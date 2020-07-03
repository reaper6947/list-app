console.log("workings");
const navName = document.getElementById("nav-username");
const checkboxDelete = document.getElementById("inputDelete");
const listAuthor = document.getElementById("listAuthor");
const labelDelete = document.getElementById("labelDelete");
if (!localStorage.hasOwnProperty("user-name")) {
  console.log("not logged in");

  //window.location.href = "/login";
} else if (localStorage.getItem("user-name") != listAuthor.value) {
  labelDelete.style.display = "none";
}

if (localStorage.hasOwnProperty("user-name")) {
  navName.innerText = localStorage.getItem("user-name");
}


if (localStorage.hasOwnProperty("itemDelete")) {
  let items = document.getElementsByClassName("inputItemDelete");
  if (localStorage.getItem("itemDelete") == "checked") {
    checkboxDelete.checked = true;
    for (i = 0; i < items.length; i++) {
      items[i].disabled = false;
    }
  } else if (!localStorage.getItem("itemDelete") == "notchecked") {
    checkboxDelete.checked = false;
    for (i = 0; i < items.length; i++) {
      items[i].disabled = true;
    }
  }
} else {
  console.log("elsed");
}

checkboxDelete.addEventListener("change", function (deletebox) {
  let items = document.getElementsByClassName("inputItemDelete");

  if (deletebox.target.checked) {
    localStorage.setItem("itemDelete", "checked");
    for (i = 0; i < items.length; i++) {
      items[i].disabled = false;
    }
  } else if (!deletebox.target.checked) {
    localStorage.setItem("itemDelete", "notchecked");
    for (i = 0; i < items.length; i++) {
      items[i].disabled = true;
    }
  }
});
