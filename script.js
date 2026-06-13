import { supabase } from "./supabase.js";

let user = null;

console.log("SCRIPT LOADED");

/* ================= LOGIN ================= */
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) return alert(error.message);

  user = data.user;

  await ensureProfile(user);
  await loadProfile();

  document.getElementById("login").style.display = "none";
  document.getElementById("sidebar").style.display = "block";
  document.getElementById("content").style.display = "block";

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

  if (error) return alert(error.message);

  alert("Account created!");
};

/* ================= GUEST ================= */
window.guestLogin = function () {
  user = {
    id: "guest",
    user_metadata: {
      username: "Guest"
    }
  };

  document.getElementById("login").style.display = "none";
  document.getElementById("sidebar").style.display = "block";
  document.getElementById("content").style.display = "block";

  loadProfile();
  goHome();
};

/* ================= PROFILE CREATE ================= */
async function ensureProfile(u) {
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", u.id)
    .single();

  if (!data) {
    await supabase.from("profiles").insert({
      id: u.id,
      username: u.user_metadata?.username || "User",
      bio: "",
      avatar: "",
      role: "player"
    });
  }
}

/* ================= LOAD PROFILE ================= */
async function loadProfile() {
  if (!user || user.id === "guest") {
    document.getElementById("profileNick").innerText = "Guest";
    document.getElementById("profileRole").innerText = "guest";
    return;
  }

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!data) return;

  document.getElementById("profileNick").innerText = data.username;
  document.getElementById("profileRole").innerText = data.role;
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

/* ================= LOGOUT ================= */
window.logout = async function () {
  await supabase.auth.signOut();

  user = null;

  document.getElementById("login").style.display = "block";
  document.getElementById("sidebar").style.display = "none";
  document.getElementById("content").style.display = "none";
};

/* ================= INIT ================= */
async function init() {
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    user = data.session.user;

    await ensureProfile(user);
    await loadProfile();

    document.getElementById("login").style.display = "none";
    document.getElementById("sidebar").style.display = "block";
    document.getElementById("content").style.display = "block";

    goHome();
  }
}

init();