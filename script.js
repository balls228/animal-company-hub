import { supabase } from "./supabase.js";

console.log("SCRIPT LOADED");

/* =========================
   ADMIN CHECK (case-insensitive)
========================= */
function normalize(name) {
  return (name || "").trim().toLowerCase();
}

function isAdmin(username) {
  return normalize(username) === "bibzya";
}

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

  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  await supabase.from("profiles").insert({
    id: data.user.id,
    username
  });

  alert("Account created!");
};

/* =========================
   LOGIN
========================= */
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  enterApp();
};

/* =========================
   ENTER APP (HOME SCREEN)
========================= */
async function enterApp() {
  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { data } = await supabase
    .from("profiles")
    .select("username")
    .eq("id", user.id)
    .single();

  const username = data.username;

  document.getElementById("welcomeText").innerText =
    "Welcome " + username;

  // show/hide upload zone
  const dropZone = document.getElementById("dropZone");
  if (dropZone) {
    dropZone.style.display = isAdmin(username) ? "block" : "none";
  }

  loadAssets();
  showHome();
}

/* =========================
   NAVIGATION
========================= */
window.showHome = function () {
  document.getElementById("homePage").classList.remove("hidden");
  document.getElementById("assetsPage").classList.add("hidden");
};

window.showAssets = function () {
  document.getElementById("homePage").classList.add("hidden");
  document.getElementById("assetsPage").classList.remove("hidden");
};

/* =========================
   LOGOUT
========================= */
window.logout = async function () {
  await supabase.auth.signOut();
  location.reload();
};

/* =========================
   DRAG & DROP UPLOAD (ONLY ADMIN)
========================= */
const dropZone = document.getElementById("dropZone");
const fileInput = document.getElementById("fileInput");

if (dropZone) {
  dropZone.addEventListener("click", () => fileInput.click());

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.style.background = "rgba(58,91,255,0.2)";
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.style.background = "transparent";
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    uploadFile(file);
  });

  fileInput.addEventListener("change", (e) => {
    uploadFile(e.target.files[0]);
  });
}

/* =========================
   UPLOAD FILE TO SUPABASE
========================= */
async function uploadFile(file) {
  if (!file) return;

  const fileName = `${Date.now()}_${file.name}`;

  const { error } = await supabase.storage
    .from("assets")
    .upload(fileName, file);

  if (error) {
    alert(error.message);
    return;
  }

  const { data } = supabase.storage
    .from("assets")
    .getPublicUrl(fileName);

  await supabase.from("assets").insert({
    url: data.publicUrl,
    owner: "bibzya"
  });

  loadAssets();
}

/* =========================
   LOAD ASSETS
========================= */
async function loadAssets() {
  const { data } = await supabase
    .from("assets")
    .select("*")
    .order("id", { ascending: false });

  const list = document.getElementById("assetsList");
  if (!list) return;

  list.innerHTML = "";

  data.forEach((a) => {
    list.innerHTML += `
      <div class="asset">
        <img src="${a.url}" />
      </div>
    `;
  });
}