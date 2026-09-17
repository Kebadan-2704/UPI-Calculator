"use client";

import { useState } from "react";
import { Store, TrendingUp } from "lucide-react";
import { formatINR } from "@/lib/formatting/currency";
import { calculate } from "@/lib/rules/engine";
import { resolveRuleset } from "@/lib/rules/resolver";

export default function MerchantCalculatorPage() {
  const [salesInput, setSalesInput] = useState("");
  const [txCountInput, setTxCountInput] = useState("");

  const sales = Number(salesInput.replace(/,/g, "")) || 0;
  const count = Number(txCountInput) || 0;
  
  const ruleset = resolveRuleset();
  let estimatedMdr = 0;
  let averageTx = 0;

  if (sales > 0 && count > 0) {
    averageTx = sales / count;
    // Simplistic estimation based on average transaction size
    const result = calculate({ amount: averageTx, transactionType: "P2M" }, ruleset);
    estimatedMdr = result.estimatedMDR * count;
  }

  const estimatedNet = sales - estimatedMdr;

  return (
    <section style={{ padding: "48px 0" }}>
      <div className="container-narrow">
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{ display: "inline-flex", padding: 16, borderRadius: "var(--radius-full)", background: "hsl(var(--primary-light))", marginBottom: 16 }}>
            <Store size={32} style={{ color: "hsl(var(--primary))" }} />
          </div>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, marginBottom: 12 }}>Merchant Impact Calculator</h1>
          <p style={{ fontSize: 16, color: "hsl(var(--muted))", maxWidth: 520, margin: "0 auto" }}>
            How much will your business receive? Estimate your aggregate MDR costs across bulk transactions.
          </p>
        </div>

        <div className="card-surface" style={{ padding: 32, marginBottom: 24 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "hsl(var(--muted))", textTransform: "uppercase", marginBottom: 8 }}>
                Total UPI Sales Amount
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "hsl(var(--muted))", fontWeight: 700 }}>₹</span>
                <input
                  type="text"
                  placeholder="1,50,000"
                  value={salesInput}
                  onChange={(e) => setSalesInput(e.target.value.replace(/[^0-9.,]/g, ""))}
                  style={{ width: "100%", padding: "12px 16px 12px 40px", fontSize: 18, fontWeight: 600, borderRadius: "var(--radius-sm)", border: "2px solid hsl(var(--border))", background: "hsl(var(--background))", color: "hsl(var(--foreground))" }}
                />
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "hsl(var(--muted))", textTransform: "uppercase", marginBottom: 8 }}>
                Number of Transactions
              </label>
              <input
                type="number"
                placeholder="50"
                value={txCountInput}
                onChange={(e) => setTxCountInput(e.target.value)}
                style={{ width: "100%", padding: "12px 16px", fontSize: 18, fontWeight: 600, borderRadius: "var(--radius-sm)", border: "2px solid hsl(var(--border))", background: "hsl(var(--background))", color: "hsl(var(--foreground))" }}
              />
            </div>
          </div>
        </div>

        {sales > 0 && count > 0 && (
          <div className="card-surface" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: 32, background: "hsl(var(--muted-bg))", borderBottom: "1px solid hsl(var(--border))" }}>
              <div style={{ fontSize: 14, color: "hsl(var(--muted))", fontWeight: 600, marginBottom: 8 }}>AVERAGE TRANSACTION SIZE</div>
              <div style={{ fontSize: 24, fontWeight: 700 }}>{formatINR(averageTx)}</div>
            </div>
            
            <div style={{ padding: 32, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, textAlign: "center" }}>
              <div>
                <div style={{ fontSize: 13, color: "hsl(var(--muted))", fontWeight: 600, textTransform: "uppercase", marginBottom: 8 }}>Gross Sales</div>
                <div style={{ fontSize: 24, fontWeight: 800 }}>{formatINR(sales)}</div>
              </div>
              <div style={{ borderLeft: "1px solid hsl(var(--border))", borderRight: "1px solid hsl(var(--border))" }}>
                <div style={{ fontSize: 13, color: "hsl(var(--muted))", fontWeight: 600, textTransform: "uppercase", marginBottom: 8 }}>Estimated MDR</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: estimatedMdr > 0 ? "hsl(var(--primary))" : "hsl(var(--success))" }}>
                  {estimatedMdr > 0 ? "-" : ""}{formatINR(estimatedMdr, true)}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 13, color: "hsl(var(--muted))", fontWeight: 600, textTransform: "uppercase", marginBottom: 8 }}>Estimated Net</div>
                <div style={{ fontSize: 24, fontWeight: 800, color: "hsl(var(--success))" }}>{formatINR(estimatedNet, true)}</div>
              </div>
            </div>
            
            <div style={{ padding: 20, background: "hsl(var(--warning-light))", fontSize: 13, color: "hsl(var(--foreground))", textAlign: "center" }}>
              <strong>Important:</strong> This is a mathematical simulation assuming all transactions equal the average transaction size. Real MDR depends on actual transaction distribution and MCC.
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
