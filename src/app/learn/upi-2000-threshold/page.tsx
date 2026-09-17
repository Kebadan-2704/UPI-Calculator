import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "UPI ₹2,000 Threshold Explained",
  description: "Understand the ₹2,000 UPI MDR threshold: what it means, how it works, and how it affects merchant payments under the October 2026 rules.",
};

export default function UPI2000ThresholdPage() {
  return (
    <section style={{ padding: "48px 0" }}>
      <div className="container-narrow">
        <div style={{ marginBottom: 32 }}>
          <Link href="/faq" style={{ fontSize: 13, color: "hsl(var(--primary))", textDecoration: "none", fontWeight: 500 }}>← Back to FAQ</Link>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ width: 44, height: 44, borderRadius: "var(--radius-sm)", background: "hsl(var(--warning-light))", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BookOpen size={22} style={{ color: "hsl(var(--warning))" }} />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "hsl(var(--primary))" }}>Learn</div>
            <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>UPI ₹2,000 Threshold</h1>
          </div>
        </div>

        <article style={{ fontSize: 15, lineHeight: 1.9, color: "hsl(var(--foreground))" }}>
          <p style={{ fontSize: 18, color: "hsl(var(--muted))", lineHeight: 1.7, marginBottom: 24 }}>
            The ₹2,000 threshold is the boundary below which standard UPI merchant payments do not attract MDR.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>How the Threshold Works</h2>
          <p>Under the reported rules, the standard 0.4% MDR applies only to P2M transactions <strong>above ₹2,000</strong>:</p>
          <ul style={{ paddingLeft: 24, margin: "12px 0" }}>
            <li><strong>₹1,999:</strong> Below threshold → No MDR</li>
            <li><strong>₹2,000:</strong> At threshold → No MDR</li>
            <li><strong>₹2,001:</strong> Above threshold → 0.4% MDR applies to the <strong>full amount</strong></li>
          </ul>

          <div style={{ padding: 20, borderRadius: "var(--radius-md)", background: "hsl(var(--warning-light))", border: "1px solid hsl(var(--warning) / 0.3)", marginTop: 24, marginBottom: 24 }}>
            <p style={{ margin: 0, fontSize: 14 }}>
              <strong>⚠️ Important:</strong> The MDR is calculated on the <strong>full transaction amount</strong>, not just the portion above ₹2,000. A ₹2,001 payment has 0.4% applied to the entire ₹2,001.
            </p>
          </div>

          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>Per-Transaction Threshold</h2>
          <p>
            The ₹2,000 threshold is a <strong>per-transaction</strong> threshold, not a cumulative monthly
            threshold. Each individual payment is evaluated independently against this boundary.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>About Payment Splitting</h2>
          <p>
            This calculator does not present payment splitting as a guaranteed method to avoid charges.
            The threshold applies per transaction as reported, and merchant agreements and acquirer
            policies may have additional considerations.
          </p>
        </article>

        <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
          <Link href="/threshold" className="gradient-primary" style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px",
            borderRadius: "var(--radius-sm)", color: "white", textDecoration: "none", fontWeight: 600,
          }}>
            Threshold Calculator <ArrowRight size={16} />
          </Link>
          <Link href="/calculator" style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px",
            borderRadius: "var(--radius-sm)", border: "1px solid hsl(var(--border))",
            color: "hsl(var(--foreground))", textDecoration: "none", fontWeight: 600,
          }}>
            Full Calculator <ArrowRight size={16} />
          </Link>
        </div>

        <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid hsl(var(--border))", fontSize: 13, color: "hsl(var(--muted))" }}>
          Last reviewed: September 2026 · <Link href="/sources" style={{ color: "hsl(var(--primary))", textDecoration: "none" }}>View sources</Link>
        </div>
      </div>
    </section>
  );
}
