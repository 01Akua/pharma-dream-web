import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClubPopup from "@/components/ClubPopup";
import WhatsappFloat from "@/components/WhatsappFloat";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pharma Dream — Dermocosmética avanzada con tecnología fitomolecular",
  description:
    "Dermocosmética inteligente para piel sensible y reactiva. Fórmulas con Tecnología Fitomolecular y activos vegetales bioactivos. Hecho en Colombia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <AnnouncementBar />
        <Navbar />
        {children}
        <Footer />
        <ClubPopup />
        <WhatsappFloat />
      </body>
    </html>
  );
}
