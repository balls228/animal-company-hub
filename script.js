import { supabase } from "./supabase.js";

let user = null;

/* ================= LOGIN ================= */
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  user = data.user;

  document.getElementById("login").style.display = "none";
  document.getElementById("sidebar").style.display = "flex";

  goHome();
};

/* ================= REGISTER ================= */
window.register = async function () {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username }
    }
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Account created!");
};

/* ================= NAV ================= */
window.goHome = function () {
  document.getElementById("home").style.display = "block";
  document.getElementById("assets").style.display = "none";
};

window.goAssets = function () {
  document.getElementById("home").style.display = "none";
  document.getElementById("assets").style.display = "block";
};

/* ================= PROFILE ================= */
window.toggleProfile = function () {
  alert("Profile menu");
};

/* ================= LOGOUT ================= */
window.logout = async function () {
  await supabase.auth.signOut();

  user = null;

  document.getElementById("login").style.display = "block";
  document.getElementById("sidebar").style.display = "none";
};