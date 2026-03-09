import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CLI Tools by aliasgarsogiawala",
  description: "A playground for CLI npm packages published by aliasgarsogiawala.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Header />
        <main>{children}</main>
        <footer className="border-t border-gray-200 mt-24">
          <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-sm text-gray-500 font-mono">
              aliasgarsogiawala / npm
            </p>
            <div className="flex gap-6 text-sm text-gray-500">
              <a
                href="https://www.npmjs.com/~aliasgarsogiawala"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors"
              >
                npm profile
              </a>
              <a
                href="https://github.com/aliasgarsogiawala"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-black transition-colors"
              >
                github
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
