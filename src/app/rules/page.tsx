import { Metadata } from "next";
import Link from "next/link";
import { resolveRuleset } from "@/lib/rules/resolver";
import { Shield, ExternalLink, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Current UPI Rules — Active MDR Ruleset",
  description:
    "View the currently active UPI MDR ruleset with effective dates, rule details, and official source references.",
};

export default function RulesPage() {
  const ruleset = resolveRuleset();

  return (
    <section style={{ padding: "48px 0" }}>
      <div className="container-narrow">
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 56, height: 56, borderRadius: "var(--radius-md)",
              background: "hsl(263 84% 95%)", marginBottom: 16,
            }}
          >
            <FileText size={28} style={{ color: "hsl(263 84% 67%)" }} />
          </div>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 12 }}>
            Current UPI Rules
          </h1>
          <p style={{ fontSize: 16, color: "hsl(var(--muted))", maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>
            The active ruleset governing UPI MDR calculations, with source references and effective dates.
          </p>
        </div>

        {/* Ruleset Info */}
        <div className="card-surface" style={{ padding: 28, marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <Shield size={20} style={{ color: "hsl(var(--primary))" }} />
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Active Ruleset</h2>
          </div>
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 16,
          }}>
            {[
              { label: "Version", value: `v${ruleset.version}` },
              { label: "Status", value: ruleset.status.toUpperCase() },
              { label: "Effective From", value: new Date(ruleset.effectiveFrom).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }) },
              { label: "Currency", value: ruleset.currency },
            ].map((item) => (
              <div key={item.label} style={{
                padding: 14, borderRadius: "var(--radius-sm)",
                background: "hsl(var(--muted-bg))",
              }}>
                <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "hsl(var(--muted))", marginBottom: 4 }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 15, fontWeight: 600 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Rules */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
          {ruleset.rules.map((rule, i) => (
            <div key={rule.id} className="card-surface" style={{ padding: 24 }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                <div>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 6, padding: "4px 10px",
                    borderRadius: "var(--radius-full)", fontSize: 12, fontWeight: 600,
                    background: rule.transactionType === "P2P" ? "hsl(var(--success-light))" : "hsl(var(--primary-light))",
                    color: rule.transactionType === "P2P" ? "hsl(var(--success))" : "hsl(var(--primary))",
                    marginBottom: 8,
                  }}>
                    {rule.transactionType}
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700 }}>
                    {rule.transactionType === "P2P"
                      ? "Person-to-Person Transfer"
                      : rule.rateType === "NONE"
                        ? "P2M Below Threshold"
                        : "Standard P2M Transaction"}
                  </h3>
                </div>
                <span style={{
                  fontSize: 11, fontWeight: 600, color: "hsl(var(--muted))",
                  background: "hsl(var(--muted-bg))", padding: "4px 10px",
                  borderRadius: "var(--radius-full)",
                }}>
                  Priority: {rule.priority}
                </span>
              </div>

              <p style={{ fontSize: 14, color: "hsl(var(--muted))", lineHeight: 1.7, marginBottom: 16 }}>
                {rule.explanation}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                {rule.rateType !== "NONE" && rule.rate !== undefined && (
                  <div style={{ padding: "8px 14px", borderRadius: "var(--radius-sm)", background: "hsl(var(--muted-bg))", fontSize: 13 }}>
                    <strong>Rate:</strong> {(rule.rate * 100).toFixed(2)}%
                  </div>
                )}
                {rule.rateType === "NONE" && (
                  <div style={{ padding: "8px 14px", borderRadius: "var(--radius-sm)", background: "hsl(var(--success-light))", fontSize: 13, color: "hsl(var(--success))", fontWeight: 600 }}>
                    No MDR
                  </div>
                )}
                {rule.minAmount !== undefined && (
                  <div style={{ padding: "8px 14px", borderRadius: "var(--radius-sm)", background: "hsl(var(--muted-bg))", fontSize: 13 }}>
                    <strong>Threshold:</strong> Above ₹{rule.minAmount.toLocaleString("en-IN")}
                  </div>
                )}
                {rule.maxAmount !== undefined && (
                  <div style={{ padding: "8px 14px", borderRadius: "var(--radius-sm)", background: "hsl(var(--muted-bg))", fontSize: 13 }}>
                    <strong>Max Amount:</strong> ₹{rule.maxAmount.toLocaleString("en-IN")}
                  </div>
                )}
                {rule.cap !== undefined && (
                  <div style={{ padding: "8px 14px", borderRadius: "var(--radius-sm)", background: "hsl(var(--warning-light))", fontSize: 13 }}>
                    <strong>Cap:</strong> ₹{rule.cap.toLocaleString("en-IN")}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Sources */}
        <div className="card-surface" style={{ padding: 28 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>
            Source References
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {ruleset.sources.map((src) => (
              <div key={src.id} style={{
                padding: 16, borderRadius: "var(--radius-sm)",
                border: "1px solid hsl(var(--border))",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                flexWrap: "wrap", gap: 12,
              }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{src.title}</div>
                  <div style={{ fontSize: 12, color: "hsl(var(--muted))" }}>
                    {src.publisher} · Published {src.publishedAt} · Accessed {src.accessedAt}
                  </div>
                </div>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    fontSize: 13, color: "hsl(var(--primary))", textDecoration: "none",
                  }}
                >
                  Visit <ExternalLink size={12} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
