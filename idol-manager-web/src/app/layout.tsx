import "../styles/globals.css";
import "../styles/custom.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <header className="header">
          <h1>아이돌 매니저 게임 🎤</h1>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
