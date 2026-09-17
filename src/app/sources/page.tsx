import { Metadata } from "next";
import { resolveRuleset } from "@/lib/rules/resolver";
import { ExternalLink, Shield, Calendar, FileCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Sources — Official References for UPI Rules",
  description: "Complete source registry for UPI MDR rules. Every rule in our calculator is backed by official publications and verified reporting.",
};

export default function SourcesPage() {
  const ruleset = resolveRuleset();

  return (
    <section style={{ padding: "48px 0" }}>
      <div className="container-narrow">
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 56, height: 56, borderRadius: "var(--radius-md)",
            background: "hsl(var(--success-light))", marginBottom: 16,
          }}>
            <Shield size={28} style={{ color: "hsl(var(--success))" }} />
          </div>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 12 }}>
            Source Registry
          </h1>
          <p style={{ fontSize: 16, color: "hsl(var(--muted))", maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>
            Every rule in our calculator is sourced from official publications and verified reporting.
            Below are all sources consulted for the active ruleset.
          </p>
        </div>

        {/* Source Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 32 }}>
          {ruleset.sources.map((src, i) => (
            <div key={src.id} className="card-surface" style={{ padding: 24 }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <FileCheck size={18} style={{ color: "hsl(var(--primary))" }} />
                    <h2 style={{ fontSize: 16, fontWeight: 700, margin: 0 }}>
                      {src.title}
                    </h2>
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "hsl(var(--foreground))", marginBottom: 8 }}>
                    {src.publisher}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 16, fontSize: 13, color: "hsl(var(--muted))" }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Calendar size={13} /> Published: {src.publishedAt}
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Calendar size={13} /> Accessed: {src.accessedAt}
                    </span>
                  </div>
                </div>
                <a
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    padding: "8px 16px", borderRadius: "var(--radius-sm)",
                    border: "1px solid hsl(var(--border))",
                    fontSize: 13, fontWeight: 600, color: "hsl(var(--primary))",
                    textDecoration: "none", whiteSpace: "nowrap",
                    transition: "background 0.15s",
                  }}
                >
                  Visit Source <ExternalLink size={13} />
                </a>
              </div>

              {/* Rules using this source */}
              <div style={{ marginTop: 16, paddingTop: 12, borderTop: "1px solid hsl(var(--border))" }}>
                <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "hsl(var(--muted))", marginBottom: 8 }}>
                  Used by rules:
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {ruleset.rules
                    .filter((r) => r.sourceIds.includes(src.id))
                    .map((rule) => (
                      <span key={rule.id} style={{
                        padding: "4px 10px", borderRadius: "var(--radius-full)",
                        fontSize: 12, fontWeight: 500,
                        background: "hsl(var(--muted-bg))", color: "hsl(var(--foreground))",
                      }}>
                        {rule.id}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Verification Note */}
        <div className="card-surface" style={{
          padding: 24, borderLeft: "4px solid hsl(var(--warning))",
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Verification Note</h3>
          <p style={{ fontSize: 14, color: "hsl(var(--muted))", lineHeight: 1.7, margin: 0 }}>
            These sources were consulted while preparing the ruleset. The production implementation
            must verify the latest official material at launch time and whenever rules change.
            Regulatory sources may be updated or superseded. Always refer to the latest NPCI/RBI
            circular for authoritative information.
          </p>
        </div>
      </div>
    </section>
  );
}
