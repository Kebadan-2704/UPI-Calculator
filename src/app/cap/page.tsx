"use client";

import { motion } from "framer-motion";
import { calculate } from "@/lib/rules/engine";
import { resolveRuleset } from "@/lib/rules/resolver";
import { formatINR } from "@/lib/formatting/currency";
import { TrendingUp, ArrowRight, Info } from "lucide-react";
import Link from "next/link";

const CAP_EXAMPLES = [
  { amount: 10000 },
  { amount: 25000 },
  { amount: 50000 },
  { amount: 60000 },
  { amount: 74999 },
  { amount: 75000 },
  { amount: 75001 },
  { amount: 100000 },
  { amount: 200000 },
  { amount: 500000 },
];

export default function CapPage() {
  const ruleset = resolveRuleset();
  const results = CAP_EXAMPLES.map((ex) => {
    const result = calculate({ amount: ex.amount, transactionType: "P2M" }, ruleset);
    return { ...ex, result };
  });

  // Calculate chart data points
  const chartPoints = [];
  for (let amt = 2001; amt <= 150000; amt += 500) {
    const r = calculate({ amount: amt, transactionType: "P2M" }, ruleset);
    chartPoints.push({ amount: amt, mdr: r.estimatedMDR });
  }
  const maxMDR = 300;
  const maxAmt = 150000;

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
              background: "hsl(var(--warning-light))",
              marginBottom: 16,
            }}
          >
            <TrendingUp size={28} style={{ color: "hsl(var(--warning))" }} />
          </div>
          <h1
            style={{
              fontSize: "clamp(24px, 4vw, 36px)",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              marginBottom: 12,
            }}
          >
            ₹300 Cap Calculator
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
            The reported standard MDR is capped at ₹300 per transaction.
            This cap is reached at ₹75,000 (0.4% × ₹75,000 = ₹300).
          </p>
        </div>

        {/* Visual Chart */}
        <div className="card-surface" style={{ padding: 28, marginBottom: 24 }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 20 }}>
            MDR vs Payment Amount
          </h2>
          <div
            style={{
              position: "relative",
              height: 260,
              borderLeft: "2px solid hsl(var(--border))",
              borderBottom: "2px solid hsl(var(--border))",
              marginLeft: 50,
              marginBottom: 30,
            }}
          >
            {/* Y-axis labels */}
            {[0, 100, 200, 300].map((val) => (
              <div
                key={val}
                style={{
                  position: "absolute",
                  left: -50,
                  bottom: `${(val / maxMDR) * 100}%`,
                  transform: "translateY(50%)",
                  fontSize: 11,
                  color: "hsl(var(--muted))",
                  fontFamily: "'JetBrains Mono', monospace",
                  width: 44,
                  textAlign: "right",
                }}
              >
                ₹{val}
              </div>
            ))}

            {/* Cap line */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                bottom: `${(300 / maxMDR) * 100}%`,
                borderBottom: "2px dashed hsl(var(--warning))",
                zIndex: 1,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  right: 0,
                  bottom: 4,
                  fontSize: 11,
                  fontWeight: 600,
                  color: "hsl(var(--warning))",
                  background: "hsl(var(--surface))",
                  padding: "2px 6px",
                  borderRadius: 4,
                }}
              >
                ₹300 CAP
              </span>
            </div>

            {/* Chart bars */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "flex-end",
                gap: 2,
                padding: "0 4px",
              }}
            >
              {chartPoints.filter((_, i) => i % 3 === 0).map((point, i) => (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${Math.min((point.mdr / maxMDR) * 100, 100)}%`,
                    borderRadius: "2px 2px 0 0",
                    background: point.mdr >= 300
                      ? "hsl(var(--warning))"
                      : "hsl(var(--primary))",
                    opacity: 0.8,
                    minWidth: 2,
                    transition: "height 0.3s ease",
                  }}
                />
              ))}
            </div>

            {/* X-axis labels */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: "calc(100% + 8px)",
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11,
                color: "hsl(var(--muted))",
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              <span>₹2K</span>
              <span>₹50K</span>
              <span>₹75K</span>
              <span>₹1L</span>
              <span>₹1.5L</span>
            </div>
          </div>
          <div style={{ fontSize: 12, color: "hsl(var(--muted))", textAlign: "center" }}>
            Payment Amount →
          </div>
        </div>

        {/* Table */}
        <div
          className="card-surface"
          style={{ padding: 0, overflow: "hidden", marginBottom: 24 }}
        >
          <div
            style={{
              padding: "16px 24px",
              borderBottom: "1px solid hsl(var(--border))",
              display: "grid",
              gridTemplateColumns: "1.5fr 1fr 1fr 0.8fr",
              gap: 12,
              fontSize: 12,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "hsl(var(--muted))",
            }}
          >
            <div>Amount</div>
            <div>0.4% Calculation</div>
            <div>Actual MDR</div>
            <div>Cap Status</div>
          </div>

          {results.map((item, i) => {
            const rawCharge = item.amount * 0.004;
            const isCapPoint = item.amount === 75000;

            return (
              <motion.div
                key={item.amount}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                style={{
                  padding: "14px 24px",
                  display: "grid",
                  gridTemplateColumns: "1.5fr 1fr 1fr 0.8fr",
                  gap: 12,
                  alignItems: "center",
                  borderBottom: "1px solid hsl(var(--border))",
                  background: isCapPoint
                    ? "hsl(var(--warning-light))"
                    : item.result.capReached
                      ? "hsl(var(--warning-light) / 0.3)"
                      : "transparent",
                }}
              >
                <div className="amount-display" style={{ fontSize: 15, fontWeight: 700 }}>
                  {formatINR(item.amount)}
                  {isCapPoint && (
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
                      }}
                    >
                      CAP POINT
                    </span>
                  )}
                </div>
                <div
                  className="amount-display"
                  style={{
                    fontSize: 14,
                    color: "hsl(var(--muted))",
                    textDecoration: item.result.capReached ? "line-through" : "none",
                  }}
                >
                  {formatINR(rawCharge, true)}
                </div>
                <div
                  className="amount-display"
                  style={{
                    fontSize: 15,
                    fontWeight: 600,
                    color: item.result.capReached
                      ? "hsl(var(--warning))"
                      : "hsl(var(--foreground))",
                  }}
                >
                  {formatINR(item.result.estimatedMDR, true)}
                </div>
                <div>
                  <span
                    style={{
                      padding: "4px 10px",
                      borderRadius: "var(--radius-full)",
                      fontSize: 11,
                      fontWeight: 600,
                      background: item.result.capReached
                        ? "hsl(var(--warning-light))"
                        : "hsl(var(--success-light))",
                      color: item.result.capReached
                        ? "hsl(var(--warning))"
                        : "hsl(var(--success))",
                    }}
                  >
                    {item.result.capReached ? "Capped" : "Below cap"}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Explanation */}
        <div className="card-surface" style={{ padding: 28 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <Info size={20} style={{ color: "hsl(var(--warning))", flexShrink: 0, marginTop: 2 }} />
            <div>
              <h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10 }}>
                Understanding the ₹300 Cap
              </h2>
              <div style={{ fontSize: 14, color: "hsl(var(--muted))", lineHeight: 1.8 }}>
                <p style={{ marginBottom: 10 }}>
                  At the standard 0.4% rate, the MDR reaches ₹300 exactly at a transaction
                  amount of ₹75,000 (0.4% × ₹75,000 = ₹300). For any transaction above
                  ₹75,000, the MDR remains capped at ₹300.
                </p>
                <p>
                  This cap is specific to the reported standard rule. Different merchant categories
                  or special classifications may have different cap structures. The cap logic is
                  rule-dependent and configurable in the rules engine.
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
