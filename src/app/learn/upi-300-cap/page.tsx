import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "UPI ₹300 Cap Explained — Maximum MDR Per Transaction",
  description: "Learn how the ₹300 UPI MDR cap works, when it kicks in, and why transactions above ₹75,000 pay the same MDR.",
};

export default function UPI300CapPage() {
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
            <h1 style={{ fontSize: "clamp(22px, 4vw, 32px)", fontWeight: 800, letterSpacing: "-0.02em", margin: 0 }}>UPI ₹300 Cap Explained</h1>
          </div>
        </div>

        <article style={{ fontSize: 15, lineHeight: 1.9, color: "hsl(var(--foreground))" }}>
          <p style={{ fontSize: 18, color: "hsl(var(--muted))", lineHeight: 1.7, marginBottom: 24 }}>
            The ₹300 cap means that no single standard P2M transaction pays more than ₹300 in MDR,
            regardless of how large the payment is.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>The Math Behind the Cap</h2>
          <p>At the standard 0.4% MDR rate:</p>
          <ul style={{ paddingLeft: 24, margin: "12px 0" }}>
            <li>₹25,000 × 0.4% = <strong>₹100</strong> (below cap)</li>
            <li>₹50,000 × 0.4% = <strong>₹200</strong> (below cap)</li>
            <li>₹75,000 × 0.4% = <strong>₹300</strong> (exactly at cap)</li>
            <li>₹1,00,000 × 0.4% = ₹400 → <strong>₹300</strong> (cap applied)</li>
            <li>₹5,00,000 × 0.4% = ₹2,000 → <strong>₹300</strong> (cap applied)</li>
          </ul>

          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>Why ₹75,000?</h2>
          <p>
            ₹75,000 is the exact point where 0.4% equals ₹300 (0.004 × 75,000 = 300). This is sometimes
            called the &quot;cap point.&quot; For any amount at or above ₹75,000, the merchant pays a flat
            ₹300 regardless of the transaction size.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>Effective MDR Rate Above Cap</h2>
          <p>
            Because of the cap, the <em>effective</em> MDR rate decreases as the transaction amount increases:
          </p>
          <div style={{ padding: 20, borderRadius: "var(--radius-md)", background: "hsl(var(--muted-bg))", marginTop: 12, marginBottom: 24 }}>
            <table style={{ width: "100%", fontSize: 14, borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left", padding: "8px 12px", borderBottom: "1px solid hsl(var(--border))" }}>Amount</th>
                  <th style={{ textAlign: "left", padding: "8px 12px", borderBottom: "1px solid hsl(var(--border))" }}>MDR</th>
                  <th style={{ textAlign: "left", padding: "8px 12px", borderBottom: "1px solid hsl(var(--border))" }}>Effective Rate</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { amt: "₹75,000", mdr: "₹300", rate: "0.40%" },
                  { amt: "₹1,00,000", mdr: "₹300", rate: "0.30%" },
                  { amt: "₹2,00,000", mdr: "₹300", rate: "0.15%" },
                  { amt: "₹5,00,000", mdr: "₹300", rate: "0.06%" },
                  { amt: "₹10,00,000", mdr: "₹300", rate: "0.03%" },
                ].map((row) => (
                  <tr key={row.amt}>
                    <td style={{ padding: "8px 12px", borderBottom: "1px solid hsl(var(--border))", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>{row.amt}</td>
                    <td style={{ padding: "8px 12px", borderBottom: "1px solid hsl(var(--border))" }}>{row.mdr}</td>
                    <td style={{ padding: "8px 12px", borderBottom: "1px solid hsl(var(--border))" }}>{row.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p>
            <strong>Note:</strong> This cap applies to the standard reported rule. Different merchant categories
            may have different cap structures. The cap logic is rule-dependent and configurable.
          </p>
        </article>

        <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
          <Link href="/cap" className="gradient-primary" style={{
            display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 28px",
            borderRadius: "var(--radius-sm)", color: "white", textDecoration: "none", fontWeight: 600,
          }}>
            Cap Calculator <ArrowRight size={16} />
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
