"use client";

import { useState } from "react";
import CopyButton from "./CopyButton";

type Manager = "npm" | "yarn" | "pnpm" | "bun";

const managers: Manager[] = ["npm", "yarn", "pnpm", "bun"];

function getCommand(manager: Manager, pkg: string): string {
  switch (manager) {
    case "npm":
      return `npm install -g ${pkg}`;
    case "yarn":
      return `yarn global add ${pkg}`;
    case "pnpm":
      return `pnpm add -g ${pkg}`;
    case "bun":
      return `bun add -g ${pkg}`;
  }
}

export default function InstallTabs({ pkgName }: { pkgName: string }) {
  const [active, setActive] = useState<Manager>("npm");
  const cmd = getCommand(active, pkgName);

  return (
    <div className="border border-gray-200">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {managers.map((m) => (
          <button
            key={m}
            onClick={() => setActive(m)}
            className={`font-mono text-xs px-5 py-3 border-r border-gray-200 last:border-r-0 transition-colors ${
              active === m
                ? "bg-black text-white"
                : "bg-white text-gray-500 hover:text-black hover:bg-gray-50"
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* Command */}
      <div className="flex items-center gap-3 px-5 py-4 bg-gray-50">
        <span className="font-mono text-sm text-gray-400">$</span>
        <span className="font-mono text-sm flex-1 text-black">{cmd}</span>
        <CopyButton text={cmd} />
      </div>
    </div>
  );
}
