"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-gray-200 sticky top-0 bg-white z-50">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight hover:opacity-70 transition-opacity">
          aliasgarsogiawala
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm transition-colors ${
              pathname === "/" ? "text-black font-medium" : "text-gray-500 hover:text-black"
            }`}
          >
            Home
          </Link>
          <Link
            href="/packages"
            className={`text-sm transition-colors ${
              pathname.startsWith("/packages") ? "text-black font-medium" : "text-gray-500 hover:text-black"
            }`}
          >
            Packages
          </Link>
          <a
            href="https://www.npmjs.com/~aliasgarsogiawala"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-gray-500 hover:text-black transition-colors"
          >
            npm
          </a>
        </nav>
      </div>
    </header>
  );
}
