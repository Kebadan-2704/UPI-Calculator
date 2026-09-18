import { Metadata } from "next";
import Link from "next/link";
import { generateBreadcrumbSchema, schemaToScriptProps } from "@/lib/seo/schemas";

export const metadata: Metadata = {
  title: "Methodology — How Our Calculator Works",
  description: "Detailed methodology behind UPI Cost Calculator: formulas, rounding rules, source verification process, and calculation engine architecture.",
  alternates: {
    canonical: "/methodology",
  },
};

export default function MethodologyPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Methodology", path: "/methodology" },
  ]);

  return (
    <>
      <script {...schemaToScriptProps(breadcrumbSchema)} />

      <section style={{ padding: "48px 0" }}>
        <div className="container-narrow">
          <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 24 }}>
            Calculation Methodology
          </h1>

          <article style={{ fontSize: 15, lineHeight: 1.9, color: "hsl(var(--foreground))" }}>
            <p style={{ fontSize: 18, color: "hsl(var(--muted))", lineHeight: 1.7, marginBottom: 24 }}>
              This document describes exactly how our calculator processes transactions,
              what assumptions are made, and how we verify the rules used.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>Calculation Engine</h2>
            <p>
              Our calculation engine is a deterministic, rules-driven system. It evaluates
              each transaction against a versioned ruleset in the following order:
            </p>
            <ol style={{ paddingLeft: 24, margin: "12px 0", lineHeight: 2 }}>
              <li><strong>Validate</strong> — Ensure amount is positive and within limits</li>
              <li><strong>Classify</strong> — Determine P2P (person-to-person) or P2M (person-to-merchant)</li>
              <li><strong>Match rule</strong> — Find the applicable rule by type, category, amount range, and conditions</li>
              <li><strong>Check exemptions</strong> — P2P transfers and amounts below threshold are exempt</li>
              <li><strong>Apply rate</strong> — Calculate MDR using percentage or flat rate</li>
              <li><strong>Apply cap</strong> — Enforce maximum charge limit</li>
              <li><strong>Calculate net</strong> — Compute estimated merchant settlement</li>
            </ol>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>Arithmetic Precision</h2>
            <p>
              All financial calculations use <strong>Decimal.js</strong> with 20-digit precision
              and ROUND_HALF_UP rounding. This prevents floating-point artifacts common in
              JavaScript&apos;s native number handling.
            </p>
            <p>
              Internal calculations are performed in rupees with decimal precision.
              Display values are formatted to 2 decimal places for currency amounts.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>Current Rules (v1.0.0)</h2>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid hsl(var(--border))" }}>
                    <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600 }}>Parameter</th>
                    <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600 }}>Value</th>
                    <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600 }}>Source</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { param: "MDR Rate", value: "0.4% (0.004)", source: "NPCI Circular, Reuters" },
                    { param: "Threshold", value: "₹2,000 (P2M only)", source: "Reuters, Economic Times" },
                    { param: "Cap", value: "₹300 per transaction", source: "Indian Express, Reuters" },
                    { param: "Cap starts at", value: "₹75,000", source: "Calculated: ₹300 ÷ 0.004" },
                    { param: "P2P treatment", value: "No MDR", source: "NPCI Circular, Reuters" },
                    { param: "Effective date", value: "15 October 2026", source: "Economic Times" },
                  ].map((row) => (
                    <tr key={row.param} style={{ borderBottom: "1px solid hsl(var(--border))" }}>
                      <td style={{ padding: "10px 12px", fontWeight: 500 }}>{row.param}</td>
                      <td style={{ padding: "10px 12px", fontFamily: "'JetBrains Mono', monospace" }}>{row.value}</td>
                      <td style={{ padding: "10px 12px", color: "hsl(var(--muted))", fontSize: 13 }}>{row.source}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>Source Verification</h2>
            <p>
              Every rule in the calculator is sourced from at least one of the following:
            </p>
            <ul style={{ paddingLeft: 24, margin: "12px 0" }}>
              <li><strong>Primary sources:</strong> NPCI circulars, RBI notifications</li>
              <li><strong>Secondary sources:</strong> Reuters, Economic Times, Indian Express</li>
            </ul>
            <p>
              Each source is recorded with its title, publisher, URL, publication date,
              and the date we last accessed/verified it. View the full registry at{" "}
              <Link href="/sources" style={{ color: "hsl(var(--primary))" }}>Sources</Link>.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>Assumptions</h2>
            <ul style={{ paddingLeft: 24, margin: "12px 0" }}>
              <li>The calculator applies the <strong>standard</strong> MDR baseline. Actual rates may differ by merchant category, acquirer agreement, or special classification.</li>
              <li>The threshold is applied <strong>per transaction</strong> as reported.</li>
              <li>The MDR applies to the <strong>full transaction amount</strong>, not just the portion above the threshold.</li>
              <li>Results are <strong>estimates</strong> and should not be used as the sole basis for financial decisions.</li>
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>Limitations</h2>
            <ul style={{ paddingLeft: 24, margin: "12px 0" }}>
              <li>Does not account for individual acquirer/merchant agreements</li>
              <li>Does not include GST on MDR (available at <Link href="/gst-on-mdr" style={{ color: "hsl(var(--primary))" }}>GST Calculator</Link>)</li>
              <li>Does not reflect special-category merchant treatment unless verified</li>
              <li>Cannot guarantee accuracy for future regulatory changes</li>
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>Update Process</h2>
            <p>
              When sources change, we follow this process:
            </p>
            <ol style={{ paddingLeft: 24, margin: "12px 0" }}>
              <li>Identify the changed regulatory information</li>
              <li>Verify against primary sources</li>
              <li>Create a new versioned ruleset</li>
              <li>Update calculations and test against all edge cases</li>
              <li>Update the methodology, sources, and review date</li>
              <li>Publish the updated calculator</li>
              <li>Document the change in the <Link href="/changelog" style={{ color: "hsl(var(--primary))" }}>changelog</Link></li>
            </ol>
          </article>

          <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid hsl(var(--border))", fontSize: 13, color: "hsl(var(--muted))" }}>
            Last updated: September 2026
          </div>
        </div>
      </section>
    </>
  );
}
