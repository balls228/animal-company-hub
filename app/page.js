"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [user, setUser] = useState("");

  useEffect(() => {
    setUser(localStorage.getItem("user") || "");
  }, []);

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
    <div className="card">
      <h1>🎮 Animal Company Hub</h1>

      {!user ? (
        <>
          <input id="name" placeholder="username" />
          <button onClick={login}>Login</button>
        </>
      ) : (
        <>
          <h3>Welcome {user}</h3>
          <button onClick={logout}>Logout</button>
        </>
      )}
    </div>
  );
}