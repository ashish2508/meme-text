import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "./header";
import { Providers } from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Memeify",
  description: "Edit the meme template and make them go viral",

  keywords: ["memes", "meme generator", "viral content", "funny", "social media"],
  authors: [{ name: "Ashish Jha" }],
  creator: "ashish2508",

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
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetBrainsMono.variable} antialiased`}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
