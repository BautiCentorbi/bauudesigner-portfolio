import type { Metadata } from "next";
import { Darker_Grotesque, Syne, Inter } from "next/font/google";
import "./globals.css";
import NavBar from "./components/shared/NavBar";
import Footer from "./components/shared/Footer";
import { ScrollProvider } from "./providers/ScrollProvider";
import Script from "next/script";
import CookiesBanner from "./components/CookiesBanner";
import { Toaster } from "react-hot-toast";
import PageTransition from "./components/shared/PageTransition";

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
  title: "Bautista Centorbi — Diseñador Gráfico & Brand Designer",
  description:
    "Diseño de identidad visual, rebranding y desarrollo web para marcas que necesitan verse tan sólidas como son. Con base en Mendoza, Argentina.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="light" style={{ colorScheme: "light" }}>
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="theme-color" content="#ebebeb" />
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
        <PageTransition>{children}</PageTransition>
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
