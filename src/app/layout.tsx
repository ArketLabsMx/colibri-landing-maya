import type { Metadata } from "next";
import { Inter, Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap"
});

const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair",
  display: "swap"
});

const montserrat = Montserrat({ 
  subsets: ["latin"], 
  variable: "--font-montserrat",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Colibrí Concierge | Por Cielo, Mar y Tierra",
  description: "Experience the ultimate luxury in Riviera Maya. Private yachts, cenotes, and exclusive stays.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} ${montserrat.variable} font-sans bg-zinc-950 text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
