"use client";

import type { Metadata } from "next";
import { motion } from "framer-motion";
import { calculate } from "@/lib/rules/engine";
import { resolveRuleset } from "@/lib/rules/resolver";
import { formatINR } from "@/lib/formatting/currency";
import { Scale, ArrowRight, Info } from "lucide-react";
import Link from "next/link";

const THRESHOLD_EXAMPLES = [
  { amount: 1999, label: "₹1,999" },
  { amount: 2000, label: "₹2,000" },
  { amount: 2001, label: "₹2,001" },
  { amount: 2500, label: "₹2,500" },
  { amount: 5000, label: "₹5,000" },
];

export default function ThresholdPage() {
  const ruleset = resolveRuleset();

  const results = THRESHOLD_EXAMPLES.map((ex) => {
    const result = calculate({ amount: ex.amount, transactionType: "P2M" }, ruleset);
    return { ...ex, result };
  });

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
              background: "hsl(var(--primary-light))",
              marginBottom: 16,
            }}
          >
            <Scale size={28} style={{ color: "hsl(var(--primary))" }} />
          </div>
          <h1
            style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              marginBottom: 12,
            }}
          >
            ₹2,000 Threshold Calculator
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "hsl(var(--muted))",
              maxWidth: 520,
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            See how the ₹2,000 threshold affects UPI merchant payments.
            Transactions at or below this amount are not subject to the standard MDR.
          </p>
        </div>

        {/* Side-by-side comparison */}
        <div
          className="card-surface"
          style={{ padding: 0, overflow: "hidden", marginBottom: 24 }}
        >
          <div
            style={{
              padding: "16px 24px",
              borderBottom: "1px solid hsl(var(--border))",
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr 1fr 1fr",
              gap: 12,
              fontSize: 12,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "hsl(var(--muted))",
            }}
          >
            <div>Amount</div>
            <div>MDR Status</div>
            <div>Estimated MDR</div>
            <div>Merchant Receives</div>
          </div>

          {results.map((item, i) => {
            const isBoundary = item.amount === 2000;
            const isAbove = item.amount > 2000;

            return (
              <motion.div
                key={item.amount}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                style={{
                  padding: "16px 24px",
                  display: "grid",
                  gridTemplateColumns: "1.2fr 1fr 1fr 1fr",
                  gap: 12,
                  alignItems: "center",
                  borderBottom: "1px solid hsl(var(--border))",
                  background: isBoundary
                    ? "hsl(var(--warning-light))"
                    : isAbove
                      ? "hsl(var(--primary-light) / 0.3)"
                      : "transparent",
                }}
              >
                <div
                  className="amount-display"
                  style={{ fontSize: 16, fontWeight: 700 }}
                >
                  {formatINR(item.amount)}
                  {isBoundary && (
                    <span
                      style={{
                        display: "inline-block",
                        marginLeft: 8,
                        padding: "2px 8px",
                        borderRadius: "var(--radius-full)",
                        background: "hsl(var(--warning))",
                        color: "white",
                        fontSize: 10,
                        fontWeight: 700,
                        verticalAlign: "middle",
                      }}
                    >
                      THRESHOLD
                    </span>
                  )}
                </div>
                <div>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "var(--radius-full)",
                      fontSize: 12,
                      fontWeight: 600,
                      background: item.result.estimatedMDR === 0
                        ? "hsl(var(--success-light))"
                        : "hsl(var(--primary-light))",
                      color: item.result.estimatedMDR === 0
                        ? "hsl(var(--success))"
                        : "hsl(var(--primary))",
                    }}
                  >
                    {item.result.estimatedMDR === 0 ? "No MDR" : "MDR Applies"}
                  </span>
                </div>
                <div
                  className="amount-display"
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: item.result.estimatedMDR === 0
                      ? "hsl(var(--success))"
                      : "hsl(var(--foreground))",
                  }}
                >
                  {formatINR(item.result.estimatedMDR, true)}
                </div>
                <div
                  className="amount-display"
                  style={{ fontSize: 15, fontWeight: 600 }}
                >
                  {formatINR(item.result.estimatedNet, true)}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Explanation */}
        <div className="card-surface" style={{ padding: 28 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <Info size={20} style={{ color: "hsl(var(--primary))", flexShrink: 0, marginTop: 2 }} />
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>
                Understanding the ₹2,000 Threshold
              </h2>
              <div style={{ fontSize: 14, color: "hsl(var(--muted))", lineHeight: 1.8 }}>
                <p style={{ marginBottom: 10 }}>
                  The reported standard MDR rule applies to person-to-merchant (P2M) UPI
                  transactions <strong>above ₹2,000</strong>. Transactions at ₹2,000 or below
                  are not subject to the standard 0.4% MDR.
                </p>
                <p style={{ marginBottom: 10 }}>
                  This means a payment of ₹2,000 incurs no MDR, while a payment of ₹2,001
                  would attract a 0.4% charge on the full transaction amount (not just the
                  amount above the threshold).
                </p>
                <p>
                  <strong>Note:</strong> This calculator does not present payment splitting
                  as a guaranteed way to avoid charges. The threshold applies per transaction
                  as reported.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center", marginTop: 32 }}>
          <Link
            href="/calculator"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 28px",
              borderRadius: "var(--radius-sm)",
              color: "white",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 15,
            }}
            className="gradient-primary"
          >
            Try the Full Calculator <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
