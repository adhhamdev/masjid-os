import { IdleTimerWrapper } from '@/components/IdleTimerWrapper';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

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
    <html lang="en" className={poppins.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <IdleTimerWrapper>
          {children}
        </IdleTimerWrapper>
      </body>
    </html>
  );
}
