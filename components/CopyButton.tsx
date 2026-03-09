"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={copy}
      className="font-mono text-xs text-gray-400 hover:text-black transition-colors shrink-0"
      title="Copy to clipboard"
    >
      {copied ? "copied" : "copy"}
    </button>
  );
}
