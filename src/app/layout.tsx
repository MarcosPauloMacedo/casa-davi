import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { getTheme } from "@/services/cookies";

import "./globals.css";
import { ThemeIcon } from "@/components/theme-icon";

const montserrat = Montserrat(
  {
    subsets: ['latin'],
    display: 'swap',
  }
);

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = getTheme() as string;
  return (
    <html className={theme} lang="pt-br">
      <body
        className={`${montserrat.className} antialiased`}
      >
        <ThemeIcon className="absolute right-8 top-6" />
        {children}
      </body>
    </html>
  );
}
