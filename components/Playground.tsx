"use client";

import { useState } from "react";
import type { Package } from "@/lib/packages";

type OutputLine = {
  type: "command" | "output" | "error";
  text: string;
};

const simulateOutput = (command: string, pkg: Package): string[] => {
  const trimmed = command.trim();
  const base = pkg.command;

  if (!trimmed.startsWith(base) && trimmed !== "") {
    return [`command not found: ${trimmed.split(" ")[0]}`];
  }

  const args = trimmed.slice(base.length).trim();

  if (pkg.slug === "automove") {
    if (args === "--help" || args === "-h") {
      return [
        `Usage: automove [options]`,
        ``,
        `Keeps your screen awake by nudging the cursor. Ctrl+C to stop.`,
        ``,
        `Options:`,
        `  -i, --interval <seconds>  seconds between each nudge (default: 5)`,
        `  -r, --radius <pixels>     how many pixels to nudge (default: 5)`,
        `  -h, --help                display help for command`,
      ];
    }
    const intervalMatch = args.match(/(?:--interval|-i)\s+(\d+)/);
    const radiusMatch = args.match(/(?:--radius|-r)\s+(\d+)/);
    const interval = intervalMatch ? intervalMatch[1] : "5";
    const radius = radiusMatch ? radiusMatch[1] : "5";

    return [
      `automove running — cursor nudges every ${interval}s, ${radius}px radius.`,
      `Press Ctrl+C to stop.`,
      ``,
      `[simulated] nudge #1 at (842, 530) -> (${842 + parseInt(radius)}, 530)`,
      `[simulated] nudge #2 at (847, 530) -> (847, ${530 + parseInt(radius)})`,
      `[simulated] nudge #3 at (847, 535) -> (${847 - parseInt(radius)}, 535)`,
      ``,
      `^C`,
      `automove stopped.`,
    ];
  }

  if (pkg.slug === "storemyapi") {
    if (args.startsWith("set ")) {
      const parts = args.slice(4).trim().split(/\s+/);
      const key = parts[0] || "KEY";
      const val = parts[1] ? parts[1].slice(0, 6) + "..." : "VALUE";
      return [`Stored: ${key} = ${val}`, ``, `Key saved successfully.`];
    }
    if (args.startsWith("get ")) {
      const key = args.slice(4).trim() || "KEY";
      return [`${key}=sk-abc123...`];
    }
    if (args === "list") {
      return [
        `Stored variables (3):`,
        `  OPENAI_KEY`,
        `  GITHUB_TOKEN`,
        `  DATABASE_URL`,
      ];
    }
    if (args.startsWith("delete ")) {
      const key = args.slice(7).trim() || "KEY";
      return [`Deleted: ${key}`];
    }
    if (args === "--help" || args === "-h") {
      return [
        `Usage: storemyapi <command>`,
        ``,
        `Commands:`,
        `  set <KEY> <VALUE>   Store a new variable`,
        `  get <KEY>           Retrieve a variable`,
        `  list                List all stored variables`,
        `  delete <KEY>        Remove a variable`,
      ];
    }
    return [`Usage: storemyapi <set|get|list|delete>`, `Run storemyapi --help for more info.`];
  }

  return [`Running: ${trimmed}...`];
};

export default function Playground({ pkg }: { pkg: Package }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<OutputLine[]>([
    { type: "output", text: `Welcome to the ${pkg.name} playground.` },
    { type: "output", text: `Try: ${pkg.command} --help` },
    { type: "output", text: "" },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const run = (cmd: string) => {
    if (!cmd.trim()) return;
    const output = simulateOutput(cmd, pkg);
    setHistory((prev) => [
      ...prev,
      { type: "command", text: `$ ${cmd}` },
      ...output.map((line) => ({ type: "output" as const, text: line })),
    ]);
    setCmdHistory((prev) => [cmd, ...prev]);
    setHistoryIndex(-1);
    setInput("");
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIndex + 1, cmdHistory.length - 1);
      setHistoryIndex(next);
      setInput(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(historyIndex - 1, -1);
      setHistoryIndex(next);
      setInput(next === -1 ? "" : cmdHistory[next] ?? "");
    }
  };

  const clear = () => {
    setHistory([]);
    setInput("");
  };

  return (
    <div className="border border-gray-200">
      {/* Terminal bar */}
      <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3 bg-gray-50">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-gray-300 inline-block" />
          <span className="w-3 h-3 rounded-full bg-gray-300 inline-block" />
          <span className="w-3 h-3 rounded-full bg-gray-300 inline-block" />
        </div>
        <span className="font-mono text-xs text-gray-400">playground — {pkg.name}</span>
        <button
          onClick={clear}
          className="font-mono text-xs text-gray-400 hover:text-black transition-colors"
        >
          clear
        </button>
      </div>

      {/* Output area */}
      <div className="bg-white p-5 font-mono text-sm min-h-64 max-h-96 overflow-y-auto">
        {history.map((line, i) => (
          <div
            key={i}
            className={`leading-relaxed whitespace-pre-wrap ${
              line.type === "command"
                ? "text-black font-semibold"
                : line.type === "error"
                ? "text-red-600"
                : "text-gray-500"
            }`}
          >
            {line.text || <span>&nbsp;</span>}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 flex items-center px-5 py-3 bg-white">
        <span className="font-mono text-sm text-gray-400 mr-3">$</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={`${pkg.command} --help`}
          className="flex-1 font-mono text-sm outline-none bg-transparent placeholder-gray-300"
          autoFocus
          spellCheck={false}
          autoComplete="off"
        />
        <button
          onClick={() => run(input)}
          className="font-mono text-xs text-gray-400 hover:text-black transition-colors ml-4"
        >
          run
        </button>
      </div>

      {/* Quick commands */}
      <div className="border-t border-gray-100 px-5 py-3 flex flex-wrap gap-2 bg-gray-50">
        {pkg.usageExamples.map((ex) => (
          <button
            key={ex.command}
            onClick={() => run(ex.command)}
            className="font-mono text-xs border border-gray-200 px-3 py-1.5 text-gray-600 hover:border-black hover:text-black transition-colors bg-white"
          >
            {ex.command}
          </button>
        ))}
      </div>
    </div>
  );
}
