import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Food App",
  description: "A simple food app for customize plates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
