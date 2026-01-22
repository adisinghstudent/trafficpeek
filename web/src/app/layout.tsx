import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TrafficPeek - Website Traffic Stats at a Glance",
  description: "Free, open-source Chrome extension that shows estimated monthly visits and 30-day traffic graphs for any website you browse.",
  openGraph: {
    title: "TrafficPeek - Website Traffic Stats at a Glance",
    description: "Free, open-source Chrome extension that shows estimated monthly visits and 30-day traffic graphs for any website.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrafficPeek - Website Traffic Stats at a Glance",
    description: "Free, open-source Chrome extension that shows traffic stats for any website.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
