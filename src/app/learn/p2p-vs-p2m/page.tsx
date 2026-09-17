import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowLeftRight } from "lucide-react";

export const metadata: Metadata = {
  title: "P2P vs P2M — UPI Transaction Types Explained",
  description: "Understand the difference between P2P (person-to-person) and P2M (person-to-merchant) UPI transactions and how MDR applies differently to each.",
};

export default function P2PvsP2MPage() {
  return (
    <section style={{ padding: "48px 0" }}>
      <div className="container-narrow">
        <div style={{ marginBottom: 32 }}>
          <Link href="/faq" style={{ fontSize: 13, color: "hsl(var(--primary))", textDecoration: "none", fontWeight: 500 }}>← Back to FAQ</Link>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ width: 44, height: 44, borderRadius: "var(--radius-sm)", background: "hsl(263 84% 95%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ArrowLeftRight size={22} style={{ color: "hsl(263 84% 67%)" }} />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "hsl(var(--primary))" }}>Learn</div>
            <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>P2P vs P2M Transactions</h1>
          </div>
        </div>

        <article style={{ fontSize: 15, lineHeight: 1.9, color: "hsl(var(--foreground))" }}>
          <p style={{ fontSize: 18, color: "hsl(var(--muted))", lineHeight: 1.7, marginBottom: 24 }}>
            Understanding whether a UPI transaction is P2P or P2M is the first step in determining
            whether MDR applies. The classification fundamentally changes the cost structure.
          </p>

          {/* Comparison Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16, marginBottom: 32 }}>
            <div style={{
              padding: 24, borderRadius: "var(--radius-lg)",
              background: "hsl(var(--success-light))",
              border: "2px solid hsl(var(--success) / 0.2)",
            }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: "hsl(var(--success))" }}>
                P2P — Person to Person
              </h2>
              <ul style={{ paddingLeft: 20, margin: 0, fontSize: 14, lineHeight: 2 }}>
                <li>Sending money to friends or family</li>
                <li>Transfer between personal accounts</li>
                <li>Splitting bills between individuals</li>
                <li>Reported as <strong>free — no MDR</strong></li>
              </ul>
              <div style={{
                marginTop: 16, padding: "10px 16px", borderRadius: "var(--radius-sm)",
                background: "hsl(var(--success) / 0.15)", fontSize: 14, fontWeight: 600,
                color: "hsl(var(--success))", textAlign: "center",
              }}>
                ✓ No MDR charges
              </div>
            </div>

            <div style={{
              padding: 24, borderRadius: "var(--radius-lg)",
              background: "hsl(var(--primary-light))",
              border: "2px solid hsl(var(--primary) / 0.2)",
            }}>
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: "hsl(var(--primary))" }}>
                P2M — Person to Merchant
              </h2>
              <ul style={{ paddingLeft: 20, margin: 0, fontSize: 14, lineHeight: 2 }}>
                <li>Paying a shop or business</li>
                <li>Online merchant payments</li>
                <li>Service provider payments</li>
                <li><strong>MDR may apply</strong> above ₹2,000</li>
              </ul>
              <div style={{
                marginTop: 16, padding: "10px 16px", borderRadius: "var(--radius-sm)",
                background: "hsl(var(--primary) / 0.15)", fontSize: 14, fontWeight: 600,
                color: "hsl(var(--primary))", textAlign: "center",
              }}>
                0.4% MDR above threshold
              </div>
            </div>
          </div>

          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>How Classification Works</h2>
          <p>
            The classification of a UPI transaction as P2P or P2M is determined by the receiving UPI
            ID. Merchant UPI IDs are registered as business accounts by their acquirer bank. The sender
            does not choose the classification — it is determined by the payment infrastructure.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>Why It Matters</h2>
          <p>
            The P2P/P2M classification is the <strong>first decision point</strong> in the rules engine.
            If a transaction is classified as P2P, no further MDR evaluation occurs — the transaction
            is free. Only P2M transactions proceed to threshold and rate evaluation.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>Common Confusion</h2>
          <p>
            Sometimes payments that feel like personal transfers (e.g., paying a freelancer via their
            business UPI ID) may be classified as P2M. Conversely, paying a small shop owner using
            their personal UPI ID may be classified as P2P. The classification depends on the account
            registration, not the intent.
          </p>
        </article>

        <div style={{ marginTop: 32 }}>
          <Link href="/calculator" className="gradient-primary" style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px",
            borderRadius: "var(--radius-sm)", color: "white", textDecoration: "none", fontWeight: 600,
          }}>
            Try Both Types <ArrowRight size={16} />
          </Link>
        </div>

        <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid hsl(var(--border))", fontSize: 13, color: "hsl(var(--muted))" }}>
          Last reviewed: September 2026 · <Link href="/sources" style={{ color: "hsl(var(--primary))", textDecoration: "none" }}>View sources</Link>
        </div>
      </div>
    </section>
  );
}
