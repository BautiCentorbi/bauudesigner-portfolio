import type { Metadata } from "next";
import { Syne, Syne_Mono } from "next/font/google";
import "./globals.css";

const syneSans = Syne({
  subsets: ["latin"],
  variable: "--font-syne-sans",
  weight: ["400", "500", "600", "700"],
});

const syneMono = Syne_Mono({
  weight: ["400"],
  variable: "--font-syne-mono",
});

export const metadata: Metadata = {
  title: "My Portfolio - Bautista Centorbi",
  description: "This is my portfolio, built with Next.js, Typescript, TailwindCSS and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syneSans.variable} ${syneMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
