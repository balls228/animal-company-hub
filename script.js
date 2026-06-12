window.login = async function () {
document.getElementById("login").style.display = "none";
document.getElementById("sidebar").style.display = "flex";
document.getElementById("content").style.display = "block";
};

window.register = async function () {
alert("Register button works");
};

window.goHome = function () {
document.getElementById("home").style.display = "block";
document.getElementById("assets").style.display = "none";
};

window.goAssets = function () {
document.getElementById("home").style.display = "none";
document.getElementById("assets").style.display = "block";
};

window.toggleProfile = function () {
alert("Profile menu not created yet");
};

window.logout = function () {
document.getElementById("login").style.display = "flex";
document.getElementById("sidebar").style.display = "none";
document.getElementById("content").style.display = "none";
};

document.getElementById("sidebar").style.display = "none";
document.getElementById("content").style.display = "none";
