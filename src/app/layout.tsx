import type { Metadata } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/700.css";
import "@fontsource/jetbrains-mono/400.css"; 
import "./globals.css";
import { Header } from "./header";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next"
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Memeify",
  description: "Edit the meme template and make them go viral",

  keywords: ["memes", "meme generator", "viral content", "funny", "social media"],
  authors: [{ name: "Ashish Jha" }],
  creator: "ashish2508",
  verification: {
    google: "G5VMZqBY1HP3_SiNH9vBiF1IkHQBEHO5wTX96KFUZMo",
  },
  openGraph: {
    title: "Memeify - Create Viral Memes",
    description: "Edit the meme template and make them go viral",
    url: "https://memeify.ashishjha.tech",
    siteName: "Memeify",
    images: [
      {
        url: "https://memeify.ashishjha.tech/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Memeify - Meme Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Memeify - Create Viral Memes",
    description: "Edit the meme template and make them go viral",
    images: ["https://memeify.ashishjha.tech/assets/twitter-image.png"],
    creator: "@an_axsh",
    site: "@an_axsh",
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

  applicationName: "Memeify",
  referrer: "origin-when-cross-origin",

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body className="font-sans antialiased">
        <Providers>
          <Header />
          {children}
          <Analytics />
        </Providers>
        <SiteFooter />
      </body>
    </html>
  );
}
