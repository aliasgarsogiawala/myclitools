"use client";

import { useEffect, useState } from "react";

type DownloadDay = { day: string; downloads: number };

type NpmData = {
  totalDownloads: number;
  downloads: DownloadDay[];
  versions: { version: string; publishedAt: string }[];
};

export default function DownloadStats({ pkgName }: { pkgName: string }) {
  const [data, setData] = useState<NpmData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/npm?pkg=${pkgName}`)
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [pkgName]);

  if (loading) {
    return (
      <div className="border border-gray-200 px-6 py-8">
        <p className="font-mono text-xs text-gray-300 animate-pulse">Loading stats...</p>
      </div>
    );
  }

  if (!data || !data.downloads?.length) {
    return (
      <div className="border border-gray-200 px-6 py-8">
        <p className="font-mono text-xs text-gray-400">No download data available yet.</p>
      </div>
    );
  }

  const max = Math.max(...data.downloads.map((d) => d.downloads), 1);
  const nonZero = data.downloads.filter((d) => d.downloads > 0);

  return (
    <div className="border border-gray-200">
      {/* Header */}
      <div className="border-b border-gray-200 px-5 py-4 flex items-center justify-between bg-gray-50">
        <span className="font-mono text-xs text-gray-400 uppercase tracking-wider">Downloads — last 30 days</span>
        <span className="font-mono text-sm font-bold">{data.totalDownloads.toLocaleString()}</span>
      </div>

      {/* Bar chart */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-end gap-1 h-24">
          {data.downloads.map((d, i) => {
            const h = d.downloads > 0 ? Math.max((d.downloads / max) * 100, 4) : 0;
            const date = new Date(d.day);
            const label = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
            return (
              <div
                key={i}
                className="group relative flex flex-col items-center justify-end flex-1"
                style={{ height: "96px" }}
              >
                {/* Tooltip */}
                {d.downloads > 0 && (
                  <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 hidden group-hover:block z-10 bg-black text-white font-mono text-[10px] px-2 py-1 whitespace-nowrap">
                    {label}: {d.downloads}
                  </div>
                )}
                <div
                  className={`w-full transition-colors ${
                    d.downloads > 0 ? "bg-black group-hover:bg-gray-600" : "bg-gray-100"
                  }`}
                  style={{ height: `${h}%` }}
                />
              </div>
            );
          })}
        </div>

        {/* X axis labels — show only first, mid, last */}
        <div className="flex justify-between mt-2">
          {[data.downloads[0], data.downloads[Math.floor(data.downloads.length / 2)], data.downloads[data.downloads.length - 1]].map(
            (d, i) =>
              d ? (
                <span key={i} className="font-mono text-[10px] text-gray-400">
                  {new Date(d.day).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              ) : null
          )}
        </div>
      </div>

      {/* Peak day */}
      {nonZero.length > 0 && (
        <div className="border-t border-gray-100 px-5 py-3 flex items-center gap-6 bg-gray-50">
          <div>
            <p className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">Peak day</p>
            <p className="font-mono text-xs text-gray-700 mt-0.5">
              {(() => {
                const peak = [...nonZero].sort((a, b) => b.downloads - a.downloads)[0];
                return `${new Date(peak.day).toLocaleDateString("en-US", { month: "short", day: "numeric" })} — ${peak.downloads} downloads`;
              })()}
            </p>
          </div>
          <div>
            <p className="font-mono text-[10px] text-gray-400 uppercase tracking-wider">Active days</p>
            <p className="font-mono text-xs text-gray-700 mt-0.5">{nonZero.length}</p>
          </div>
        </div>
      )}
    </div>
  );
}
