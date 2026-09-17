import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, ExternalLink } from "lucide-react";

export const metadata: Metadata = {
  title: "What is UPI MDR? — Merchant Discount Rate Explained",
  description: "Learn what UPI MDR (Merchant Discount Rate) is, how it works, who pays it, and how the October 2026 rules affect merchants and consumers.",
};

export default function WhatIsUPIMDRPage() {
  return (
    <section style={{ padding: "48px 0" }}>
      <div className="container-narrow">
        <div style={{ marginBottom: 32 }}>
          <Link href="/faq" style={{ fontSize: 13, color: "hsl(var(--primary))", textDecoration: "none", fontWeight: 500 }}>
            ← Back to FAQ
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ width: 44, height: 44, borderRadius: "var(--radius-sm)", background: "hsl(var(--primary-light))", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BookOpen size={22} style={{ color: "hsl(var(--primary))" }} />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "hsl(var(--primary))" }}>Learn</div>
            <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>What is UPI MDR?</h1>
          </div>
        </div>

        <article style={{ fontSize: 15, lineHeight: 1.9, color: "hsl(var(--foreground))" }}>
          <p style={{ fontSize: 18, color: "hsl(var(--muted))", lineHeight: 1.7, marginBottom: 24 }}>
            MDR stands for <strong>Merchant Discount Rate</strong>. It is a transaction-processing fee
            charged to merchants for accepting digital payments. Understanding MDR is essential for
            anyone who makes or receives UPI payments.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>How MDR Works</h2>
          <p>
            When a customer pays a merchant using UPI, the payment goes through a chain of intermediaries:
            the customer&apos;s bank (issuer), the payment network (NPCI/UPI), and the merchant&apos;s bank
            (acquirer). MDR is the percentage of the transaction value that is shared among these
            intermediaries as compensation for processing the payment.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>Who Pays the MDR?</h2>
          <p>
            <strong>MDR is a merchant-side cost.</strong> It is deducted from the merchant&apos;s settlement
            amount, not charged directly to the customer. If a customer pays ₹10,000, and the MDR is
            ₹40, the merchant receives approximately ₹9,960 (the &quot;net&quot; amount).
          </p>
          <p>
            It is important not to confuse MDR with any customer-facing fee. Our calculator clearly
            labels all results as &quot;estimated merchant cost.&quot;
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>October 2026 UPI MDR Rules</h2>
          <p>
            Current reporting indicates that from <strong>15 October 2026</strong>, selected person-to-merchant
            UPI transactions above ₹2,000 will attract a <strong>0.4% MDR</strong>, capped at
            <strong> ₹300 per transaction</strong>. Key points:
          </p>
          <ul style={{ paddingLeft: 24, margin: "12px 0" }}>
            <li>P2P (person-to-person) transfers remain free</li>
            <li>Transactions at or below ₹2,000 are below the standard threshold</li>
            <li>The 0.4% rate applies to the full transaction amount (not just the portion above ₹2,000)</li>
            <li>The cap of ₹300 is reached at ₹75,000</li>
          </ul>

          <div style={{
            padding: 20, borderRadius: "var(--radius-md)", background: "hsl(var(--warning-light))",
            border: "1px solid hsl(var(--warning) / 0.3)", marginTop: 24, marginBottom: 24,
          }}>
            <p style={{ margin: 0, fontSize: 14 }}>
              <strong>⚠️ Regulatory Note:</strong> These rules are based on reported information.
              Before making financial decisions, always verify with the latest official NPCI/RBI circular.
            </p>
          </div>

          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>Try the Calculator</h2>
          <p>
            Use our free MDR calculator to estimate the merchant cost for any transaction amount.
          </p>
        </article>

        <div style={{ marginTop: 32 }}>
          <Link href="/calculator" className="gradient-primary" style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px",
            borderRadius: "var(--radius-sm)", color: "white", textDecoration: "none", fontWeight: 600,
          }}>
            Calculate MDR <ArrowRight size={16} />
          </Link>
        </div>

        <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid hsl(var(--border))", fontSize: 13, color: "hsl(var(--muted))" }}>
          Last reviewed: September 2026 · <Link href="/sources" style={{ color: "hsl(var(--primary))", textDecoration: "none" }}>View sources</Link>
        </div>
      </div>
    </section>
  );
}
