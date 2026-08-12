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
import StructuredData from "./components/shared/StructuredData";

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

const SITE_URL = "https://bcentorbi.com";
const SITE_TITLE =
  "Bautista Centorbi — Diseñador Gráfico y Desarrollador Web en Mendoza";
const SITE_DESCRIPTION =
  "Diseñador gráfico y desarrollador web en Mendoza, Argentina. Identidad visual, branding, rebranding y desarrollo de sitios web para marcas y emprendimientos en Argentina, Chile, Uruguay, Estados Unidos y Europa. Graphic designer & web developer based in Mendoza, available for international clients.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: "%s | Bautista Centorbi",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "diseñador gráfico Mendoza",
    "desarrollador web Mendoza",
    "diseño de marca Mendoza",
    "branding Mendoza Argentina",
    "diseño web Mendoza",
    "graphic designer Mendoza Argentina",
    "web developer Mendoza Argentina",
    "freelance graphic designer Argentina",
    "freelance web developer Argentina",
    "brand designer Latin America",
    "Bautista Centorbi",
    "Infinite Graphics",
  ],
  authors: [{ name: "Bautista Centorbi", url: SITE_URL }],
  creator: "Bautista Centorbi",
  publisher: "Bautista Centorbi",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: SITE_URL,
    siteName: "Bautista Centorbi — Infinite Graphics",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
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
        <StructuredData />
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
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-5WP0TX0MEE"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5WP0TX0MEE');
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
