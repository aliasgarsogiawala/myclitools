"use client";

import { useState, useEffect } from "react";
import type { Package, VersionEntry } from "@/lib/packages";

type DiffItem = {
  label: string;
  left: string | string[] | null;
  right: string | string[] | null;
  type: "text" | "list";
};

function computeDiff(a: VersionEntry, b: VersionEntry): DiffItem[] {
  return [
    { label: "Description", left: a.description, right: b.description, type: "text" },
    { label: "Dependencies", left: a.dependencies, right: b.dependencies, type: "list" },
    { label: "Changes", left: a.changes, right: b.changes, type: "list" },
  ];
}

export default function VersionComparePicker({ pkg }: { pkg: Package }) {
  const versions = pkg.versionHistory;
  const [fromV, setFromV] = useState(versions[versions.length - 1]?.version ?? "");
  const [toV, setToV] = useState(versions[0]?.version ?? "");

  // Support URL params like ?from=x&to=y
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const f = p.get("from");
    const t = p.get("to");
    if (f && versions.find((v) => v.version === f)) setFromV(f);
    if (t && versions.find((v) => v.version === t)) setToV(t);
  }, [versions]);

  const fromEntry = versions.find((v) => v.version === fromV);
  const toEntry = versions.find((v) => v.version === toV);
  const diff = fromEntry && toEntry ? computeDiff(fromEntry, toEntry) : null;

  return (
    <div className="py-14">
      {/* Selector */}
      <div className="grid grid-cols-2 gap-6 mb-12">
        {(["from", "to"] as const).map((side) => {
          const val = side === "from" ? fromV : toV;
          const setVal = side === "from" ? setFromV : setToV;
          const label = side === "from" ? "Base version" : "Compare version";
          return (
            <div key={side}>
              <label className="block font-mono text-xs text-gray-400 uppercase tracking-widest mb-3">
                {label}
              </label>
              <select
                value={val}
                onChange={(e) => setVal(e.target.value)}
                className="w-full border border-gray-300 px-4 py-3 font-mono text-sm bg-white hover:border-black focus:border-black focus:outline-none transition-colors appearance-none"
              >
                {versions.map((v) => (
                  <option key={v.version} value={v.version}>
                    v{v.version}{" "}
                    {v.version === pkg.version ? "(latest)" : ""}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>

      {fromV === toV && (
        <div className="border border-gray-200 px-6 py-8 text-center">
          <p className="text-gray-400 text-sm font-mono">Select two different versions to compare.</p>
        </div>
      )}

      {diff && fromV !== toV && (
        <div className="space-y-0 border border-gray-200">
          {/* Header row */}
          <div className="grid grid-cols-[1fr_1fr_1fr] border-b border-gray-200 bg-gray-50">
            <div className="px-5 py-3 font-mono text-xs text-gray-400 uppercase tracking-wider border-r border-gray-200">
              Field
            </div>
            <div className="px-5 py-3 font-mono text-xs text-gray-600 uppercase tracking-wider border-r border-gray-200">
              v{fromV}
            </div>
            <div className="px-5 py-3 font-mono text-xs text-gray-600 uppercase tracking-wider">
              v{toV}
            </div>
          </div>

          {diff.map((item) => {
            const leftStr = Array.isArray(item.left)
              ? item.left.join(", ")
              : item.left ?? "";
            const rightStr = Array.isArray(item.right)
              ? item.right.join(", ")
              : item.right ?? "";
            const changed = leftStr !== rightStr;

            return (
              <div
                key={item.label}
                className={`grid grid-cols-[1fr_1fr_1fr] border-b border-gray-100 last:border-b-0 ${
                  changed ? "bg-amber-50" : ""
                }`}
              >
                <div className="px-5 py-4 font-mono text-xs text-gray-500 border-r border-gray-100 flex items-start pt-4">
                  <span className="uppercase tracking-wider">{item.label}</span>
                  {changed && (
                    <span className="ml-2 font-mono text-[10px] border border-amber-300 text-amber-600 px-1.5 py-0.5">
                      changed
                    </span>
                  )}
                </div>

                {/* Left */}
                <div className="px-5 py-4 border-r border-gray-100">
                  {item.type === "list" && Array.isArray(item.left) ? (
                    <ul className="space-y-1">
                      {item.left.map((l) => {
                        const isRemoved =
                          Array.isArray(item.right) && !item.right.includes(l);
                        return (
                          <li
                            key={l}
                            className={`font-mono text-xs ${
                              isRemoved
                                ? "line-through text-red-400"
                                : "text-gray-700"
                            }`}
                          >
                            {l}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-600">{leftStr || <span className="text-gray-300">—</span>}</p>
                  )}
                </div>

                {/* Right */}
                <div className="px-5 py-4">
                  {item.type === "list" && Array.isArray(item.right) ? (
                    <ul className="space-y-1">
                      {item.right.map((r) => {
                        const isAdded =
                          Array.isArray(item.left) && !item.left.includes(r);
                        return (
                          <li
                            key={r}
                            className={`font-mono text-xs ${
                              isAdded ? "text-green-600 font-semibold" : "text-gray-700"
                            }`}
                          >
                            {isAdded ? "+ " : ""}{r}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-600">{rightStr || <span className="text-gray-300">—</span>}</p>
                  )}
                </div>
              </div>
            );
          })}

          {/* Publish date row */}
          <div className="grid grid-cols-[1fr_1fr_1fr] bg-gray-50">
            <div className="px-5 py-3 font-mono text-xs text-gray-400 uppercase tracking-wider border-r border-gray-100">
              Published
            </div>
            <div className="px-5 py-3 font-mono text-xs text-gray-500 border-r border-gray-100">
              {new Date(fromEntry!.publishedAt).toLocaleDateString("en-US", {
                year: "numeric", month: "short", day: "numeric",
              })}
            </div>
            <div className="px-5 py-3 font-mono text-xs text-gray-500">
              {new Date(toEntry!.publishedAt).toLocaleDateString("en-US", {
                year: "numeric", month: "short", day: "numeric",
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
