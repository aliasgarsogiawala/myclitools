"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { Package } from "@/lib/packages";

export default function PackageSearch({ packages }: { packages: Package[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return packages;
    return packages.filter(
      (pkg) =>
        pkg.name.toLowerCase().includes(q) ||
        pkg.description.toLowerCase().includes(q) ||
        pkg.keywords.some((k) => k.toLowerCase().includes(q)) ||
        pkg.category.toLowerCase().includes(q)
    );
  }, [query, packages]);

  return (
    <div>
      {/* Search input */}
      <div className="py-8 border-b border-gray-200">
        <div className="flex items-center gap-3 border border-gray-300 px-5 py-3 focus-within:border-black transition-colors max-w-lg">
          <span className="font-mono text-sm text-gray-400">~/</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search packages, keywords, categories..."
            className="flex-1 font-mono text-sm outline-none bg-transparent placeholder-gray-300"
            autoFocus
            spellCheck={false}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="font-mono text-xs text-gray-400 hover:text-black transition-colors"
            >
              clear
            </button>
          )}
        </div>
        {query && (
          <p className="font-mono text-xs text-gray-400 mt-3">
            {filtered.length} result{filtered.length !== 1 ? "s" : ""} for &quot;{query}&quot;
          </p>
        )}
      </div>

      {/* Results */}
      <div className="divide-y divide-gray-200">
        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-gray-400 font-mono text-sm">No packages match &quot;{query}&quot;.</p>
          </div>
        )}
        {filtered.map((pkg) => (
          <Link
            key={pkg.slug}
            href={`/packages/${pkg.slug}`}
            className="group flex flex-col sm:flex-row sm:items-start justify-between py-8 gap-6 hover:opacity-80 transition-opacity"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h2 className="text-2xl font-bold tracking-tight group-hover:underline">
                  {pkg.name}
                </h2>
                <span className="font-mono text-xs text-gray-400 border border-gray-200 px-2 py-0.5">
                  v{pkg.version}
                </span>
                <span className="font-mono text-xs text-gray-400 border border-gray-100 bg-gray-50 px-2 py-0.5">
                  {pkg.category}
                </span>
              </div>
              <p className="text-gray-500 text-sm max-w-xl leading-relaxed">{pkg.description}</p>
              <div className="flex flex-wrap gap-2 mt-4">
                {pkg.keywords.slice(0, 5).map((kw) => (
                  <button
                    key={kw}
                    onClick={(e) => {
                      e.preventDefault();
                      setQuery(kw);
                    }}
                    className="font-mono text-xs text-gray-400 hover:text-black transition-colors"
                  >
                    #{kw}
                  </button>
                ))}
              </div>
            </div>
            <div className="shrink-0 font-mono text-xs bg-gray-50 border border-gray-200 px-4 py-3 text-gray-600 whitespace-nowrap self-start">
              $ {pkg.install}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
