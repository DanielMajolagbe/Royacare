import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/shared/SideBar";
import Header from "@/components/shared/Header";
import MobileMenu from "@/components/shared/MobileMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Royacare Agency",
  description: "Providing Care and Nursing Staff to NHS Trust Hospitals, Nursing & Residential Care Homes around the UK",
  icons: {
    icon: "/roya.png",
  },
  viewport: {
    width: 'device-width',
    initialScale: 0.5,
    maximumScale: 1,
    userScalable: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=0.5, maximum-scale=1, user-scalable=yes" />
      </head>
      <body className={`${inter.className} h-full overflow-y-scroll`}>
        <div className="min-h-screen flex flex-col bg-gray-50">
          <Header />
          <div className="flex flex-1 pt-16 md:pt-20">
            <SideBar />
            <main className="flex-1 px-2 md:px-8 py-6 smooth-transition overflow-x-hidden">
              <div className="max-w-7xl mx-auto w-full">
                {children}
              </div>
            </main>
          </div>
          <MobileMenu />
        </div>
      </body>
    </html>
  );
}
