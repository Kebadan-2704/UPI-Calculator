"use client";

import { useState } from "react";
import { Calendar, Shield } from "lucide-react";
import { formatINR } from "@/lib/formatting/currency";
import { calculate } from "@/lib/rules/engine";
import { resolveRuleset } from "@/lib/rules/resolver";

export default function MonthlyMDRCalculatorPage() {
  const [revenueInput, setRevenueInput] = useState("");
  const [avgTxInput, setAvgTxInput] = useState("");

  const revenue = Number(revenueInput.replace(/,/g, "")) || 0;
  const avgTx = Number(avgTxInput.replace(/,/g, "")) || 0;
  
  const ruleset = resolveRuleset();
  let estimatedMonthlyMdr = 0;
  let txCount = 0;

  if (revenue > 0 && avgTx > 0) {
    txCount = Math.floor(revenue / avgTx);
    
    // Simplistic estimation based on average transaction size
    const result = calculate({ amount: avgTx, transactionType: "P2M" }, ruleset);
    estimatedMonthlyMdr = result.estimatedMDR * txCount;
  }

  return (
    <section style={{ padding: "48px 0" }}>
      <div className="container-narrow">
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "inline-flex", padding: 16, borderRadius: "var(--radius-full)", background: "hsl(var(--warning-light))", marginBottom: 16 }}>
            <Calendar size={32} style={{ color: "hsl(var(--warning))" }} />
          </div>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, marginBottom: 12 }}>Monthly MDR Calculator</h1>
          <p style={{ fontSize: 16, color: "hsl(var(--muted))", maxWidth: 520, margin: "0 auto" }}>
            Estimate your business&apos;s monthly MDR costs based on your typical transaction profile.
          </p>
        </div>

        <div className="card-surface" style={{ padding: 32, marginBottom: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "hsl(var(--muted))", textTransform: "uppercase", marginBottom: 8 }}>
                Monthly UPI Revenue
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "hsl(var(--muted))", fontWeight: 700 }}>₹</span>
                <input
                  type="text"
                  placeholder="5,00,000"
                  value={revenueInput}
                  onChange={(e) => setRevenueInput(e.target.value.replace(/[^0-9.,]/g, ""))}
                  style={{ width: "100%", padding: "12px 16px 12px 40px", fontSize: 18, fontWeight: 600, borderRadius: "var(--radius-sm)", border: "2px solid hsl(var(--border))", background: "hsl(var(--background))", color: "hsl(var(--foreground))" }}
                />
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "hsl(var(--muted))", textTransform: "uppercase", marginBottom: 8 }}>
                Average Transaction
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "hsl(var(--muted))", fontWeight: 700 }}>₹</span>
                <input
                  type="text"
                  placeholder="3,500"
                  value={avgTxInput}
                  onChange={(e) => setAvgTxInput(e.target.value.replace(/[^0-9.,]/g, ""))}
                  style={{ width: "100%", padding: "12px 16px 12px 40px", fontSize: 18, fontWeight: 600, borderRadius: "var(--radius-sm)", border: "2px solid hsl(var(--border))", background: "hsl(var(--background))", color: "hsl(var(--foreground))" }}
                />
              </div>
            </div>
          </div>
        </div>

        {revenue > 0 && avgTx > 0 && (
          <div className="card-surface" style={{ padding: 32, textAlign: "center" }}>
            <div style={{ fontSize: 14, color: "hsl(var(--muted))", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>Estimated Monthly MDR</div>
            <div style={{ fontSize: "clamp(36px, 6vw, 56px)", fontWeight: 800, color: estimatedMonthlyMdr > 0 ? "hsl(var(--primary))" : "hsl(var(--success))", marginBottom: 16 }}>
              {formatINR(estimatedMonthlyMdr, true)}
            </div>
            <div style={{ fontSize: 16, color: "hsl(var(--muted))", marginBottom: 24 }}>
              Based on roughly {txCount.toLocaleString("en-IN")} transactions per month.
            </div>

            <div style={{ padding: 16, borderRadius: "var(--radius-sm)", background: "hsl(var(--muted-bg))", fontSize: 13, color: "hsl(var(--muted))", lineHeight: 1.6, textAlign: "left", display: "flex", gap: 12 }}>
              <Shield size={20} style={{ flexShrink: 0, marginTop: 2 }} />
              <div>
                <strong>Important Context:</strong> Do not pretend you can determine exact MDR from only monthly revenue. Transaction-level classification matters. If a portion of your transactions fall under the ₹2,000 threshold, your actual MDR will be lower than this estimate.
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
