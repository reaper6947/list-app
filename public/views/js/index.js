if ( !localStorage.hasOwnProperty("user-name")) {
    window.location.href = "/login";
} else if (localStorage.hasOwnProperty("user-name")) {
    window.location.href = "/user/"+localStorage.getItem("user-name");
}