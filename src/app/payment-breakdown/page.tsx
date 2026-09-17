"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { calculate } from "@/lib/rules/engine";
import { resolveRuleset } from "@/lib/rules/resolver";
import { formatINR, parseINRInput } from "@/lib/formatting/currency";
import { validateAmountInput } from "@/lib/validation/calculator";
import { BarChart3, ArrowDown, Sparkles } from "lucide-react";
import type { CalculationResult } from "@/lib/rules/types";

export default function PaymentBreakdownPage() {
  const [amountInput, setAmountInput] = useState("");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showCalc, setShowCalc] = useState(false);

  const handleCalculate = () => {
    const validation = validateAmountInput(amountInput);
    if (!validation.valid || validation.value === null) {
      setError(validation.error);
      setResult(null);
      return;
    }
    setError(null);
    const ruleset = resolveRuleset();
    const r = calculate({ amount: validation.value, transactionType: "P2M" }, ruleset);
    setResult(r);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleCalculate();
  };

  return (
    <section style={{ padding: "48px 0" }}>
      <div className="container-narrow">
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: "var(--radius-md)",
              background: "hsl(var(--success-light))",
              marginBottom: 16,
            }}
          >
            <BarChart3 size={28} style={{ color: "hsl(var(--success))" }} />
          </div>
          <h1
            style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              marginBottom: 12,
            }}
          >
            Payment Breakdown
          </h1>
          <p style={{ fontSize: 16, color: "hsl(var(--muted))", maxWidth: 500, margin: "0 auto", lineHeight: 1.6 }}>
            Enter a gross payment amount to see the estimated merchant-side breakdown:
            gross → MDR → estimated net.
          </p>
        </div>

        {/* Input */}
        <div className="card-surface" style={{ padding: 32, marginBottom: 16 }}>
          <label
            htmlFor="breakdown-amount"
            style={{
              display: "block", fontSize: 13, fontWeight: 600, color: "hsl(var(--muted))",
              marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em",
            }}
          >
            Gross Payment Amount
          </label>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ position: "relative", flex: 1 }}>
              <span style={{
                position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
                fontSize: 22, fontWeight: 700, color: "hsl(var(--muted))", pointerEvents: "none",
              }}>₹</span>
              <input
                id="breakdown-amount"
                type="text"
                inputMode="numeric"
                placeholder="1,00,000"
                value={amountInput}
                onChange={(e) => { 
                  const filtered = e.target.value.replace(/[^0-9.,]/g, "");
                  setAmountInput(filtered); 
                  setError(null); 
                }}
                onKeyDown={handleKeyDown}
                aria-label="Enter gross payment amount"
                style={{
                  width: "100%", padding: "14px 16px 14px 42px",
                  fontSize: 24, fontWeight: 700,
                  fontFamily: "'JetBrains Mono', monospace",
                  borderRadius: "var(--radius-sm)",
                  border: `2px solid ${error ? "hsl(var(--destructive))" : "hsl(var(--input-border))"}`,
                  background: "hsl(var(--background))", color: "hsl(var(--foreground))",
                  outline: "none",
                }}
                onFocus={(e) => { if (!error) e.currentTarget.style.borderColor = "hsl(var(--primary))"; }}
                onBlur={(e) => { if (!error) e.currentTarget.style.borderColor = "hsl(var(--input-border))"; }}
              />
            </div>
            <button
              onClick={handleCalculate}
              className="gradient-primary"
              style={{
                padding: "14px 28px", borderRadius: "var(--radius-sm)",
                border: "none", color: "white", fontSize: 15, fontWeight: 600,
                cursor: "pointer", display: "flex", alignItems: "center", gap: 8,
                fontFamily: "inherit", whiteSpace: "nowrap",
              }}
            >
              <Sparkles size={16} /> Break Down
            </button>
          </div>
          {error && (
            <p role="alert" style={{ fontSize: 13, color: "hsl(var(--destructive))", marginTop: 6 }}>
              {error}
            </p>
          )}
        </div>

        {/* Result Breakdown */}
        <AnimatePresence mode="wait">
          {result && (
            <motion.div
              key={result.input.amount}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Visual breakdown */}
              <div className="card-surface" style={{ padding: 32, marginBottom: 16 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
                  {/* Gross */}
                  <div style={{
                    width: "100%", padding: 20, borderRadius: "var(--radius-md)",
                    background: "hsl(var(--muted-bg))", textAlign: "center",
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "hsl(var(--muted))", marginBottom: 4 }}>
                      Gross Payment
                    </div>
                    <div className="amount-display" style={{ fontSize: 32, fontWeight: 800 }}>
                      {formatINR(result.input.amount)}
                    </div>
                  </div>

                  <ArrowDown size={24} style={{ color: "hsl(var(--muted))" }} />

                  {/* MDR Deduction */}
                  <div style={{
                    width: "100%", padding: 20, borderRadius: "var(--radius-md)",
                    background: result.estimatedMDR === 0 ? "hsl(var(--success-light))" : "hsl(var(--primary-light))",
                    textAlign: "center",
                    border: result.estimatedMDR === 0 ? "2px solid hsl(var(--success) / 0.3)" : "2px solid hsl(var(--primary) / 0.3)",
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "hsl(var(--muted))", marginBottom: 4 }}>
                      Estimated MDR {result.ratePercent && `(${result.ratePercent})`}
                    </div>
                    <div className="amount-display" style={{
                      fontSize: 28, fontWeight: 800,
                      color: result.estimatedMDR === 0 ? "hsl(var(--success))" : "hsl(var(--primary))",
                    }}>
                      − {formatINR(result.estimatedMDR, true)}
                    </div>
                    {result.capReached && (
                      <div style={{ fontSize: 13, color: "hsl(var(--warning))", fontWeight: 600, marginTop: 4 }}>
                        ₹300 cap applied
                      </div>
                    )}
                    {result.isExempt && (
                      <div style={{ fontSize: 13, color: "hsl(var(--success))", fontWeight: 600, marginTop: 4 }}>
                        {result.exemptionReason}
                      </div>
                    )}
                  </div>

                  <ArrowDown size={24} style={{ color: "hsl(var(--muted))" }} />

                  {/* Net */}
                  <div style={{
                    width: "100%", padding: 20, borderRadius: "var(--radius-md)",
                    background: "hsl(var(--success-light))", textAlign: "center",
                    border: "2px solid hsl(var(--success) / 0.3)",
                  }}>
                    <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "hsl(var(--muted))", marginBottom: 4 }}>
                      Estimated Merchant Net
                    </div>
                    <div className="amount-display" style={{ fontSize: 32, fontWeight: 800, color: "hsl(var(--success))" }}>
                      {formatINR(result.estimatedNet, true)}
                    </div>
                    <div style={{ fontSize: 13, color: "hsl(var(--muted))", marginTop: 4 }}>
                      Estimated amount the merchant receives
                    </div>
                  </div>
                </div>
              </div>

              {/* Show calculation toggle */}
              <div className="card-surface" style={{ padding: 20 }}>
                <button
                  onClick={() => setShowCalc(!showCalc)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    background: "none", border: "none", color: "hsl(var(--primary))",
                    fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
                  }}
                >
                  {showCalc ? "▲ Hide" : "▼ Show"} calculation steps
                </button>
                {showCalc && (
                  <div style={{ marginTop: 12, padding: 16, borderRadius: "var(--radius-sm)", background: "hsl(var(--background))", border: "1px solid hsl(var(--border))" }}>
                    <ol style={{ paddingLeft: 20, margin: 0, fontSize: 13, lineHeight: 1.8, color: "hsl(var(--foreground))" }}>
                      {result.formulaSteps.map((step, i) => (
                        <li key={i} style={{ marginBottom: 4 }}>{step}</li>
                      ))}
                    </ol>
                    <div style={{ marginTop: 12, paddingTop: 10, borderTop: "1px solid hsl(var(--border))", fontSize: 12, color: "hsl(var(--muted))" }}>
                      Ruleset v{result.rulesetVersion} | Effective {result.rulesetEffectiveFrom}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
