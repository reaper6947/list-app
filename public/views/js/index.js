if ( !localStorage.hasOwnProperty("user-name")) {
    window.location.href = "/login";
} else if (localStorage.hasOwnProperty("user-name")) {
    window.location.href = "/"+localStorage.getItem("user-name");
}