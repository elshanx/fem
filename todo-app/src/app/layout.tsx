import type { Metadata } from 'next';
import { Josefin_Sans } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import './globals.css';

const heroImages = [
  ['mobile-light', '(width < 48rem) and (prefers-color-scheme: light)'],
  ['mobile-dark', '(width < 48rem) and (prefers-color-scheme: dark)'],
  ['desktop-light', '(width >= 48rem) and (prefers-color-scheme: light)'],
  ['desktop-dark', '(width >= 48rem) and (prefers-color-scheme: dark)'],
];

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
      <head>
        {heroImages.map(([name, media]) => (
          <link key={name} rel='preload' as='image' href={`/images/bg-${name}.jpg`} media={media} />
        ))}
      </head>
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
