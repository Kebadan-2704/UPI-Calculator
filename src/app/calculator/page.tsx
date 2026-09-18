import type { Metadata } from "next";
import { CalculatorWidget } from "@/components/calculator/CalculatorWidget";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  schemaToScriptProps,
} from "@/lib/seo/schemas";

export const metadata: Metadata = {
  title: "UPI MDR Calculator — Calculate Merchant Discount Rate",
  description:
    "Calculate the estimated UPI Merchant Discount Rate (MDR) for any transaction amount. Supports P2P and P2M classification, threshold (₹2,000), and cap (₹300) calculations. Free, instant, and source-backed.",
  alternates: {
    canonical: "/calculator",
  },
};

const CALCULATOR_FAQS = [
  {
    q: "How is UPI MDR calculated?",
    a: "For P2M transactions above ₹2,000, a 0.4% MDR is applied to the full transaction amount. The MDR is capped at ₹300 per transaction (reached at ₹75,000). P2P transfers and P2M transactions at or below ₹2,000 are not subject to the standard MDR.",
  },
  {
    q: "What is the formula for MDR calculation?",
    a: "MDR = Transaction Amount × 0.4% (0.004). For example, ₹10,000 × 0.004 = ₹40. If the calculated MDR exceeds ₹300, it is capped at ₹300.",
  },
  {
    q: "Is this calculator free to use?",
    a: "Yes. The UPI MDR Calculator is completely free and runs entirely in your browser. No account creation is required, and no payment data is collected.",
  },
];

export default function CalculatorPage() {
  const webAppSchema = generateWebApplicationSchema();
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Calculator", path: "/calculator" },
  ]);
  const faqSchema = generateFAQSchema(CALCULATOR_FAQS);

  return (
    <>
      <script {...schemaToScriptProps(webAppSchema)} />
      <script {...schemaToScriptProps(breadcrumbSchema)} />
      <script {...schemaToScriptProps(faqSchema)} />

      <section style={{ padding: "48px 0" }}>
        <div className="container-narrow">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h1
              style={{
                fontSize: "clamp(24px, 4vw, 36px)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                marginBottom: 12,
              }}
            >
              UPI MDR Calculator
            </h1>
            <p
              style={{
                fontSize: 16,
                color: "hsl(var(--muted))",
                maxWidth: 500,
                margin: "0 auto",
                lineHeight: 1.6,
              }}
            >
              Enter a payment amount and transaction type to calculate the estimated
              Merchant Discount Rate under the reported October 2026 rules.
            </p>
          </div>

          <CalculatorWidget />

          {/* Educational content below calculator */}
          <article
            className="card-surface"
            style={{ marginTop: 40, padding: 32 }}
          >
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
              How This Calculator Works
            </h2>
            <div style={{ fontSize: 14, color: "hsl(var(--muted))", lineHeight: 1.8 }}>
              <p style={{ marginBottom: 12 }}>
                This calculator uses a <strong>rules-driven engine</strong> that evaluates
                your transaction against the currently active ruleset. The evaluation follows
                this order:
              </p>
              <ol style={{ paddingLeft: 20, margin: "12px 0" }}>
                <li>Classify the transaction as P2P (person-to-person) or P2M (person-to-merchant)</li>
                <li>Check for exemptions (P2P transfers have no merchant MDR)</li>
                <li>Check the threshold (transactions at or below ₹2,000 are below the standard threshold)</li>
                <li>Apply the percentage rate (0.4% for standard P2M above threshold)</li>
                <li>Apply the cap (₹300 maximum for standard transactions)</li>
                <li>Calculate the estimated merchant net amount</li>
              </ol>
              <p style={{ marginBottom: 12 }}>
                <strong>Important:</strong> The MDR is a merchant-side cost. It is not a fee
                charged to the customer making the payment. The calculator shows estimated
                costs based on reported rules — actual settlement may vary based on merchant
                classification, category, and acquirer agreements.
              </p>
              <p>
                All calculations use <strong>decimal-safe arithmetic</strong> (Decimal.js) to prevent
                floating-point rounding errors common in financial calculations.
              </p>
            </div>

            {/* Formula section for AI/snippet friendliness */}
            <h3 style={{ fontSize: 16, fontWeight: 700, marginTop: 24, marginBottom: 8 }}>
              MDR Formula
            </h3>
            <div
              style={{
                padding: 16,
                borderRadius: "var(--radius-sm)",
                background: "hsl(var(--muted-bg))",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 14,
                lineHeight: 1.8,
              }}
            >
              <div>MDR = Transaction Amount × Rate (0.4%)</div>
              <div>If MDR &gt; ₹300 → MDR = ₹300 (cap)</div>
              <div>Net Settlement = Transaction Amount − MDR</div>
            </div>

            {/* Worked example */}
            <h3 style={{ fontSize: 16, fontWeight: 700, marginTop: 24, marginBottom: 8 }}>
              Example Calculation
            </h3>
            <div style={{ fontSize: 14, color: "hsl(var(--muted))", lineHeight: 1.8 }}>
              <p>
                For a ₹10,000 P2M transaction:
              </p>
              <ul style={{ paddingLeft: 20, margin: "8px 0" }}>
                <li>Transaction amount: ₹10,000</li>
                <li>MDR: ₹10,000 × 0.4% = <strong>₹40</strong></li>
                <li>Cap check: ₹40 &lt; ₹300 (cap not reached)</li>
                <li>Estimated net settlement: ₹10,000 − ₹40 = <strong>₹9,960</strong></li>
              </ul>
            </div>
          </article>

          {/* FAQ section */}
          <div style={{ marginTop: 40 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 16 }}>
              Calculator FAQ
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {CALCULATOR_FAQS.map((faq) => (
                <details
                  key={faq.q}
                  className="card-surface"
                  style={{ borderRadius: "var(--radius-md)", cursor: "pointer" }}
                >
                  <summary
                    style={{
                      padding: "18px 20px",
                      fontSize: 15,
                      fontWeight: 600,
                      listStyle: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    {faq.q}
                    <span style={{ color: "hsl(var(--muted))", fontSize: 18, flexShrink: 0, marginLeft: 12 }}>+</span>
                  </summary>
                  <div
                    style={{
                      padding: "0 20px 18px",
                      fontSize: 14,
                      color: "hsl(var(--muted))",
                      lineHeight: 1.8,
                    }}
                  >
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Source attribution */}
          <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid hsl(var(--border))", fontSize: 13, color: "hsl(var(--muted))" }}>
            Rules effective from 15 October 2026. Last reviewed: September 2026.
          </div>
        </div>
      </section>
    </>
  );
}
