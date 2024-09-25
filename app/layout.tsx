import { IdleTimerWrapper } from '@/components/IdleTimerWrapper';
import { montserrat } from '@/fonts';
import type { Metadata } from 'next';
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";



export const metadata: Metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Islamic Center Management System",
  description: "Streamline Your Masjid Management with Our Comprehensive System",
  keywords: ['mosque', 'management', 'Islamic', 'community'],
  authors: [{ name: 'Adhham Safwan', url: 'https://adhham.vercel.app' }],
  creator: 'Adhham Safwan',
  publisher: 'Islamic Center Management System',
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
        <IdleTimerWrapper>
          {children}
        </IdleTimerWrapper>
      </body>
    </html>
  );
}
