import type { Metadata } from "next";
import { CalculatorWidget } from "@/components/calculator/CalculatorWidget";

export const metadata: Metadata = {
  title: "UPI MDR Calculator — Calculate Merchant Discount Rate",
  description:
    "Calculate the estimated UPI Merchant Discount Rate (MDR) for any transaction amount. Supports P2P and P2M classification, threshold, and cap calculations.",
};

export default function CalculatorPage() {
  return (
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
        <div
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
              All calculations use <strong>decimal-safe arithmetic</strong> to prevent
              floating-point rounding errors common in financial calculations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
