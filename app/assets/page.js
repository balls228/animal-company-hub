"use client";
<<<<<<< HEAD

import { useEffect, useState } from "react";

export default function Assets() {
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    setAssets(JSON.parse(localStorage.getItem("assets") || "[]"));
  }, []);

  return (
    <div className="card">
      <h1>📦 Assets</h1>

      {assets.length === 0 && <p>No assets yet</p>}

      <div>
        {assets.map((img, i) => (
          <img key={i} src={img} width="200" />
        ))}
      </div>
=======
import { useState } from "react";

export default function Home() {
  const [user, setUser] = useState("");

  function login() {
    const name = document.getElementById("name").value;
    localStorage.setItem("user", name);
    setUser(name);
  }

  function logout() {
    localStorage.removeItem("user");
    setUser("");
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Animal Company Hub</h1>

      {!user ? (
        <>
          <input id="name" placeholder="username" />
          <button onClick={login}>Login</button>
        </>
      ) : (
        <>
          <h3>Logged as {user}</h3>
          <button onClick={logout}>Logout</button>
        </>
      )}
>>>>>>> e33f3d8761ba8e484b236a23f74b99ee8e66d365
    </div>
  );
}