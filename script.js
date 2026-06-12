import { supabase } from "./supabase.js";

/* ================= STATE ================= */
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

  enterApp();
  loadProfile();
};

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
  panel.style.display = panel.style.display === "block" ? "none" : "block";

  if (panel.style.display === "block") {
    document.getElementById("profileNick").innerText =
      user?.user_metadata?.username || "User";
  }
};

/* ================= SAVE BIO ================= */
window.saveProfile = async function () {
  const bio = document.getElementById("bioInput").value;

  const { error } = await supabase
    .from("profiles")
    .update({ bio })
    .eq("id", user.id);

  if (error) return alert(error.message);

  alert("Saved!");
};

/* ================= LOAD PROFILE ================= */
async function loadProfile() {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.log(error);
    return;
  }

  document.getElementById("nick").innerText =
    user.user_metadata?.username || "User";

  document.getElementById("profileNick").innerText =
    user.user_metadata?.username || "User";

  document.getElementById("profileRole").innerText =
    data.role || "player";

  if (data.avatar) {
    document.getElementById("profileAvatar").src = data.avatar;
    document.getElementById("avatarBtn").style.backgroundImage =
      `url(${data.avatar})`;
    document.getElementById("avatarBtn").style.backgroundSize = "cover";
  }
}

/* ================= AVATAR UPLOAD ================= */
const avatarInput = document.getElementById("avatarInput");

if (avatarInput) {
  avatarInput.addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async function (e) {
      const img = e.target.result;

      // UI update
      document.getElementById("profileAvatar").src = img;
      document.getElementById("avatarBtn").style.backgroundImage = `url(${img})`;
      document.getElementById("avatarBtn").style.backgroundSize = "cover";

      // save to supabase
      await supabase
        .from("profiles")
        .update({ avatar: img })
        .eq("id", user.id);
    };

    reader.readAsDataURL(file);
  });
}

/* ================= AUTO LOGIN ================= */
async function checkSession() {
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    user = data.session.user;

    document.getElementById("login").style.display = "none";
    document.getElementById("app").style.display = "block";

    goHome();
    loadProfile();
  }
}

checkSession();