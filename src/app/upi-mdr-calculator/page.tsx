import type { Metadata } from "next";
import { CalculatorWidget } from "@/components/calculator/CalculatorWidget";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import {
  generateWebApplicationSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  schemaToScriptProps,
} from "@/lib/seo/schemas";

export const metadata: Metadata = {
  title: "UPI MDR Calculator India (2026) — Calculate Merchant Charges Free",
  description:
    "Free UPI MDR Calculator for India. Calculate merchant discount rate, net settlement, and payment charges instantly. Supports threshold (₹2,000), cap (₹300), P2P and P2M. Updated for October 2026 rules.",
  alternates: {
    canonical: "/upi-mdr-calculator",
  },
  keywords: [
    "UPI MDR calculator",
    "UPI MDR calculator India",
    "MDR calculator",
    "QR MDR calculator",
    "UPI merchant charges calculator",
    "merchant discount rate calculator",
  ],
};

const PAGE_FAQS = [
  {
    q: "What is UPI MDR?",
    a: "UPI MDR (Merchant Discount Rate) is a fee charged to merchants — not customers — when they accept UPI payments. For P2M transactions above ₹2,000, the standard rate is 0.4%, capped at ₹300 per transaction.",
  },
  {
    q: "How do I calculate UPI MDR?",
    a: "Enter the transaction amount above. For P2M payments above ₹2,000, multiply the amount by 0.004 (0.4%). If the result exceeds ₹300, the MDR is capped at ₹300. P2P transfers and payments ≤ ₹2,000 have no standard MDR.",
  },
  {
    q: "Is UPI MDR charged to the customer?",
    a: "No. UPI MDR is a merchant-side cost deducted from the merchant's settlement. Customers pay the full transaction amount.",
  },
  {
    q: "What is the UPI MDR cap?",
    a: "The MDR is capped at ₹300 per transaction. At 0.4%, this cap is reached at ₹75,000 (0.4% × ₹75,000 = ₹300). Transactions above ₹75,000 still pay only ₹300 MDR.",
  },
  {
    q: "Does UPI MDR apply to all transactions?",
    a: "No. P2P (person-to-person) transfers are free. P2M (merchant) payments at or below ₹2,000 are below the standard MDR threshold. Only P2M transactions above ₹2,000 attract the 0.4% MDR.",
  },
  {
    q: "When does the 2026 UPI MDR come into effect?",
    a: "The reported effective date is 15 October 2026. Always verify with the latest official NPCI/RBI circular before making financial decisions.",
  },
];

export default function UPIMDRCalculatorPage() {
  const webAppSchema = generateWebApplicationSchema({
    name: "UPI MDR Calculator India",
    description: "Free UPI MDR Calculator for India. Calculate merchant discount rate, net settlement, and payment charges instantly.",
    url: "/upi-mdr-calculator",
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "UPI MDR Calculator", path: "/upi-mdr-calculator" },
  ]);
  const faqSchema = generateFAQSchema(PAGE_FAQS);

  return (
    <>
      <script {...schemaToScriptProps(webAppSchema)} />
      <script {...schemaToScriptProps(breadcrumbSchema)} />
      <script {...schemaToScriptProps(faqSchema)} />

      <section style={{ padding: "48px 0" }}>
        <div className="container-wide">
          {/* Hero */}
          <div style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 40px" }}>
            <h1
              style={{
                fontSize: "clamp(26px, 5vw, 44px)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                marginBottom: 16,
              }}
            >
              UPI MDR Calculator
            </h1>
            <p
              style={{
                fontSize: "clamp(15px, 2.5vw, 18px)",
                color: "hsl(var(--muted))",
                lineHeight: 1.6,
                maxWidth: 560,
                margin: "0 auto",
              }}
            >
              Calculate merchant discount rate, net settlement amount, and estimated charges
              for any UPI transaction. Free, instant, source-backed.
            </p>
          </div>

          {/* Calculator */}
          <CalculatorWidget />

          {/* Educational content */}
          <div className="container-narrow" style={{ marginTop: 48 }}>
            <article style={{ fontSize: 15, lineHeight: 1.9 }}>
              {/* Definition — AI snippet target */}
              <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
                What is UPI MDR?
              </h2>
              <p>
                <strong>UPI MDR (Merchant Discount Rate)</strong> is a transaction-processing fee charged to
                merchants for accepting Unified Payments Interface (UPI) payments. It is <em>not</em> a
                customer-facing fee — the merchant bears this cost, which is deducted from their settlement.
              </p>

              {/* Formula — snippet/AI target */}
              <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>
                MDR Calculation Formula
              </h2>
              <div
                style={{
                  padding: 20,
                  borderRadius: "var(--radius-md)",
                  background: "hsl(var(--muted-bg))",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 14,
                  lineHeight: 2,
                  marginBottom: 16,
                }}
              >
                <div><strong>Step 1:</strong> Check if amount &gt; ₹2,000 (threshold)</div>
                <div><strong>Step 2:</strong> MDR = Amount × 0.4%</div>
                <div><strong>Step 3:</strong> If MDR &gt; ₹300 → MDR = ₹300 (cap)</div>
                <div><strong>Step 4:</strong> Net Settlement = Amount − MDR</div>
              </div>

              {/* Reference table */}
              <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>
                UPI MDR Reference Table
              </h2>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid hsl(var(--border))" }}>
                      <th style={{ padding: "12px", textAlign: "left", fontWeight: 600 }}>Amount</th>
                      <th style={{ padding: "12px", textAlign: "left", fontWeight: 600 }}>MDR</th>
                      <th style={{ padding: "12px", textAlign: "left", fontWeight: 600 }}>Net Settlement</th>
                      <th style={{ padding: "12px", textAlign: "left", fontWeight: 600 }}>Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { a: "₹500", m: "₹0", n: "₹500", note: "Below threshold" },
                      { a: "₹2,000", m: "₹0", n: "₹2,000", note: "At threshold" },
                      { a: "₹5,000", m: "₹20", n: "₹4,980", note: "Standard rate" },
                      { a: "₹10,000", m: "₹40", n: "₹9,960", note: "Standard rate" },
                      { a: "₹25,000", m: "₹100", n: "₹24,900", note: "Standard rate" },
                      { a: "₹50,000", m: "₹200", n: "₹49,800", note: "Standard rate" },
                      { a: "₹75,000", m: "₹300", n: "₹74,700", note: "Cap reached" },
                      { a: "₹1,00,000", m: "₹300", n: "₹99,700", note: "Cap applied" },
                    ].map((row) => (
                      <tr key={row.a} style={{ borderBottom: "1px solid hsl(var(--border))" }}>
                        <td style={{ padding: "10px 12px", fontFamily: "'JetBrains Mono', monospace" }}>{row.a}</td>
                        <td style={{ padding: "10px 12px", fontFamily: "'JetBrains Mono', monospace" }}>{row.m}</td>
                        <td style={{ padding: "10px 12px", fontFamily: "'JetBrains Mono', monospace" }}>{row.n}</td>
                        <td style={{ padding: "10px 12px", color: "hsl(var(--muted))" }}>{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Key rules summary */}
              <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>
                Key UPI MDR Rules (October 2026)
              </h2>
              <ul style={{ paddingLeft: 24, lineHeight: 2.2 }}>
                <li><strong>Rate:</strong> 0.4% of transaction amount</li>
                <li><strong>Threshold:</strong> Applies only to P2M transactions above ₹2,000</li>
                <li><strong>Cap:</strong> Maximum ₹300 per transaction</li>
                <li><strong>P2P:</strong> Person-to-person transfers remain free</li>
                <li><strong>Effective date:</strong> 15 October 2026 (reported)</li>
              </ul>

              <div style={{
                padding: 20, borderRadius: "var(--radius-md)", background: "hsl(var(--warning-light))",
                border: "1px solid hsl(var(--warning) / 0.3)", marginTop: 24, marginBottom: 24,
              }}>
                <p style={{ margin: 0, fontSize: 14 }}>
                  <strong>⚠️ Disclaimer:</strong> This calculator provides estimates based on reported rules.
                  Actual charges may vary based on merchant classification, acquirer agreements, and regulatory changes.
                  Always verify with the latest official NPCI/RBI circular.
                </p>
              </div>

              {/* Related tools */}
              <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 32, marginBottom: 16 }}>
                Related Tools
              </h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
                {[
                  { label: "UPI Settlement Calculator", href: "/upi-settlement-calculator", desc: "Estimate net settlement amount" },
                  { label: "GST on MDR", href: "/gst-on-mdr", desc: "Calculate GST component on MDR" },
                  { label: "Payment Breakdown", href: "/payment-breakdown", desc: "Full gross → net breakdown" },
                  { label: "Threshold Calculator", href: "/threshold", desc: "Understand the ₹2,000 boundary" },
                ].map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="card-surface"
                    style={{ display: "block", padding: 16, textDecoration: "none", color: "inherit" }}
                  >
                    <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{tool.label}</div>
                    <div style={{ fontSize: 13, color: "hsl(var(--muted))" }}>{tool.desc}</div>
                  </Link>
                ))}
              </div>

              {/* FAQ */}
              <h2 style={{ fontSize: 22, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>
                Frequently Asked Questions
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {PAGE_FAQS.map((faq) => (
                  <details
                    key={faq.q}
                    className="card-surface"
                    style={{ borderRadius: "var(--radius-md)", cursor: "pointer" }}
                  >
                    <summary style={{ padding: "16px 18px", fontSize: 14, fontWeight: 600, listStyle: "none", display: "flex", justifyContent: "space-between" }}>
                      {faq.q}
                      <span style={{ color: "hsl(var(--muted))", flexShrink: 0, marginLeft: 12 }}>+</span>
                    </summary>
                    <div style={{ padding: "0 18px 16px", fontSize: 14, color: "hsl(var(--muted))", lineHeight: 1.7 }}>
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </article>

            {/* Source attribution */}
            <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid hsl(var(--border))", fontSize: 13, color: "hsl(var(--muted))" }}>
              Rules effective from 15 October 2026. Last reviewed: September 2026. ·{" "}
              <Link href="/sources" style={{ color: "hsl(var(--primary))", textDecoration: "none" }}>View sources</Link> ·{" "}
              <Link href="/methodology" style={{ color: "hsl(var(--primary))", textDecoration: "none" }}>Methodology</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
