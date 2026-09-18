import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Info } from "lucide-react";
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema, schemaToScriptProps } from "@/lib/seo/schemas";

export const metadata: Metadata = {
  title: "UPI Merchant Charges & Gateway Fees Explained (2026)",
  description: "A comprehensive guide to UPI merchant charges, payment gateway fees, MDR limits, and settlement costs for Indian businesses.",
  alternates: {
    canonical: "/upi-merchant-charges",
  },
};

const ARTICLE_FAQS = [
  {
    q: "Are there any hidden merchant charges for UPI?",
    a: "Standard UPI MDR is capped at 0.4% (max ₹300) for transactions above ₹2,000. However, payment gateways may charge additional platform fees, subscription fees, or GST on the MDR amount.",
  },
  {
    q: "Do I have to pay charges for receiving small UPI payments?",
    a: "No. According to the reported rules, P2M (person-to-merchant) UPI payments of ₹2,000 or below do not attract the standard MDR.",
  },
  {
    q: "Can my payment gateway charge more than the official MDR?",
    a: "While the base MDR is regulated, payment aggregators (PGs) may charge software fees, routing fees, or value-added service fees on top of the base MDR. Always check your specific merchant agreement.",
  },
];

export default function UPIMerchantChargesPage() {
  const articleSchema = generateArticleSchema({
    title: "UPI Merchant Charges & Gateway Fees Explained",
    description: "A comprehensive guide to UPI merchant charges, payment gateway fees, MDR limits, and settlement costs for Indian businesses.",
    path: "/upi-merchant-charges",
    datePublished: "2026-09-17",
    dateModified: "2026-09-18",
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Merchant Charges", path: "/upi-merchant-charges" },
  ]);
  const faqSchema = generateFAQSchema(ARTICLE_FAQS);

  return (
    <>
      <script {...schemaToScriptProps(articleSchema)} />
      <script {...schemaToScriptProps(breadcrumbSchema)} />
      <script {...schemaToScriptProps(faqSchema)} />

      <section style={{ padding: "48px 0" }}>
        <div className="container-narrow">
          <div style={{ marginBottom: 32 }}>
            <Link href="/" style={{ fontSize: 13, color: "hsl(var(--primary))", textDecoration: "none", fontWeight: 500 }}>
              ← Back to Home
            </Link>
          </div>

          <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 12 }}>
            UPI Merchant Charges & Gateway Fees Explained
          </h1>
          <p style={{ fontSize: 18, color: "hsl(var(--muted))", lineHeight: 1.7, marginBottom: 32 }}>
            A complete guide for Indian businesses on what it actually costs to accept UPI payments,
            including MDR, gateway markups, and GST.
          </p>

          <article style={{ fontSize: 15, lineHeight: 1.9, color: "hsl(var(--foreground))" }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>1. The Base UPI Cost: MDR</h2>
            <p>
              The core cost of accepting a UPI payment is the <strong>Merchant Discount Rate (MDR)</strong>.
              As of the reported October 2026 framework, this is a regulated fee structure designed to
              compensate the payment networks and banks.
            </p>
            <ul style={{ paddingLeft: 24, margin: "12px 0" }}>
              <li><strong>Transactions ≤ ₹2,000:</strong> Zero base MDR.</li>
              <li><strong>Transactions &gt; ₹2,000:</strong> 0.4% of the transaction amount.</li>
              <li><strong>Maximum Cap:</strong> ₹300 per transaction.</li>
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>2. Payment Gateway Markups</h2>
            <p>
              If you use a Payment Aggregator (PA) or Payment Gateway (PG) like Razorpay, Cashfree, or
              PayU to process online UPI payments, they may charge additional fees. These can include:
            </p>
            <ul style={{ paddingLeft: 24, margin: "12px 0" }}>
              <li><strong>Platform Fees:</strong> A flat monthly fee for using their software.</li>
              <li><strong>Transaction Markups:</strong> Some gateways may add a small percentage (e.g., 0.1% to 0.5%) on top of the base MDR for providing checkout services, analytics, and instant refunds.</li>
              <li><strong>Instant Settlement Fees:</strong> PGs typically settle on T+1 or T+2. If you want instant settlement, they often charge an additional 0.15% to 0.30% per transaction.</li>
            </ul>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "12px 16px", borderRadius: "var(--radius-sm)", background: "hsl(var(--primary-light))", color: "hsl(var(--foreground))", margin: "24px 0" }}>
              <Info size={18} style={{ flexShrink: 0, marginTop: 2, color: "hsl(var(--primary))" }} />
              <div style={{ fontSize: 14, lineHeight: 1.6 }}>
                <strong>Tip for Merchants:</strong> When negotiating with a payment gateway, ask for a clear breakdown of the "Base Network MDR" versus the "Gateway Markup."
              </div>
            </div>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>3. GST on Payment Services</h2>
            <p>
              Payment processing is considered a taxable service under Indian law. Therefore, an
              <strong>18% Goods and Services Tax (GST)</strong> is applied to the fee charged by the gateway or network.
            </p>
            <p>
              <em>Crucially, this GST is applied to the MDR amount, not the total transaction amount.</em>
            </p>
            <p>
              For example, if the MDR on a transaction is ₹40, the GST is ₹7.20 (18% of ₹40). The total deduction from your settlement is ₹47.20. You can use our <Link href="/gst-on-mdr" style={{ color: "hsl(var(--primary))" }}>GST on MDR calculator</Link> to model this.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>4. Hardware and Soundbox Fees</h2>
            <p>
              For offline merchants using QR codes, the primary additional cost is often the lease or subscription fee for a "Soundbox" (audio confirmation device) or a POS terminal.
            </p>
            <ul style={{ paddingLeft: 24, margin: "12px 0" }}>
              <li><strong>Soundbox Subscription:</strong> Typically ₹100 to ₹150 per month.</li>
              <li>These monthly rentals are fixed costs and do not scale with your transaction volume.</li>
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>Summary: The True Cost per Transaction</h2>
            <p>To calculate the true cost of a single transaction, the formula is:</p>
            <div style={{ padding: 16, borderRadius: "var(--radius-sm)", background: "hsl(var(--muted-bg))", fontFamily: "'JetBrains Mono', monospace", fontSize: 14, lineHeight: 2, margin: "16px 0" }}>
              True Cost = (Base MDR) + (Gateway Markup) + (18% GST on the sum of MDR and Markup)
            </div>

            {/* FAQ */}
            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 40, marginBottom: 16 }}>Frequently Asked Questions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {ARTICLE_FAQS.map((faq) => (
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

          <div style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 12 }}>
            <Link href="/calculator" className="gradient-primary" style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px",
              borderRadius: "var(--radius-sm)", color: "white", textDecoration: "none", fontWeight: 600,
            }}>
              Calculate Your MDR <ArrowRight size={16} />
            </Link>
            <Link href="/upi-settlement-calculator" className="card-surface" style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px",
              borderRadius: "var(--radius-sm)", color: "hsl(var(--foreground))", textDecoration: "none", fontWeight: 600,
            }}>
              Estimate Settlement
            </Link>
          </div>

          <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid hsl(var(--border))", fontSize: 13, color: "hsl(var(--muted))" }}>
            Last updated: September 2026. Disclaimer: Pricing and models vary by provider. Always consult your service agreement.
          </div>
        </div>
      </section>
    </>
  );
}
