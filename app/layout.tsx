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
  title: "Masjid OS",
  description: "Mosque management system for Masjid OS",
  keywords: ['mosque', 'management', 'Islamic', 'community'],
  authors: [{ name: 'Masjid OS' }],
  creator: 'Masjid OS',
  publisher: 'Masjid OS',
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
