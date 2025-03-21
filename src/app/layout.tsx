import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

// 本地字体配置
// import localFont from 'next/font/local'
// const myFont= localFont({
//   src: './fonts/SanJiPoMoTi-2.ttf',
// })
import { Geist, Geist_Mono } from 'next/font/google';
import { SplashCursor } from '@/components/ui/splash-cursor';
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'NextJs App',
    template: '%s | NextJs App',
  },
  description: '我的第一个NextJs项目',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <html lang="en" suppressHydrationWarning className={myFont.className}>
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <SplashCursor />
        </ThemeProvider>
      </body>
    </html>
  );
}
