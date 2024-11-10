import { Toaster } from "@/components/ui/toaster";
import { montserrat } from '@/fonts';
import type { Metadata } from 'next';
import Script from "next/script";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Islamic Centre Management System",
  description: "Streamline Your Masjid Management with Our Comprehensive System",
  keywords: ['mosque', 'management', 'Islamic', 'islam', 'muslim', 'community', 'prayer', 'schedule', 'event', 'donation', 'volunteer', 'news', 'information'],
  authors: [{ name: 'Adhham Safwan', url: 'https://adhham.me' }],
  creator: 'Adhham Safwan',
  publisher: 'Adhham Safwan',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={montserrat.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        {children}
        <Toaster />
        <Script src="/fullscreen.js"></Script>
      </body>
    </html>
  );
}
