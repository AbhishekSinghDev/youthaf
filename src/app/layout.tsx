import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { env } from "@/env";
import { Providers } from "../components/providers/providers";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "Youth AF",
    description:
      "No fluff. No overcomplications. Just solid CS learning. Master programming, algorithms, data structures, and computer science fundamentals.",
    url: "https://youth-af.com",
    logo: "https://youth-af.com/youthaf-1.png",
    sameAs: [
      "https://www.instagram.com/ayush.poddar/",
      "https://www.youtube.com/@YouthAf",
      "https://x.com/AyushPoddar2003",
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
        />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#000000" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={poppins.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
