import { supabase } from "./supabase.js";

/* =========================
   STATE
========================= */
let currentUser = null;
let profile = null;
let profileOpen = false;

/* =========================
   REGISTER
========================= */
window.register = async function () {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!username || !email || !password) {
    alert("Fill all fields");
    return;
  }

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

/* =========================
   LOGIN
========================= */
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

  currentUser = data.user;
  await loadProfile();
  enterApp();
};

/* =========================
   LOAD PROFILE
========================= */
async function loadProfile() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", currentUser.id)
    .single();

  if (error) {
    console.log(error);
    return;
  }

  profile = data;

  document.getElementById("nick").innerText = profile.username;
  document.getElementById("avatarBtn").style.background = "white";
}

/* =========================
   ENTER APP
========================= */
function enterApp() {
  document.getElementById("login").style.display = "none";
  document.getElementById("app").style.display = "block";

  goHome();
}

/* =========================
   NAVIGATION
========================= */
window.goHome = function () {
  document.getElementById("home").style.display = "block";
  document.getElementById("assets").style.display = "none";
};

window.goAssets = function () {
  document.getElementById("home").style.display = "none";
  document.getElementById("assets").style.display = "block";
};

/* =========================
   PROFILE PANEL
========================= */
window.toggleProfile = function () {
  profileOpen = !profileOpen;
  document.getElementById("profilePanel").style.display =
    profileOpen ? "block" : "none";

  if (profileOpen && profile) {
    document.getElementById("bioInput").value = profile.bio || "";
  }
};

/* =========================
   SAVE PROFILE
========================= */
window.saveProfile = async function () {
  const bio = document.getElementById("bioInput").value;

  const { error } = await supabase
    .from("profiles")
    .update({
      bio: bio
    })
    .eq("id", currentUser.id);

  if (error) {
    alert(error.message);
    return;
  }

  alert("Saved!");

  profile.bio = bio;
};

/* =========================
   AUTO CHECK SESSION
========================= */
async function checkUser() {
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    currentUser = data.user;
    await loadProfile();
    enterApp();
  }
}

checkUser();