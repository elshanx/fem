import type { Metadata } from 'next';
import { League_Spartan } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import Sidebar from '@/components/layout/Sidebar';
import './globals.css';

const leagueSpartan = League_Spartan({
  variable: '--font-league-spartan',
  subsets: ['latin'],
  weight: ['500', '700'],
});

export const metadata: Metadata = {
  title: { default: 'Invoices', template: '%s | Invoices' },
  description: 'Create, track and manage your invoices.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='en' className={leagueSpartan.variable} suppressHydrationWarning>
      <body className='min-h-dvh font-sans antialiased'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Sidebar />
          <div className='pt-topbar md:pt-topbar-md lg:pt-0 lg:pl-sidebar'>{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
