import { supabase } from "./supabase.js";

/* ================= REGISTER ================= */
window.register = async function () {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password || !username) {
    alert("fill all fields");
    return;
  }

  const { data, error } = await supabase.auth.signUp({
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

  alert("Registered!");
};

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

  loadProfile();
};

/* ================= LOAD PROFILE ================= */
async function loadProfile() {
  document.getElementById("login").style.display = "none";
  document.getElementById("app").style.display = "block";

  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    console.log(error);
    return;
  }

  document.getElementById("nick").innerText = data.username;
  document.getElementById("role").innerText = data.role;
}