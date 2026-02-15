import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "領収書読み取り",
  description: "領収書画像から日付・店舗名・金額を抽出するアプリ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
