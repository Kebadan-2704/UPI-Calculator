import { Metadata } from "next";
import Link from "next/link";
import { generateBreadcrumbSchema, schemaToScriptProps } from "@/lib/seo/schemas";

export const metadata: Metadata = {
  title: "Changelog — Updates & Version History",
  description: "Version history and changelog for UPI Cost Calculator. Track ruleset changes, calculator updates, and content additions.",
  alternates: {
    canonical: "/changelog",
  },
};

const CHANGELOG_ENTRIES = [
  {
    version: "1.0.0",
    date: "September 2026",
    type: "Initial Release" as const,
    changes: [
      "Launched UPI Cost Calculator with MDR calculation engine",
      "Implemented rules-driven architecture with versioned rulesets",
      "Added October 2026 baseline ruleset (0.4% MDR, ₹2,000 threshold, ₹300 cap)",
      "Built P2P/P2M transaction classification",
      "Created decimal-safe arithmetic engine (Decimal.js)",
      "Added payment breakdown, threshold, and cap calculators",
      "Published educational articles on UPI MDR topics",
      "Implemented source-backed methodology with NPCI/Reuters/ET citations",
      "Added PDF receipt download and QR code generation",
      "Built responsive design with light/dark mode",
      "Added Hindi language support",
      "Implemented PWA with offline calculation support",
      "Added structured data (WebSite, WebApplication, FAQPage, Article, BreadcrumbList schemas)",
      "Created XML sitemap and robots.txt for search engine discovery",
      "Published source registry, methodology, FAQ, and legal pages",
    ],
  },
];

export default function ChangelogPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Changelog", path: "/changelog" },
  ]);

  return (
    <>
      <script {...schemaToScriptProps(breadcrumbSchema)} />

      <section style={{ padding: "48px 0" }}>
        <div className="container-narrow">
          <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 12 }}>
            Changelog
          </h1>
          <p style={{ fontSize: 16, color: "hsl(var(--muted))", lineHeight: 1.6, marginBottom: 40 }}>
            Version history and updates to the calculator, rulesets, and content.
          </p>

          {CHANGELOG_ENTRIES.map((entry) => (
            <div key={entry.version} style={{ marginBottom: 48 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                <span
                  style={{
                    padding: "4px 12px",
                    borderRadius: "var(--radius-full)",
                    background: "hsl(var(--primary))",
                    color: "hsl(var(--primary-foreground))",
                    fontSize: 13,
                    fontWeight: 700,
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  v{entry.version}
                </span>
                <span style={{ fontSize: 14, color: "hsl(var(--muted))" }}>{entry.date}</span>
                <span
                  style={{
                    padding: "2px 10px",
                    borderRadius: "var(--radius-full)",
                    border: "1px solid hsl(var(--success))",
                    color: "hsl(var(--success))",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                >
                  {entry.type}
                </span>
              </div>

              <ul style={{ paddingLeft: 24, fontSize: 14, lineHeight: 2, color: "hsl(var(--foreground))" }}>
                {entry.changes.map((change, i) => (
                  <li key={i}>{change}</li>
                ))}
              </ul>
            </div>
          ))}

          <div style={{ padding: 20, borderRadius: "var(--radius-md)", background: "hsl(var(--muted-bg))", fontSize: 14, color: "hsl(var(--muted))" }}>
            <p style={{ margin: 0 }}>
              When rules change, a new versioned ruleset is published and documented here.
              Previous rulesets remain accessible for reference. View our{" "}
              <Link href="/methodology" style={{ color: "hsl(var(--primary))" }}>methodology</Link> and{" "}
              <Link href="/sources" style={{ color: "hsl(var(--primary))" }}>sources</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
