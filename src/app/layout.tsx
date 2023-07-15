import { NextAuthProvider } from '@/src/components/Provider';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { StateProvider } from '../store/provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Our finance',
    template: 'Our finance | %s',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <StateProvider>{children}</StateProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
