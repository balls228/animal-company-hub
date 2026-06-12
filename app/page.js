"use client";
<<<<<<< HEAD

import { useEffect, useState } from "react";
=======
import { useState } from "react";
>>>>>>> e33f3d8761ba8e484b236a23f74b99ee8e66d365

export default function Home() {
  const [user, setUser] = useState("");

<<<<<<< HEAD
  useEffect(() => {
    setUser(localStorage.getItem("user") || "");
  }, []);

=======
>>>>>>> e33f3d8761ba8e484b236a23f74b99ee8e66d365
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
<<<<<<< HEAD
    <div className="card">
      <h1>🎮 Animal Company Hub</h1>
=======
    <div style={{ padding: 20 }}>
      <h1>Animal Company Hub</h1>
>>>>>>> e33f3d8761ba8e484b236a23f74b99ee8e66d365

      {!user ? (
        <>
          <input id="name" placeholder="username" />
          <button onClick={login}>Login</button>
        </>
      ) : (
        <>
<<<<<<< HEAD
          <h3>Welcome {user}</h3>
=======
          <h3>Logged as {user}</h3>
>>>>>>> e33f3d8761ba8e484b236a23f74b99ee8e66d365
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
}