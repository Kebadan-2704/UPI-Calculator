"use client";

import React, { useState, useEffect } from "react";
import { useHistoryStore } from "@/lib/store/historyStore";
import { formatINR } from "@/lib/formatting/currency";
import { Clock, Trash2, CheckCircle2, History, Database, User } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { history, isLoaded, clearHistory } = useHistoryStore();
  const [handle, setHandle] = useState("");
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  useEffect(() => {
    const savedHandle = localStorage.getItem("upi-merchant-handle");
    if (savedHandle) {
      setHandle(savedHandle);
    }
  }, []);

  const saveHandle = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("upi-merchant-handle", handle);
    setIsEditingProfile(false);
  };

  if (!isLoaded) {
    return <div style={{ padding: 40, textAlign: "center" }}>Loading Dashboard...</div>;
  }

  return (
    <div className="container" style={{ padding: "40px 16px", minHeight: "80vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32, flexWrap: "wrap", gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, color: "hsl(var(--foreground))" }}>
            Merchant Dashboard
          </h1>
          <p style={{ color: "hsl(var(--muted))", fontSize: 16 }}>
            Your local-first command center for UPI transaction intelligence.
          </p>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 3fr", gap: 24, alignItems: "start" }}>
        
        {/* Profile Sidebar */}
        <div className="card-surface" style={{ padding: 24, borderRadius: "var(--radius-lg)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <div style={{ background: "hsl(var(--primary-light))", padding: 12, borderRadius: "50%", color: "hsl(var(--primary))" }}>
              <User size={24} />
            </div>
            <div>
              <div style={{ fontSize: 13, color: "hsl(var(--muted))", textTransform: "uppercase", fontWeight: 600 }}>Profile</div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>
                {handle || "Guest Merchant"}
              </div>
            </div>
          </div>
          
          {isEditingProfile ? (
            <form onSubmit={saveHandle} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <input
                type="text"
                value={handle}
                onChange={(e) => setHandle(e.target.value)}
                placeholder="Enter Merchant ID..."
                style={{
                  padding: "8px 12px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--background))",
                  color: "hsl(var(--foreground))"
                }}
              />
              <button type="submit" className="gradient-primary" style={{ padding: "8px", borderRadius: "var(--radius-sm)", color: "white", border: "none", cursor: "pointer", fontWeight: 600 }}>
                Save Profile
              </button>
            </form>
          ) : (
            <button 
              onClick={() => setIsEditingProfile(true)}
              style={{ width: "100%", padding: "8px", borderRadius: "var(--radius-sm)", background: "hsl(var(--muted-bg))", border: "none", color: "hsl(var(--foreground))", cursor: "pointer", fontWeight: 500 }}
            >
              {handle ? "Edit Profile" : "Set Merchant ID"}
            </button>
          )}

          <div style={{ marginTop: 32, borderTop: "1px solid hsl(var(--border))", paddingTop: 20 }}>
            <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Developer Tools</h3>
            <Link href="/developers/portal" style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px", borderRadius: "var(--radius-sm)", textDecoration: "none", color: "hsl(var(--primary))", background: "hsl(var(--primary-light))", fontWeight: 500 }}>
              <Database size={16} />
              API Key Portal
            </Link>
          </div>
        </div>

        {/* History Ledger */}
        <div className="card-surface" style={{ padding: 24, borderRadius: "var(--radius-lg)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <History size={20} color="hsl(var(--muted))" />
              <h2 style={{ fontSize: 20, fontWeight: 700 }}>Calculation Ledger</h2>
            </div>
            
            {history.length > 0 && (
              <button
                onClick={clearHistory}
                style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "hsl(var(--destructive))", cursor: "pointer", fontSize: 13, fontWeight: 500 }}
              >
                <Trash2 size={14} /> Clear History
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div style={{ textAlign: "center", padding: "40px 20px", color: "hsl(var(--muted))" }}>
              <Clock size={40} style={{ margin: "0 auto 16px", opacity: 0.5 }} />
              <p style={{ fontSize: 16, fontWeight: 500 }}>No history found</p>
              <p style={{ fontSize: 14, marginTop: 4 }}>Your recent calculations and bulk uploads will appear here securely.</p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {history.map((entry) => {
                const date = new Date(entry.timestamp).toLocaleString();
                
                if (entry.type === "SINGLE") {
                  return (
                    <div key={entry.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", border: "1px solid hsl(var(--border))", borderRadius: "var(--radius-md)", background: "hsl(var(--background))" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <span style={{ fontSize: 12, fontWeight: 700, padding: "2px 8px", borderRadius: 12, background: "hsl(var(--primary-light))", color: "hsl(var(--primary))" }}>
                            {entry.details.type}
                          </span>
                          <span style={{ fontSize: 12, color: "hsl(var(--muted))" }}>{date}</span>
                        </div>
                        <div style={{ fontSize: 18, fontWeight: 700 }}>{formatINR(entry.details.amount)}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 12, color: "hsl(var(--muted))", textTransform: "uppercase" }}>MDR Cost</div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: "hsl(var(--destructive))" }}>{formatINR(entry.details.mdr)}</div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={entry.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", border: "1px solid hsl(var(--border))", borderRadius: "var(--radius-md)", background: "hsl(var(--muted-bg))" }}>
                      <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <span style={{ fontSize: 12, fontWeight: 700, padding: "2px 8px", borderRadius: 12, background: "hsl(var(--muted))", color: "white" }}>
                            BULK UPLOAD
                          </span>
                          <span style={{ fontSize: 12, color: "hsl(var(--muted))" }}>{date}</span>
                        </div>
                        <div style={{ fontSize: 18, fontWeight: 700 }}>{formatINR(entry.details.totalVolume)} <span style={{ fontSize: 12, fontWeight: 400, color: "hsl(var(--muted))" }}>({entry.details.totalTransactions} txns)</span></div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 12, color: "hsl(var(--muted))", textTransform: "uppercase" }}>Total MDR</div>
                        <div style={{ fontSize: 16, fontWeight: 700, color: "hsl(var(--primary))" }}>{formatINR(entry.details.totalMDR)}</div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
