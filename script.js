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

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) return alert(error.message);

  user = data.user;

  await ensureProfile(user);
  await loadProfile();

  enterApp();
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
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!data) return;

  document.getElementById("profileNick").innerText = data.username;
  document.getElementById("profileRole").innerText = data.role;
  document.getElementById("bioInput").value = data.bio || "";

  if (data.avatar) {
    document.getElementById("profileAvatar").src = data.avatar;
    document.getElementById("avatarBtn").style.backgroundImage =
      `url(${data.avatar})`;
    document.getElementById("avatarBtn").style.backgroundSize = "cover";
  }

  if (data.role === "admin") {
    document.getElementById("adminPanel").style.display = "block";
  }
}

/* ================= ENTER APP ================= */
function enterApp() {
  document.getElementById("login").style.display = "none";
  document.getElementById("sidebar").style.display = "flex";

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

/* ================= PROFILE TOGGLE ================= */
window.toggleProfile = function () {
  const p = document.getElementById("profilePanel");
  p.style.display = p.style.display === "block" ? "none" : "block";
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

/* ================= AVATAR ================= */
const avatarInput = document.getElementById("avatarInput");

if (avatarInput) {
  avatarInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async function (e) {
      const img = e.target.result;

      document.getElementById("profileAvatar").src = img;
      document.getElementById("avatarBtn").style.backgroundImage =
        `url(${img})`;

      await supabase
        .from("profiles")
        .update({ avatar: img })
        .eq("id", user.id);
    };

    reader.readAsDataURL(file);
  });
}

/* ================= ADMIN PANEL ================= */
window.giveRole = async function () {
  const username = document.getElementById("targetUser").value;
  const role = document.getElementById("roleSelect").value;

  const { error } = await supabase
    .from("profiles")
    .update({ role })
    .eq("username", username);

  if (error) return alert(error.message);

  alert("Role updated!");
};

/* ================= LOGOUT ================= */
window.logout = async function () {
  await supabase.auth.signOut();

  user = null;

  document.getElementById("login").style.display = "block";
  document.getElementById("sidebar").style.display = "none";
  document.getElementById("adminPanel").style.display = "none";
};

/* ================= SESSION ================= */
async function init() {
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    user = data.session.user;

    await ensureProfile(user);
    await loadProfile();

    document.getElementById("login").style.display = "none";
    document.getElementById("sidebar").style.display = "flex";

    goHome();
  }
}

init();