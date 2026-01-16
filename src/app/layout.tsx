import type { Metadata } from "next";
import { Montserrat, Varela } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const varela = Varela({
  variable: "--font-varela",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "TTT POS",
  description: "Point of Sale System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.variable} ${varela.variable} antialiased bg-[#080A16]`}
        style={{ fontFamily: 'Montserrat, sans-serif' }}
      >
        {children}
      </body>
    </html>
  );
}
