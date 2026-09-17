import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Does UPI Cost Money? — UPI Charges Explained",
  description: "Find out whether UPI transactions cost money, who pays charges, and which UPI payments are free under the October 2026 rules.",
};

export default function DoesUPICostMoneyPage() {
  return (
    <section style={{ padding: "48px 0" }}>
      <div className="container-narrow">
        <div style={{ marginBottom: 32 }}>
          <Link href="/faq" style={{ fontSize: 13, color: "hsl(var(--primary))", textDecoration: "none", fontWeight: 500 }}>← Back to FAQ</Link>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div style={{ width: 44, height: 44, borderRadius: "var(--radius-sm)", background: "hsl(var(--success-light))", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BookOpen size={22} style={{ color: "hsl(var(--success))" }} />
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", color: "hsl(var(--primary))" }}>Learn</div>
            <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>Does UPI Cost Money?</h1>
          </div>
        </div>

        <article style={{ fontSize: 15, lineHeight: 1.9, color: "hsl(var(--foreground))" }}>
          <p style={{ fontSize: 18, color: "hsl(var(--muted))", lineHeight: 1.7, marginBottom: 24 }}>
            The short answer: <strong>not all UPI transactions have charges</strong>. Whether a UPI
            payment involves a cost depends on the type of transaction, the amount, and who you&apos;re paying.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>Transactions That Remain Free</h2>
          <ul style={{ paddingLeft: 24, margin: "12px 0" }}>
            <li><strong>P2P transfers</strong> — Sending money to friends and family (person-to-person) is reported as free</li>
            <li><strong>Small merchant payments</strong> — Transactions at or below ₹2,000 are below the standard MDR threshold</li>
          </ul>

          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>Transactions With Merchant Costs</h2>
          <p>
            Under the reported October 2026 rules, person-to-merchant (P2M) UPI transactions
            <strong> above ₹2,000</strong> attract a 0.4% MDR charged to the merchant. This is
            <strong> not a fee paid by the customer</strong> — it is deducted from the merchant&apos;s
            settlement.
          </p>

          <div style={{ padding: 20, borderRadius: "var(--radius-md)", background: "hsl(var(--primary-light))", marginTop: 24, marginBottom: 24 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Quick Summary</h3>
            <table style={{ width: "100%", fontSize: 14, borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "8px 12px", borderBottom: "1px solid hsl(var(--border))" }}>Transaction</th>
                  <th style={{ textAlign: "left", padding: "8px 12px", borderBottom: "1px solid hsl(var(--border))" }}>Customer Charge</th>
                  <th style={{ textAlign: "left", padding: "8px 12px", borderBottom: "1px solid hsl(var(--border))" }}>Merchant MDR</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "8px 12px", borderBottom: "1px solid hsl(var(--border))" }}>P2P (any amount)</td>
                  <td style={{ padding: "8px 12px", borderBottom: "1px solid hsl(var(--border))", color: "hsl(var(--success))", fontWeight: 600 }}>Free</td>
                  <td style={{ padding: "8px 12px", borderBottom: "1px solid hsl(var(--border))", color: "hsl(var(--success))", fontWeight: 600 }}>None</td>
                </tr>
                <tr>
                  <td style={{ padding: "8px 12px", borderBottom: "1px solid hsl(var(--border))" }}>P2M ≤ ₹2,000</td>
                  <td style={{ padding: "8px 12px", borderBottom: "1px solid hsl(var(--border))", color: "hsl(var(--success))", fontWeight: 600 }}>Free</td>
                  <td style={{ padding: "8px 12px", borderBottom: "1px solid hsl(var(--border))", color: "hsl(var(--success))", fontWeight: 600 }}>Below threshold</td>
                </tr>
                <tr>
                  <td style={{ padding: "8px 12px" }}>P2M &gt; ₹2,000</td>
                  <td style={{ padding: "8px 12px", color: "hsl(var(--success))", fontWeight: 600 }}>Free</td>
                  <td style={{ padding: "8px 12px", fontWeight: 600 }}>0.4% (max ₹300)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p>
            <strong>Key distinction:</strong> Even when MDR applies, the customer&apos;s payment amount
            does not change. The cost is borne by the merchant as part of payment processing.
          </p>
        </article>

        <div style={{ marginTop: 32 }}>
          <Link href="/calculator" className="gradient-primary" style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px",
            borderRadius: "var(--radius-sm)", color: "white", textDecoration: "none", fontWeight: 600,
          }}>
            Calculate Your Payment <ArrowRight size={16} />
          </Link>
        </div>

        <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid hsl(var(--border))", fontSize: 13, color: "hsl(var(--muted))" }}>
          Last reviewed: September 2026 · <Link href="/sources" style={{ color: "hsl(var(--primary))", textDecoration: "none" }}>View sources</Link>
        </div>
      </div>
    </section>
  );
}
