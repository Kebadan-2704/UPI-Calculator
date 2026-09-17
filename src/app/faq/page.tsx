import { Metadata } from "next";
import Link from "next/link";
import { HelpCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ — UPI MDR Questions Answered",
  description: "Frequently asked questions about UPI merchant discount rates, charges, thresholds, caps, and how they affect payments.",
};

const FAQ_DATA = [
  {
    category: "General",
    items: [
      {
        q: "What is UPI MDR?",
        a: "MDR stands for Merchant Discount Rate. It is a fee charged to the merchant (not the customer) for accepting digital payments. Under the reported October 2026 framework, selected person-to-merchant UPI transactions above ₹2,000 attract a 0.4% MDR.",
      },
      {
        q: "Does every UPI payment have charges?",
        a: "No. Person-to-person (P2P) transfers are reported as free. Only certain person-to-merchant (P2M) transactions above the ₹2,000 threshold are subject to the standard MDR. Transactions at or below ₹2,000 are below the standard threshold.",
      },
      {
        q: "Who pays the MDR — the customer or the merchant?",
        a: "MDR is a merchant-side cost. It is deducted from the merchant's settlement, not charged to the customer making the payment. Our calculator shows estimated merchant costs.",
      },
      {
        q: "When do these UPI MDR rules take effect?",
        a: "The reported effective date is 15 October 2026. The exact implementation details should be verified against the latest official NPCI/RBI circular.",
      },
    ],
  },
  {
    category: "Threshold & Cap",
    items: [
      {
        q: "What is the ₹2,000 threshold?",
        a: "The reported standard MDR applies to P2M transactions above ₹2,000. A payment of exactly ₹2,000 or below is not subject to the standard 0.4% MDR. The rate applies to the full transaction amount, not just the portion above ₹2,000.",
      },
      {
        q: "What is the ₹300 cap?",
        a: "The standard MDR is capped at ₹300 per transaction. At a 0.4% rate, this cap is reached at ₹75,000 (0.4% × ₹75,000 = ₹300). For transactions above ₹75,000, the MDR remains ₹300.",
      },
      {
        q: "Can I split payments to avoid MDR?",
        a: "We do not present payment splitting as a guaranteed method to avoid charges. The threshold applies per transaction as reported. Merchant agreements and acquirer policies may vary.",
      },
    ],
  },
  {
    category: "Transaction Types",
    items: [
      {
        q: "What is the difference between P2P and P2M?",
        a: "P2P (Person-to-Person) refers to transfers between individuals, like sending money to a friend. P2M (Person-to-Merchant) refers to payments made to businesses, shops, or service providers. MDR applies only to P2M transactions.",
      },
      {
        q: "How does UPI classify a transaction as P2M?",
        a: "Classification depends on the receiving UPI ID. Merchant UPI IDs are registered as business accounts. The classification is determined by the payment infrastructure, not by the sender.",
      },
      {
        q: "Are there special categories with different rules?",
        a: "Reports mention special-category treatment for certain merchant categories. These are configurable in our rules engine but are only displayed when verified against authoritative sources. We do not invent special-category rules.",
      },
    ],
  },
  {
    category: "Calculator",
    items: [
      {
        q: "How accurate is this calculator?",
        a: "The calculator uses the reported baseline rules with decimal-safe arithmetic. Results are estimates based on the active ruleset. Actual merchant settlement may vary based on merchant classification, acquirer agreements, and any subsequent regulatory changes.",
      },
      {
        q: "Does this calculator collect my payment data?",
        a: "No. We do not collect UPI IDs, bank credentials, card data, OTPs, or any payment secrets. The calculator runs entirely in your browser. We only track anonymous, aggregate analytics like which tools are used.",
      },
      {
        q: "What happens when rules change?",
        a: "Our rules engine is versioned. When rules change, a new ruleset is published with the updated effective date. Previous rulesets remain available for reference. The calculator automatically uses the active ruleset.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <section style={{ padding: "48px 0" }}>
      <div className="container-narrow">
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div
            style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 56, height: 56, borderRadius: "var(--radius-md)",
              background: "hsl(var(--primary-light))", marginBottom: 16,
            }}
          >
            <HelpCircle size={28} style={{ color: "hsl(var(--primary))" }} />
          </div>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 12 }}>
            Frequently Asked Questions
          </h1>
          <p style={{ fontSize: 16, color: "hsl(var(--muted))", maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>
            Everything you need to know about UPI MDR, charges, thresholds, and how they affect your payments.
          </p>
        </div>

        {FAQ_DATA.map((section) => (
          <div key={section.category} style={{ marginBottom: 40 }}>
            <h2 style={{
              fontSize: 13, fontWeight: 700, textTransform: "uppercase",
              letterSpacing: "0.08em", color: "hsl(var(--primary))",
              marginBottom: 16, paddingBottom: 8,
              borderBottom: "2px solid hsl(var(--primary) / 0.2)",
            }}>
              {section.category}
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {section.items.map((item) => (
                <details
                  key={item.q}
                  className="card-surface"
                  style={{ borderRadius: "var(--radius-md)", cursor: "pointer" }}
                >
                  <summary style={{
                    padding: "18px 20px", fontSize: 15, fontWeight: 600,
                    listStyle: "none", display: "flex", alignItems: "center",
                    justifyContent: "space-between",
                  }}>
                    {item.q}
                    <span style={{ color: "hsl(var(--muted))", fontSize: 18, flexShrink: 0, marginLeft: 12 }}>+</span>
                  </summary>
                  <div style={{
                    padding: "0 20px 18px", fontSize: 14,
                    color: "hsl(var(--muted))", lineHeight: 1.8,
                  }}>
                    {item.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}

        <div style={{ textAlign: "center", marginTop: 32 }}>
          <p style={{ fontSize: 14, color: "hsl(var(--muted))", marginBottom: 16 }}>
            Have more questions? Try calculating your specific scenario.
          </p>
          <Link
            href="/calculator"
            className="gradient-primary"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "12px 28px", borderRadius: "var(--radius-sm)",
              color: "white", textDecoration: "none", fontWeight: 600, fontSize: 15,
            }}
          >
            Open Calculator <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
