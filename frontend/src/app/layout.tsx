import type { Metadata } from "next";
import { Roboto as FontRoboto } from "next/font/google";
import "./globals.css";
import { cn } from '@/shared/lib/utils';

const roboto = FontRoboto({
  weight: ['300', '400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto'
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body  className={cn(
        "min-h-screen bg-background font-roboto antialiased",
        roboto.variable
      )}
      >{children}</body>
    </html>
  );
}
