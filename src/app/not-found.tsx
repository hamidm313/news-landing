import Link from "next/link";

// Top-level fallback for paths that never reach the [locale] layout.
export default function GlobalNotFound() {
  return (
    <html lang="fa" dir="rtl">
      <body
        style={{
          fontFamily: "Vazirmatn, Tahoma, system-ui, sans-serif",
          display: "grid",
          placeItems: "center",
          minHeight: "100vh",
          margin: 0,
          background: "#f4f5f3",
          color: "#123a27",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <h1 style={{ fontSize: 48, margin: 0 }}>۴۰۴</h1>
          <p>صفحه‌ای که دنبال آن بودید پیدا نشد.</p>
          <p style={{ opacity: 0.7 }}>The page you were looking for was not found.</p>
          <Link href="/fa" style={{ color: "#217046", fontWeight: 700 }}>
            صفحه نخست / Home
          </Link>
        </div>
      </body>
    </html>
  );
}
