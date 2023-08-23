import type { Metadata } from 'next';
import { Kumbh_Sans } from 'next/font/google';
import { ThemeProvider } from '../providers/ThemeProvider';
import './globals.css';

const kumbhSans = Kumbh_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DevJobs',
  description: 'Developer Jobs challenge',
};

type Props = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang='en' suppressHydrationWarning={true}>
      <body className={kumbhSans.className}>
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
