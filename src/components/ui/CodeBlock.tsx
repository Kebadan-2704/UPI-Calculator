"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";

type CodeBlockProps = {
  code: string;
  language?: string;
  icon?: React.ReactNode;
};

export function CodeBlock({ code, language = "cURL", icon }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ background: "#0F172A", borderRadius: "var(--radius-md)", overflow: "hidden", marginBottom: 32 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 24px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {icon}
          <span style={{ color: "#94A3B8", fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          title="Copy code"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: "var(--radius-sm)",
            border: "none",
            background: copied ? "rgba(34, 197, 94, 0.2)" : "rgba(255,255,255,0.05)",
            color: copied ? "#22C55E" : "#94A3B8",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>
      <div style={{ padding: 24, overflowX: "auto" }}>
        <pre
          style={{
            color: "#E2E8F0",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 13,
            margin: 0,
            whiteSpace: "pre-wrap",
          }}
        >
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
