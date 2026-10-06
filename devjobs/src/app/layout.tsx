import type { Metadata } from 'next';
import { Kumbh_Sans } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Header from '@/components/Header';
import './globals.css';

const kumbhSans = Kumbh_Sans({
  variable: '--font-kumbh-sans',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: { default: 'devjobs', template: '%s | devjobs' },
  description: 'Find your next developer job.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='en' className={kumbhSans.variable} suppressHydrationWarning>
      <body className='min-h-dvh font-sans antialiased'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
