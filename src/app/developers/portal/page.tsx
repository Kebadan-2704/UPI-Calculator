"use client";

import React, { useState, useEffect } from "react";
import { Key, Copy, CheckCircle2, ShieldAlert, Zap, Lock, Terminal } from "lucide-react";
import Link from "next/link";

type ApiKey = {
  id: string;
  key: string;
  createdAt: number;
  lastUsed?: number;
};

export default function DevelopersPortalPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    const savedKeys = localStorage.getItem("upi-api-keys");
    if (savedKeys) {
      try {
        setKeys(JSON.parse(savedKeys));
      } catch (e) {
        console.error("Failed to parse keys");
      }
    }
  }, []);

  const saveKeys = (newKeys: ApiKey[]) => {
    setKeys(newKeys);
    localStorage.setItem("upi-api-keys", JSON.stringify(newKeys));
  };

  const generateKey = () => {
    const newKey: ApiKey = {
      id: crypto.randomUUID(),
      key: `upi_live_${crypto.randomUUID().replace(/-/g, "")}`,
      createdAt: Date.now()
    };
    saveKeys([...keys, newKey]);
  };

  const revokeKey = (id: string) => {
    if (window.confirm("Are you sure you want to revoke this key? Any applications using it will immediately lose access.")) {
      saveKeys(keys.filter(k => k.id !== id));
    }
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="container-narrow" style={{ padding: "40px 16px", minHeight: "80vh" }}>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12, color: "hsl(var(--foreground))" }}>
          Developer API Portal
        </h1>
        <p style={{ color: "hsl(var(--muted))", fontSize: 16 }}>
          Generate and manage your API keys to integrate our UPI calculation engine into your own applications.
        </p>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 600 }}>Active Keys</h2>
        <button
          onClick={generateKey}
          className="gradient-primary"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 16px",
            borderRadius: "var(--radius-sm)",
            color: "white",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
          }}
        >
          <Key size={16} />
          Create New Key
        </button>
      </div>

      <div className="card-surface" style={{ padding: 24, borderRadius: "var(--radius-lg)", marginBottom: 32 }}>
        {keys.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <Lock size={48} style={{ color: "hsl(var(--muted))", opacity: 0.5, margin: "0 auto 16px" }} />
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8 }}>No API Keys Found</h3>
            <p style={{ color: "hsl(var(--muted))" }}>Create your first API key to start authenticating requests.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {keys.map((k) => (
              <div key={k.id} style={{ padding: 20, border: "1px solid hsl(var(--border))", borderRadius: "var(--radius-md)", background: "hsl(var(--background))" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>Standard API Key</div>
                    <div style={{ fontSize: 12, color: "hsl(var(--muted))" }}>Created on {new Date(k.createdAt).toLocaleDateString()}</div>
                  </div>
                  <button 
                    onClick={() => revokeKey(k.id)}
                    style={{ background: "none", border: "none", color: "hsl(var(--destructive))", cursor: "pointer", fontSize: 13, fontWeight: 500 }}
                  >
                    Revoke Key
                  </button>
                </div>
                
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <code style={{ flex: 1, padding: "12px 16px", background: "hsl(var(--muted-bg))", borderRadius: "var(--radius-sm)", fontSize: 14, color: "hsl(var(--foreground))", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.5px" }}>
                    {k.key}
                  </code>
                  <button
                    onClick={() => copyToClipboard(k.id, k.key)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 44,
                      height: 44,
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid hsl(var(--border))",
                      background: "hsl(var(--surface))",
                      color: copiedId === k.id ? "hsl(var(--success))" : "hsl(var(--foreground))",
                      cursor: "pointer",
                      transition: "all 0.15s"
                    }}
                  >
                    {copiedId === k.id ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ padding: 24, background: "hsl(var(--primary-light))", borderRadius: "var(--radius-lg)", border: "1px solid hsl(var(--primary))", opacity: 0.8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
          <ShieldAlert size={24} color="hsl(var(--primary))" />
          <h3 style={{ fontSize: 18, fontWeight: 600, color: "hsl(var(--primary))" }}>Keep your keys secure</h3>
        </div>
        <p style={{ fontSize: 14, color: "hsl(var(--foreground))", lineHeight: 1.6, marginBottom: 16 }}>
          Your API keys carry the same privileges as your user account. Do not share them in publicly accessible areas such as GitHub, client-side code, or public forums. 
          Use environment variables to store them securely in your backend applications.
        </p>
        <Link href="/developers" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600, color: "hsl(var(--primary))", textDecoration: "none" }}>
          <Terminal size={16} />
          Read the API Documentation
        </Link>
      </div>
    </div>
  );
}
