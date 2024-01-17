import type { Metadata } from "next";
import "./globals.css";
import { Footer, Header, SearchBar } from "@/components";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "Cozy Nest",
  description: "Hotel Booking Web App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Providers>
        <body className="flex flex-col min-h-screen">
          <Header />
          {children}
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
