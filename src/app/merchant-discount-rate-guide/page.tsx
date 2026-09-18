import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { generateArticleSchema, generateBreadcrumbSchema, schemaToScriptProps } from "@/lib/seo/schemas";

export const metadata: Metadata = {
  title: "Merchant Discount Rate (MDR) Guide: Everything You Need to Know",
  description: "A complete guide to Merchant Discount Rate (MDR) in India. Learn what it is, how it's calculated, and how the 2026 UPI MDR rules affect your business.",
  alternates: {
    canonical: "/merchant-discount-rate-guide",
  },
};

export default function MDRGuidePage() {
  const articleSchema = generateArticleSchema({
    title: "Merchant Discount Rate (MDR) Guide: Everything You Need to Know",
    description: "A complete guide to Merchant Discount Rate (MDR) in India. Learn what it is, how it's calculated, and how the 2026 UPI MDR rules affect your business.",
    path: "/merchant-discount-rate-guide",
    datePublished: "2026-09-17",
    dateModified: "2026-09-18",
  });
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "MDR Guide", path: "/merchant-discount-rate-guide" },
  ]);

  return (
    <>
      <script {...schemaToScriptProps(articleSchema)} />
      <script {...schemaToScriptProps(breadcrumbSchema)} />

      <section style={{ padding: "48px 0" }}>
        <div className="container-narrow">
          <div style={{ marginBottom: 32 }}>
            <Link href="/" style={{ fontSize: 13, color: "hsl(var(--primary))", textDecoration: "none", fontWeight: 500 }}>
              ← Back to Home
            </Link>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ width: 44, height: 44, borderRadius: "var(--radius-sm)", background: "hsl(var(--primary-light))", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <BookOpen size={22} style={{ color: "hsl(var(--primary))" }} />
            </div>
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "hsl(var(--primary))" }}>Guide</div>
              <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>The Ultimate Guide to MDR</h1>
            </div>
          </div>

          <p style={{ fontSize: 18, color: "hsl(var(--muted))", lineHeight: 1.7, marginBottom: 32 }}>
            Understand the Merchant Discount Rate (MDR): What it is, why it exists, and how the new 2026 rules for UPI MDR impact Indian businesses.
          </p>

          <article style={{ fontSize: 15, lineHeight: 1.9, color: "hsl(var(--foreground))" }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>What is Merchant Discount Rate (MDR)?</h2>
            <p>
              The <strong>Merchant Discount Rate (MDR)</strong> is the fee that a merchant pays to a bank or payment service provider for processing digital transactions. When a customer pays using a debit card, credit card, or UPI, the transaction isn't entirely free to process. The infrastructure—servers, security protocols, network routing, and settlement systems—requires maintenance.
            </p>
            <p>
              The MDR is the mechanism to cover these costs. It is typically expressed as a percentage of the total transaction volume.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>How is the MDR Split?</h2>
            <p>
              The MDR isn't kept by just one entity. It's divided among the key players in the payment ecosystem. While exact splits vary by network (Visa, Mastercard, RuPay, UPI), the general structure includes:
            </p>
            <ul style={{ paddingLeft: 24, margin: "12px 0" }}>
              <li><strong>The Acquirer (Merchant's Bank/Provider):</strong> Provides the POS machine, QR code, or payment gateway software, and handles the settlement to the merchant's account.</li>
              <li><strong>The Issuer (Customer's Bank):</strong> Authorizes the transaction, assumes the risk, and transfers the funds from the customer's account. They typically take the largest slice of the MDR (known as the Interchange Fee in card networks).</li>
              <li><strong>The Network (NPCI, Visa, Mastercard):</strong> Provides the central routing infrastructure that connects the acquiring and issuing banks. They take a small switching fee.</li>
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>The Evolution of UPI MDR in India</h2>
            <p>
              Historically, the Indian government mandated a "Zero MDR" policy for RuPay debit cards and UPI transactions to encourage digital adoption. This meant merchants incurred no processing costs for these payment methods, driving massive growth.
            </p>
            <p>
              However, as the volume of UPI transactions grew exponentially, the cost to banks and payment providers to maintain the infrastructure also surged. The Zero MDR policy meant these entities were operating the UPI infrastructure at a significant loss.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>The 2026 UPI MDR Framework</h2>
            <p>
              To create a sustainable model, reports indicate a new framework effective October 2026. This framework introduces MDR on certain UPI transactions while protecting consumers and small ticket purchases.
            </p>
            <p><strong>The Core Rules:</strong></p>
            <ul style={{ paddingLeft: 24, margin: "12px 0" }}>
              <li><strong>P2P remains free:</strong> Person-to-person transfers continue to have no MDR.</li>
              <li><strong>Small P2M is protected:</strong> Person-to-merchant payments of ₹2,000 or below do not attract the standard MDR.</li>
              <li><strong>The 0.4% Rate:</strong> P2M transactions above ₹2,000 are subject to a 0.4% MDR.</li>
              <li><strong>The ₹300 Cap:</strong> To protect high-value transactions, the MDR is capped at a maximum of ₹300 per transaction (reached at ₹75,000).</li>
            </ul>

            <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>Why Should Merchants Care?</h2>
            <p>
              Understanding MDR is crucial for margin calculation. If you operate a high-volume, low-margin business, a 0.4% processing fee can significantly impact your net profitability.
            </p>
            <p>
              Merchants need to:
            </p>
            <ol style={{ paddingLeft: 24, margin: "12px 0" }}>
              <li>Know their average order value (AOV). If your AOV is ₹500, the new UPI rules won't impact you. If your AOV is ₹5,000, they will.</li>
              <li>Account for GST (18%) on the MDR amount itself.</li>
              <li>Understand the cap (₹300) when selling high-value goods like electronics or jewelry.</li>
            </ol>
          </article>

          <div style={{ marginTop: 40, padding: 24, borderRadius: "var(--radius-md)", background: "hsl(var(--surface))", border: "1px solid hsl(var(--border))" }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Calculate Your Exact Costs</h3>
            <p style={{ fontSize: 14, color: "hsl(var(--muted))", marginBottom: 20 }}>
              Use our dedicated calculator to see exactly how much MDR will be deducted from your transactions based on the 2026 rules.
            </p>
            <Link href="/calculator" className="gradient-primary" style={{
              display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 24px",
              borderRadius: "var(--radius-sm)", color: "white", textDecoration: "none", fontWeight: 600,
            }}>
              Open MDR Calculator <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid hsl(var(--border))", fontSize: 13, color: "hsl(var(--muted))" }}>
            Last updated: September 2026. Disclaimer: Rules and rates are based on reported information.
          </div>
        </div>
      </section>
    </>
  );
}
