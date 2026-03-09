"use client";

import { useState } from "react";
import type { Package } from "@/lib/packages";

type Status = "idle" | "installing" | "running" | "done" | "error";

export default function LiveRunner({ pkg }: { pkg: Package }) {
  const [selectedArg, setSelectedArg] = useState(pkg.safeArgs[0] ?? "--help");
  const [status, setStatus] = useState<Status>("idle");
  const [output, setOutput] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState<number | null>(null);

  const run = async () => {
    setStatus("installing");
    setOutput(null);
    setElapsed(null);
    const start = Date.now();

    try {
      setStatus("running");
      const res = await fetch("/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pkg: pkg.name, args: selectedArg }),
      });
      const data = await res.json();
      setElapsed(Date.now() - start);
      setOutput(data.output ?? data.error ?? "No output");
      setStatus(data.success ? "done" : "error");
    } catch {
      setElapsed(Date.now() - start);
      setOutput("Request failed — server may be unavailable.");
      setStatus("error");
    }
  };

  const statusLabel: Record<Status, string> = {
    idle: "Ready",
    installing: "Installing package...",
    running: "Executing command...",
    done: "Done",
    error: "Failed",
  };

  return (
    <div className="border border-gray-200">
      {/* Bar */}
      <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3 bg-gray-50">
        <div className="flex items-center gap-3">
          <span
            className={`w-2 h-2 rounded-full inline-block ${
              status === "idle"
                ? "bg-gray-300"
                : status === "installing" || status === "running"
                ? "bg-yellow-400 animate-pulse"
                : status === "done"
                ? "bg-green-500"
                : "bg-red-400"
            }`}
          />
          <span className="font-mono text-xs text-gray-500">{statusLabel[status]}</span>
          {elapsed !== null && (
            <span className="font-mono text-xs text-gray-400">{(elapsed / 1000).toFixed(1)}s</span>
          )}
        </div>
        <span className="font-mono text-xs text-gray-400">live — real execution</span>
      </div>

      {/* Command builder */}
      <div className="px-5 py-5 border-b border-gray-200">
        <p className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-3">Command</p>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="font-mono text-sm text-gray-500">$</span>
          <span className="font-mono text-sm font-semibold">{pkg.command}</span>
          <select
            value={selectedArg}
            onChange={(e) => setSelectedArg(e.target.value)}
            className="font-mono text-sm border border-gray-300 px-3 py-1.5 bg-white hover:border-black focus:border-black focus:outline-none transition-colors"
          >
            {pkg.safeArgs.map((arg) => (
              <option key={arg} value={arg}>
                {arg}
              </option>
            ))}
          </select>
        </div>
        <p className="text-xs text-gray-400 mt-3">
          For security, only read-only commands are available in live mode.
          The package is installed fresh in a sandboxed temp directory on the server.
        </p>
      </div>

      {/* Output */}
      <div className="bg-white min-h-32 px-5 py-5 font-mono text-sm">
        {output === null && status === "idle" && (
          <p className="text-gray-300">Output will appear here.</p>
        )}
        {(status === "installing" || status === "running") && output === null && (
          <p className="text-gray-400 animate-pulse">
            {status === "installing"
              ? `npm install ${pkg.name}...`
              : `${pkg.command} ${selectedArg}...`}
          </p>
        )}
        {output !== null && (
          <pre
            className={`whitespace-pre-wrap leading-relaxed ${
              status === "error" ? "text-red-500" : "text-gray-700"
            }`}
          >
            {output}
          </pre>
        )}
      </div>

      {/* Run button */}
      <div className="border-t border-gray-200 px-5 py-4 flex items-center justify-between bg-gray-50">
        <p className="text-xs text-gray-400">
          Installs <span className="font-mono">{pkg.name}</span> in a temp directory and runs your command live.
        </p>
        <button
          onClick={run}
          disabled={status === "installing" || status === "running"}
          className="px-6 py-2.5 bg-black text-white text-sm font-medium hover:bg-gray-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors font-mono"
        >
          {status === "installing" || status === "running" ? "Running..." : "Run live"}
        </button>
      </div>
    </div>
  );
}
