import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import Script from "next/script";
import "./globals.css";
import {
  OrganizationStructuredData,
  PersonStructuredData,
  SoftwareApplicationStructuredData,
  WebSiteStructuredData,
} from "./components/StructuredData";
import { ThemeProvider } from "./components/ThemeProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://mujaaco.com"),
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/img/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/img/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/img/favicon.ico",
    apple: "/img/apple-touch-icon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = (await headers()).get("x-locale") ?? "en";
  const lang = locale === "ar" ? "ar" : locale === "fr" ? "fr" : "en";
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={lang} dir={dir} suppressHydrationWarning>
      <head>
        <PersonStructuredData />
        <SoftwareApplicationStructuredData />
        <OrganizationStructuredData />
        <WebSiteStructuredData />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="mujaaco.com RSS Feed"
          href="/feed.xml"
        />
        <link
          rel="alternate"
          type="application/atom+xml"
          title="mujaaco.com Atom Feed"
          href="/atom.xml"
        />
        <link
          rel="alternate"
          type="text/plain"
          title="LLMs.txt — Context for AI systems"
          href="/llms.txt"
        />
        <link
          rel="alternate"
          type="text/plain"
          title="Full content for AI indexing"
          href="/llms-full.txt"
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MDTS748Z"
            title="Google Tag Manager"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ThemeProvider>{children}</ThemeProvider>
        <Script
          id="gtm-init"
          strategy="afterInteractive"
        >{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MDTS748Z');`}</Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JPRYP7ED57"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-JPRYP7ED57');`}
        </Script>
      </body>
    </html>
  );
}
