import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components";
import Providers from "./providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/Header";
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
      <body className="flex flex-col min-h-screen">
        <ToastContainer theme="colored" position="top-center" />
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
