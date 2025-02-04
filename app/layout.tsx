import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "JagoRumah - Find Your Dream Property",
  description: "Find your perfect property with JagoRumah",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-color-scheme="light">
      <body className={`${inter.className} bg-white text-black`}>{children}</body>
    </html>
  );
}
