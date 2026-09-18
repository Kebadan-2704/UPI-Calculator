"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Info } from "lucide-react";
import { formatINR } from "@/lib/formatting/currency";
import { validateAmountInput } from "@/lib/validation/calculator";
import { generateBreadcrumbSchema, generateWebApplicationSchema, generateFAQSchema, schemaToScriptProps } from "@/lib/seo/schemas";
import Decimal from "decimal.js";

const PAGE_FAQS = [
  {
    q: "What is UPI settlement amount?",
    a: "The settlement amount is the net amount a merchant receives after MDR and applicable GST deductions. For example, on a ₹10,000 payment with ₹40 MDR and ₹7.20 GST, the settlement is ₹9,952.80.",
  },
  {
    q: "How long does UPI settlement take?",
    a: "UPI settlements are typically processed within T+0 (same day) to T+1 (next business day), depending on the merchant's acquirer and settlement agreement. This calculator estimates the amount, not the timing.",
  },
  {
    q: "What deductions apply to UPI merchant payments?",
    a: "For P2M transactions above ₹2,000: MDR (0.4%, max ₹300) plus GST on MDR (18%). Below ₹2,000, there is no standard MDR deduction.",
  },
];

export default function SettlementCalculatorPage() {
  const [amountInput, setAmountInput] = useState("");
  const [includeGST, setIncludeGST] = useState(true);
  const [result, setResult] = useState<{
    gross: number; mdr: number; gst: number; totalDeductions: number; net: number;
    belowThreshold: boolean; capReached: boolean;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = useCallback(() => {
    const validation = validateAmountInput(amountInput);
    if (!validation.valid || validation.value === null) { setError(validation.error); setResult(null); return; }
    setError(null);

    const amount = new Decimal(validation.value);
    const THRESHOLD = 2000;
    const belowThreshold = validation.value <= THRESHOLD;

    let mdr: Decimal;
    let capReached = false;
    if (belowThreshold) {
      mdr = new Decimal(0);
    } else {
      const rawMdr = amount.times("0.004");
      if (rawMdr.greaterThan(300)) { mdr = new Decimal(300); capReached = true; }
      else { mdr = rawMdr; }
    }

    const gst = includeGST ? mdr.times("0.18") : new Decimal(0);
    const totalDeductions = mdr.plus(gst);
    const net = amount.minus(totalDeductions);

    setResult({
      gross: validation.value, mdr: mdr.toNumber(), gst: gst.toNumber(),
      totalDeductions: totalDeductions.toNumber(), net: net.toNumber(),
      belowThreshold, capReached,
    });
  }, [amountInput, includeGST]);

  const webAppSchema = generateWebApplicationSchema({
    name: "UPI Settlement Calculator", description: "Calculate net merchant settlement after MDR and GST deductions.",
    url: "/upi-settlement-calculator",
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" }, { name: "Settlement Calculator", path: "/upi-settlement-calculator" },
  ]);
  const faqSchema = generateFAQSchema(PAGE_FAQS);

  return (
    <>
      <script {...schemaToScriptProps(webAppSchema)} />
      <script {...schemaToScriptProps(breadcrumbSchema)} />
      <script {...schemaToScriptProps(faqSchema)} />

      <section style={{ padding: "48px 0" }}>
        <div className="container-narrow">
          <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 12 }}>
            UPI Settlement Calculator
          </h1>
          <p style={{ fontSize: 16, color: "hsl(var(--muted))", lineHeight: 1.6, marginBottom: 32 }}>
            Calculate the estimated net settlement amount a merchant receives after MDR and GST deductions.
          </p>

          {/* Calculator */}
          <div className="card-surface" style={{ padding: 32, marginBottom: 32 }}>
            <div style={{ marginBottom: 20 }}>
              <label htmlFor="settlement-amount" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "hsl(var(--muted))", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Gross Payment Amount
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 24, fontWeight: 600, color: "hsl(var(--muted))" }}>₹</span>
                <input id="settlement-amount" type="text" inputMode="numeric" placeholder="10,000" value={amountInput}
                  onChange={(e) => { setAmountInput(e.target.value.replace(/[^0-9.,]/g, "")); setError(null); setResult(null); }}
                  onKeyDown={(e) => e.key === "Enter" && handleCalculate()}
                  style={{ width: "100%", padding: "16px 16px 16px 48px", fontSize: 24, fontWeight: 700, border: "none",
                    borderBottom: error ? "2px solid hsl(var(--destructive))" : "2px solid hsl(var(--border))",
                    background: "transparent", color: "hsl(var(--foreground))", outline: "none" }}
                />
              </div>
              {error && <p role="alert" style={{ fontSize: 13, color: "hsl(var(--destructive))", marginTop: 6 }}>{error}</p>}
            </div>

            <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, cursor: "pointer", marginBottom: 20 }}>
              <input type="checkbox" checked={includeGST} onChange={(e) => { setIncludeGST(e.target.checked); setResult(null); }}
                style={{ width: 18, height: 18, accentColor: "hsl(var(--primary))" }} />
              Include GST on MDR (18%)
            </label>

            <button onClick={handleCalculate} className="gradient-primary" style={{
              width: "100%", padding: "14px 24px", fontSize: 16, fontWeight: 600, borderRadius: "var(--radius-sm)",
              border: "none", color: "hsl(var(--primary-foreground))", cursor: "pointer", fontFamily: "inherit",
            }}>
              Calculate Settlement
            </button>
          </div>

          {/* Result */}
          {result && (
            <div className="card-surface" style={{ padding: 32, marginBottom: 32 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Settlement Breakdown</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { label: "Gross Payment", value: formatINR(result.gross), bold: false },
                  { label: "MDR (0.4%)", value: `− ${formatINR(result.mdr, true)}`, bold: false },
                  ...(includeGST ? [{ label: "GST on MDR (18%)", value: `− ${formatINR(result.gst, true)}`, bold: false }] : []),
                  { label: "Total Deductions", value: `− ${formatINR(result.totalDeductions, true)}`, bold: true },
                  { label: "Estimated Net Settlement", value: formatINR(result.net, true), bold: true },
                ].map((row) => (
                  <div key={row.label} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 14px",
                    borderRadius: "var(--radius-sm)",
                    background: row.bold ? "hsl(var(--primary-light))" : "transparent",
                    borderBottom: row.bold ? "none" : "1px solid hsl(var(--border) / 0.5)",
                  }}>
                    <span style={{ fontSize: 14, fontWeight: row.bold ? 600 : 400, color: row.bold ? "hsl(var(--foreground))" : "hsl(var(--muted))" }}>{row.label}</span>
                    <span className="amount-display" style={{ fontSize: row.bold ? 20 : 16, fontWeight: row.bold ? 700 : 600 }}>{row.value}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
                {result.belowThreshold && (
                  <span style={{ padding: "4px 12px", fontSize: 12, fontWeight: 600, borderRadius: "var(--radius-full)", background: "hsl(var(--success-light))", color: "hsl(var(--success))" }}>
                    ✓ Below ₹2,000 threshold — no MDR
                  </span>
                )}
                {result.capReached && (
                  <span style={{ padding: "4px 12px", fontSize: 12, fontWeight: 600, borderRadius: "var(--radius-full)", background: "hsl(var(--warning-light))", color: "hsl(var(--warning))" }}>
                    ₹300 cap applied
                  </span>
                )}
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "10px 14px", borderRadius: "var(--radius-sm)", background: "hsl(var(--muted-bg))", fontSize: 13, color: "hsl(var(--muted))", marginTop: 16 }}>
                <Info size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                This is an estimate. Actual settlement depends on merchant classification, acquirer terms, and settlement timing.
              </div>
            </div>
          )}

          {/* FAQ */}
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16, marginTop: 32 }}>FAQ</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {PAGE_FAQS.map((faq) => (
              <details key={faq.q} className="card-surface" style={{ borderRadius: "var(--radius-md)", cursor: "pointer" }}>
                <summary style={{ padding: "14px 16px", fontSize: 14, fontWeight: 600, listStyle: "none", display: "flex", justifyContent: "space-between" }}>
                  {faq.q}<span style={{ color: "hsl(var(--muted))", flexShrink: 0, marginLeft: 12 }}>+</span>
                </summary>
                <div style={{ padding: "0 16px 14px", fontSize: 14, color: "hsl(var(--muted))", lineHeight: 1.7 }}>{faq.a}</div>
              </details>
            ))}
          </div>

          <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid hsl(var(--border))", fontSize: 13, color: "hsl(var(--muted))" }}>
            <Link href="/calculator" style={{ color: "hsl(var(--primary))", textDecoration: "none", fontWeight: 600 }}>← Back to MDR Calculator</Link>
          </div>
        </div>
      </section>
    </>
  );
}
