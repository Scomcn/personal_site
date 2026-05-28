import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SkipLink from "@/components/SkipLink";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Scott McNicol — Senior Frontend Engineer",
  description:
    "Senior frontend engineer with seven years of experience building polished, performant interfaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <SkipLink />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
      </body>
    </html>
  );
}
