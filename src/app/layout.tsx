import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "NOCTURNE — A personal operating system",
  description:
    "An independent designer’s world. Explore work, collected moments, and notes after dark.",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
