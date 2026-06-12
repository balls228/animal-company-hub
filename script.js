import { supabase } from "./supabase.js";

/* ======================
   REGISTER
====================== */
window.register = async function () {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const usernameLower = username.trim().toLowerCase();

  // 🔍 проверка
  const { data: exists } = await supabase
    .from("profiles")
    .select("id")
    .eq("username_lower", usernameLower)
    .single();

  if (exists) {
    alert("Username already taken");
    return;
  }

  // 🔐 создаём аккаунт
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: username
      }
    }
  });

  if (error) return alert(error.message);

  // 👤 создаём профиль
  await supabase.from("profiles").insert({
    id: data.user.id,
    username: username,
    username_lower: usernameLower,
    role: "player"
  });

  alert("Account created!");
};

/* ======================
   LOGIN
====================== */
window.login = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) return alert(error.message);

  enterApp();
};

/* ======================
   ENTER APP
====================== */
async function enterApp() {
  document.getElementById("loginScreen").classList.add("hidden");
  document.getElementById("app").classList.remove("hidden");

  const { data: { user } } = await supabase.auth.getUser();

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  document.getElementById("welcomeText").innerText =
    "Welcome " + data.username;

  document.getElementById("role").innerText =
    "Role: " + data.role;
}