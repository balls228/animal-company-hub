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
        <div className="container">{children}</div>
      </body>
    </html>
  );
}