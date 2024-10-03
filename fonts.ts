import { Montserrat } from 'next/font/google';
import localFont from 'next/font/local';

export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const lcdTime = localFont({
  // src: 'lib/fonts/DS-DIGIB.ttf',
  src: 'lib/fonts/lcd-time.ttf',
  weight: '400',
});