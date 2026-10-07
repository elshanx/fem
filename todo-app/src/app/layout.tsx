import type { Metadata } from 'next';
import { Josefin_Sans } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';

const josefinSans = Josefin_Sans({
  variable: '--font-josefin-sans',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: 'Todo',
  description: 'A todo list with filters, drag-and-drop reordering and a dark mode.',
  icons: { icon: '/images/favicon-32x32.png' },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html lang='en' className={josefinSans.variable} suppressHydrationWarning>
      <body className='antialiased'>
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
