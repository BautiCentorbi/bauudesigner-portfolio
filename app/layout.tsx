import type { Metadata } from "next";
import { Darker_Grotesque, Syne, Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/ui/NavBar";
import Footer from "./components/ui/Footer";
import { ScrollProvider } from "./providers/ScrollProvider";
import Script from "next/script";
import CookiesBanner from "./components/CookiesBanner";
import { Toaster } from "react-hot-toast";

const darkerGrotesque = Darker_Grotesque({
  subsets: ["latin"],
  variable: "--font-darker-grotesque",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const syneSans = Syne({
  subsets: ["latin"],
  variable: "--font-syne-sans",
  weight: ["400", "500", "600", "700"],
});

const interSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter-sans",
  weight: ["400", "500", "600", "700"],
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
      <head>
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              functionality_storage: 'denied',
              security_storage: 'denied'
            });
          `}
        </Script>
      </head>
      <body className={`${darkerGrotesque.className} ${syneSans.variable} ${interSans.variable} antialiased`}>
        <ScrollProvider>
        <NavBar />
        <CookiesBanner />
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              style: {
                background: "#22c55e",
                color: "#fff",
              },
            },
            error: {
              style: {
                background: "#dc2626",
                color: "#fff",
              },
            },
          }}
        />
        <Footer />
        </ScrollProvider>
      </body>
    </html>
  );
}
