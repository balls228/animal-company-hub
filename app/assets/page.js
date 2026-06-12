"use client";

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
    </div>
  );
}