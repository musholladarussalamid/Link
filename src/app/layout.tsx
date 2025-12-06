import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import PrelineScript from "@/components/PrelineScript";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Masjid Pesona Darussalam - Link",
  description: "Landing page to share information about DKM Masjid Pesona Darussalam",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* <Script
          strategy="lazyOnload"
          type="text/javascript"
          src="https://www.muslimpro.com/muslimprowidget.js?cityid=1642911&amp;language=id&amp;timeformat=24"
          async
        ></Script> */}
      </head>
      <body className={inter.className}>
        <main className="relative overflow-hidden">{children}</main>
        <PrelineScript />
      </body>
    </html>
  );
}
