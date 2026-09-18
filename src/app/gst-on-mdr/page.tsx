"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { formatINR } from "@/lib/formatting/currency";
import { validateAmountInput } from "@/lib/validation/calculator";
import { generateBreadcrumbSchema, generateFAQSchema, schemaToScriptProps } from "@/lib/seo/schemas";
import Decimal from "decimal.js";

const PAGE_FAQS = [
  {
    q: "Is GST applicable on UPI MDR?",
    a: "GST treatment on MDR depends on the service classification and applicable GST regulations. MDR is a service fee charged by payment intermediaries, and GST may apply at the standard rate (18%). This calculator estimates the GST component for informational purposes. Consult a tax professional for specific applicability.",
  },
  {
    q: "Who pays GST on MDR?",
    a: "GST on MDR, where applicable, is typically borne by the merchant as part of the total transaction processing cost. It is added to the MDR amount to determine the total deduction from the merchant's settlement.",
  },
  {
    q: "What is the GST rate on payment processing fees?",
    a: "The standard GST rate on financial and payment processing services in India is 18%. This rate applies to the MDR amount, not the transaction amount.",
  },
];

export default function GSTOnMDRPage() {
  const [amountInput, setAmountInput] = useState("");
  const [gstRate, setGstRate] = useState(18); // Default 18% GST
  const [result, setResult] = useState<{
    amount: number;
    mdr: number;
    gst: number;
    totalDeduction: number;
    netSettlement: number;
    effectiveRate: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = useCallback(() => {
    const validation = validateAmountInput(amountInput);
    if (!validation.valid || validation.value === null) {
      setError(validation.error);
      setResult(null);
      return;
    }

    setError(null);
    const amount = new Decimal(validation.value);
    const MDR_RATE = new Decimal("0.004");
    const THRESHOLD = 2000;
    const CAP = new Decimal(300);

    let mdr: Decimal;
    if (validation.value <= THRESHOLD) {
      mdr = new Decimal(0);
    } else {
      mdr = Decimal.min(amount.times(MDR_RATE), CAP);
    }

    const gstDecimal = new Decimal(gstRate).dividedBy(100);
    const gst = mdr.times(gstDecimal);
    const totalDeduction = mdr.plus(gst);
    const netSettlement = amount.minus(totalDeduction);
    const effectiveRate = amount.greaterThan(0)
      ? totalDeduction.dividedBy(amount).times(100)
      : new Decimal(0);

    setResult({
      amount: validation.value,
      mdr: mdr.toNumber(),
      gst: gst.toNumber(),
      totalDeduction: totalDeduction.toNumber(),
      netSettlement: netSettlement.toNumber(),
      effectiveRate: effectiveRate.toNumber(),
    });
  }, [amountInput, gstRate]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "GST on MDR", path: "/gst-on-mdr" },
  ]);
  const faqSchema = generateFAQSchema(PAGE_FAQS);

  return (
    <>
      <script {...schemaToScriptProps(breadcrumbSchema)} />
      <script {...schemaToScriptProps(faqSchema)} />

      <section style={{ padding: "48px 0" }}>
        <div className="container-narrow">
          <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 12 }}>
            GST on MDR Calculator
          </h1>
          <p style={{ fontSize: 16, color: "hsl(var(--muted))", lineHeight: 1.6, marginBottom: 32 }}>
            Calculate the GST component on UPI Merchant Discount Rate. See the total deduction
            including MDR + GST and the estimated net settlement.
          </p>

          {/* Calculator */}
          <div className="card-surface" style={{ padding: 32, marginBottom: 32 }}>
            <div style={{ marginBottom: 20 }}>
              <label htmlFor="gst-amount" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "hsl(var(--muted))", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Transaction Amount
              </label>
              <div style={{ position: "relative" }}>
                <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 24, fontWeight: 600, color: "hsl(var(--muted))" }}>₹</span>
                <input
                  id="gst-amount"
                  type="text"
                  inputMode="numeric"
                  placeholder="10,000"
                  value={amountInput}
                  onChange={(e) => { setAmountInput(e.target.value.replace(/[^0-9.,]/g, "")); setError(null); setResult(null); }}
                  onKeyDown={(e) => e.key === "Enter" && handleCalculate()}
                  style={{
                    width: "100%", padding: "16px 16px 16px 48px", fontSize: 24, fontWeight: 700,
                    border: "none", borderBottom: error ? "2px solid hsl(var(--destructive))" : "2px solid hsl(var(--border))",
                    background: "transparent", color: "hsl(var(--foreground))", outline: "none",
                  }}
                />
              </div>
              {error && <p role="alert" style={{ fontSize: 13, color: "hsl(var(--destructive))", marginTop: 6 }}>{error}</p>}
            </div>

            <div style={{ marginBottom: 20 }}>
              <label htmlFor="gst-rate" style={{ display: "block", fontSize: 13, fontWeight: 600, color: "hsl(var(--muted))", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                GST Rate (%)
              </label>
              <input
                id="gst-rate"
                type="number"
                min={0}
                max={28}
                step={1}
                value={gstRate}
                onChange={(e) => { setGstRate(Number(e.target.value)); setResult(null); }}
                style={{
                  width: 120, padding: "10px 14px", fontSize: 16, fontWeight: 600,
                  border: "1px solid hsl(var(--border))", borderRadius: "var(--radius-sm)",
                  background: "hsl(var(--surface))", color: "hsl(var(--foreground))", outline: "none",
                }}
              />
              <span style={{ marginLeft: 8, fontSize: 13, color: "hsl(var(--muted))" }}>Standard: 18%</span>
            </div>

            <button onClick={handleCalculate} className="gradient-primary" style={{
              width: "100%", padding: "14px 24px", fontSize: 16, fontWeight: 600,
              borderRadius: "var(--radius-sm)", border: "none", color: "hsl(var(--primary-foreground))",
              cursor: "pointer", fontFamily: "inherit",
            }}>
              Calculate GST on MDR
            </button>
          </div>

          {/* Result */}
          {result && (
            <div className="card-surface" style={{ padding: 32, marginBottom: 32 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20 }}>Breakdown</h2>

              <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
                {[
                  { label: "Transaction Amount", value: formatINR(result.amount), highlight: false },
                  { label: `MDR (0.4%)`, value: formatINR(result.mdr, true), highlight: false },
                  { label: `GST on MDR (${gstRate}%)`, value: formatINR(result.gst, true), highlight: false },
                  { label: "Total Deduction (MDR + GST)", value: formatINR(result.totalDeduction, true), highlight: true },
                  { label: "Estimated Net Settlement", value: formatINR(result.netSettlement, true), highlight: true },
                ].map((row) => (
                  <div key={row.label} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "12px 16px", borderRadius: "var(--radius-sm)",
                    background: row.highlight ? "hsl(var(--primary-light))" : "transparent",
                    borderBottom: row.highlight ? "none" : "1px solid hsl(var(--border) / 0.5)",
                  }}>
                    <span style={{ fontSize: 14, color: row.highlight ? "hsl(var(--foreground))" : "hsl(var(--muted))", fontWeight: row.highlight ? 600 : 400 }}>{row.label}</span>
                    <span className="amount-display" style={{ fontSize: row.highlight ? 20 : 16, fontWeight: row.highlight ? 700 : 600 }}>{row.value}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "10px 14px", borderRadius: "var(--radius-sm)", background: "hsl(var(--muted-bg))", fontSize: 13, color: "hsl(var(--muted))" }}>
                <Info size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                <span>
                  Effective rate including GST: {result.effectiveRate.toFixed(3)}% of transaction amount.
                  Actual GST applicability depends on merchant classification and tax registration.
                </span>
              </div>
            </div>
          )}

          {/* Educational content */}
          <article style={{ fontSize: 15, lineHeight: 1.9 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>How GST on MDR Works</h2>
            <p>
              GST (Goods and Services Tax) may be applicable on the MDR amount as a service fee.
              The GST is calculated on the MDR amount, not on the full transaction value.
            </p>

            <h3 style={{ fontSize: 16, fontWeight: 700, marginTop: 24, marginBottom: 8 }}>Formula</h3>
            <div style={{ padding: 16, borderRadius: "var(--radius-sm)", background: "hsl(var(--muted-bg))", fontFamily: "'JetBrains Mono', monospace", fontSize: 14, lineHeight: 2 }}>
              <div>MDR = Transaction Amount × 0.4% (if amount &gt; ₹2,000)</div>
              <div>GST = MDR × {gstRate}%</div>
              <div>Total Deduction = MDR + GST</div>
              <div>Net Settlement = Transaction Amount − Total Deduction</div>
            </div>

            <h3 style={{ fontSize: 16, fontWeight: 700, marginTop: 24, marginBottom: 8 }}>Example</h3>
            <p>For a ₹10,000 P2M transaction with 18% GST on MDR:</p>
            <ul style={{ paddingLeft: 24, margin: "8px 0" }}>
              <li>MDR: ₹10,000 × 0.4% = ₹40</li>
              <li>GST: ₹40 × 18% = ₹7.20</li>
              <li>Total Deduction: ₹40 + ₹7.20 = ₹47.20</li>
              <li>Net Settlement: ₹10,000 − ₹47.20 = <strong>₹9,952.80</strong></li>
            </ul>

            <div style={{
              padding: 20, borderRadius: "var(--radius-md)", background: "hsl(var(--warning-light))",
              border: "1px solid hsl(var(--warning) / 0.3)", marginTop: 24, marginBottom: 24,
            }}>
              <p style={{ margin: 0, fontSize: 14 }}>
                <strong>⚠️ Tax Disclaimer:</strong> GST applicability and rates depend on merchant
                registration, transaction classification, and current tax regulations. This calculator
                provides estimates for informational purposes only. Consult a tax professional for
                specific GST obligations.
              </p>
            </div>

            {/* FAQ */}
            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 16 }}>FAQ</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {PAGE_FAQS.map((faq) => (
                <details key={faq.q} className="card-surface" style={{ borderRadius: "var(--radius-md)", cursor: "pointer" }}>
                  <summary style={{ padding: "14px 16px", fontSize: 14, fontWeight: 600, listStyle: "none", display: "flex", justifyContent: "space-between" }}>
                    {faq.q}
                    <span style={{ color: "hsl(var(--muted))", flexShrink: 0, marginLeft: 12 }}>+</span>
                  </summary>
                  <div style={{ padding: "0 16px 14px", fontSize: 14, color: "hsl(var(--muted))", lineHeight: 1.7 }}>{faq.a}</div>
                </details>
              ))}
            </div>
          </article>

          <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid hsl(var(--border))", fontSize: 13, color: "hsl(var(--muted))" }}>
            <Link href="/calculator" style={{ color: "hsl(var(--primary))", textDecoration: "none", fontWeight: 600 }}>
              ← Back to MDR Calculator
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
