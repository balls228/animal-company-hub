import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <nav>
          <a href="/">Home</a>
          <a href="/assets">Assets</a>
          <a href="/admin">Admin</a>
        </nav>
<<<<<<< HEAD
        <div className="container">{children}</div>
=======
        {children}
>>>>>>> e33f3d8761ba8e484b236a23f74b99ee8e66d365
      </body>
    </html>
  );
}