import type { Metadata } from "next";
import "./globals.css";
import { Footer, Header, Hero, SearchBar } from "@/components";
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
          <Hero />
          <div className="container mx-auto">
            <SearchBar />
          </div>
          <div className="container mx-auto py-10 flex-1">{children}</div>
          <Footer />
        </body>
      </Providers>
    </html>
  );
}
