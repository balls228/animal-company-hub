import { supabase } from "./supabase.js";

let user = null;

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

  if (error) return alert(error.message);

  alert("Account created!");
};

/* ================= LOGIN ================= */
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const remember = document.getElementById("rememberMe").checked;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) return alert(error.message);

  user = data.user;

  // 🔥 Remember me logic
  if (!remember) {
    sessionStorage.setItem("logout", "1");
  }

  enterApp();
};

/* ================= AUTO SESSION ================= */
async function checkSession() {
  const logoutFlag = sessionStorage.getItem("logout");

  if (logoutFlag === "1") {
    await supabase.auth.signOut();
    sessionStorage.removeItem("logout");
    return;
  }

  const { data } = await supabase.auth.getSession();

  if (data.session) {
    user = data.session.user;
    enterApp();
  }
}

checkSession();

/* ================= ENTER APP ================= */
function enterApp() {
  document.getElementById("login").style.display = "none";
  document.getElementById("app").style.display = "block";

  goHome();
}

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
  const panel = document.getElementById("profilePanel");

  panel.style.display =
    panel.style.display === "block" ? "none" : "block";
};

/* ================= SAVE BIO ================= */
window.saveProfile = async function () {
  const bio = document.getElementById("bioInput").value;

  await supabase
    .from("profiles")
    .update({ bio })
    .eq("id", user.id);

  alert("Saved!");
};