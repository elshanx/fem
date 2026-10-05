import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['500', '700'],
});

export const metadata: Metadata = {
  title: 'Frontend Mentor | Shortly URL shortening API Challenge',
  description: 'Shorten links and track how they perform.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='en' className={`${poppins.variable} antialiased`}>
      <body className='font-medium text-gray-500'>{children}</body>
    </html>
  );
}
