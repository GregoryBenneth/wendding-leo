import type React from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
// import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Janine & Leonardo - Casamento",
  description: "Celebre conosco o nosso casamento em 19/07",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${inter.variable} ${playfair.variable} font-sans bg-white`}
      >
        {/* <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        > */}
        {children}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
