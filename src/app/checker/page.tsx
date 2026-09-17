"use client";

import { useState } from "react";
import { CheckCircle2, Shield, Search } from "lucide-react";
import { formatINR } from "@/lib/formatting/currency";
import { calculate } from "@/lib/rules/engine";
import { resolveRuleset } from "@/lib/rules/resolver";
import type { CalculationResult } from "@/lib/rules/types";

export default function RuleCheckerPage() {
  const [amountInput, setAmountInput] = useState("");
  const [payee, setPayee] = useState<string>("Friend/Family");
  const [result, setResult] = useState<(CalculationResult & { selected: any }) | null>(null);

  const payees = [
    { label: "Friend/Family", type: "P2P", category: "Personal" },
    { label: "Local Shop", type: "P2M", category: "Standard" },
    { label: "Online Merchant", type: "P2M", category: "Standard" },
    { label: "Government/Taxes", type: "P2M", category: "Exempt" }, // Hypothetical special category
    { label: "Transport/Fuel", type: "P2M", category: "Special" },
  ];

  const handleCheck = () => {
    const amount = Number(amountInput.replace(/,/g, ""));
    if (!amount || amount <= 0) return;

    const selected = payees.find((p) => p.label === payee);
    if (!selected) return;

    const ruleset = resolveRuleset();
    const r = calculate({ amount, transactionType: selected.type as "P2M"|"P2P" }, ruleset);
    setResult({ ...r, selected });
  };

  return (
    <section style={{ padding: "48px 0" }}>
      <div className="container-narrow">
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "inline-flex", padding: 16, borderRadius: "var(--radius-full)", background: "hsl(var(--success-light))", marginBottom: 16 }}>
            <Search size={32} style={{ color: "hsl(var(--success))" }} />
          </div>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, marginBottom: 12 }}>UPI Rule Checker</h1>
          <p style={{ fontSize: 16, color: "hsl(var(--muted))", maxWidth: 520, margin: "0 auto" }}>
            Check the likely classification and estimated MDR treatment for a specific scenario.
          </p>
        </div>

        <div className="card-surface" style={{ padding: 32, marginBottom: 24 }}>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "hsl(var(--muted))", textTransform: "uppercase", marginBottom: 8 }}>
              Payment Amount
            </label>
            <div style={{ position: "relative", maxWidth: 300 }}>
              <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "hsl(var(--muted))", fontWeight: 700 }}>₹</span>
              <input
                type="text"
                placeholder="25,000"
                value={amountInput}
                onChange={(e) => setAmountInput(e.target.value.replace(/[^0-9.,]/g, ""))}
                style={{ width: "100%", padding: "12px 16px 12px 40px", fontSize: 18, fontWeight: 600, borderRadius: "var(--radius-sm)", border: "2px solid hsl(var(--border))", background: "hsl(var(--background))", color: "hsl(var(--foreground))" }}
              />
            </div>
          </div>

          <div style={{ marginBottom: 32 }}>
            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "hsl(var(--muted))", textTransform: "uppercase", marginBottom: 12 }}>
              Who are you paying?
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              {payees.map((p) => (
                <button
                  key={p.label}
                  onClick={() => setPayee(p.label)}
                  style={{
                    padding: "10px 16px",
                    borderRadius: "var(--radius-full)",
                    border: `2px solid ${payee === p.label ? "hsl(var(--primary))" : "hsl(var(--border))"}`,
                    background: payee === p.label ? "hsl(var(--primary-light))" : "hsl(var(--background))",
                    color: payee === p.label ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                    fontWeight: payee === p.label ? 700 : 500,
                    cursor: "pointer",
                    fontSize: 14,
                    transition: "all 0.2s"
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleCheck} className="gradient-primary" style={{ padding: "12px 28px", borderRadius: "var(--radius-sm)", color: "white", fontWeight: 600, border: "none", cursor: "pointer", fontSize: 16, width: "100%", maxWidth: 300 }}>
            Check Rule Treatment
          </button>
        </div>

        {result && (
          <div className="card-surface" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: 32, borderBottom: "1px solid hsl(var(--border))" }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}>
                <CheckCircle2 style={{ color: "hsl(var(--success))" }} /> Scenario Analysis
              </h2>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                <div>
                  <div style={{ fontSize: 13, color: "hsl(var(--muted))", textTransform: "uppercase", fontWeight: 600, marginBottom: 4 }}>Transaction Classification</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: result.selected.type === "P2P" ? "hsl(var(--success))" : "hsl(var(--primary))" }}>
                    {result.selected.type === "P2P" ? "Person-to-Person (P2P)" : "Person-to-Merchant (P2M)"}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 13, color: "hsl(var(--muted))", textTransform: "uppercase", fontWeight: 600, marginBottom: 4 }}>Potential MDR Treatment</div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>
                    {result.isExempt ? "Exempt / Free" : result.ratePercent ? result.ratePercent : "None"}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 13, color: "hsl(var(--muted))", textTransform: "uppercase", fontWeight: 600, marginBottom: 4 }}>Special Category</div>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>
                    {result.selected.category === "Standard" ? "Not selected" : result.selected.category}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 13, color: "hsl(var(--muted))", textTransform: "uppercase", fontWeight: 600, marginBottom: 4 }}>Estimated Charge</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: result.estimatedMDR > 0 ? "hsl(var(--primary))" : "hsl(var(--success))" }}>
                    {formatINR(result.estimatedMDR, true)}
                  </div>
                </div>
              </div>
            </div>
            <div style={{ padding: "16px 32px", background: "hsl(var(--muted-bg))", display: "flex", alignItems: "flex-start", gap: 12 }}>
              <Shield size={20} style={{ color: "hsl(var(--muted))", marginTop: 2, flexShrink: 0 }} />
              <p style={{ margin: 0, fontSize: 13, color: "hsl(var(--muted))", lineHeight: 1.6 }}>
                This is an informational estimate based on reported rules, not a guarantee of the fee charged by your bank/payment provider. Special categories may have different actual rates.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
