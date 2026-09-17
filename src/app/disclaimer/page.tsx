import { Metadata } from "next";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Important disclaimer regarding the use of the UPI Cost Calculator platform.",
};

export default function DisclaimerPage() {
  return (
    <section style={{ padding: "48px 0" }}>
      <div className="container-narrow">
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 56, height: 56, borderRadius: "var(--radius-md)",
            background: "hsl(var(--warning-light))", marginBottom: 16,
          }}>
            <AlertTriangle size={28} style={{ color: "hsl(var(--warning))" }} />
          </div>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 12 }}>
            Disclaimer
          </h1>
          <p style={{ fontSize: 16, color: "hsl(var(--muted))", maxWidth: 520, margin: "0 auto", lineHeight: 1.6 }}>
            Please read this important notice regarding the calculations and information provided on our platform.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card-surface" style={{ padding: 24, borderLeft: "4px solid hsl(var(--warning))" }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>1. Informational Purposes Only</h2>
            <p style={{ fontSize: 15, color: "hsl(var(--muted))", lineHeight: 1.7, margin: 0 }}>
              The UPI Cost Calculator is a free tool provided for informational and educational purposes only.
              It is designed to help users estimate the Merchant Discount Rate (MDR) for UPI transactions based
              on publicly reported rules and frameworks.
            </p>
          </div>

          <div className="card-surface" style={{ padding: 24, borderLeft: "4px solid hsl(var(--primary))" }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>2. Not Professional Advice</h2>
            <p style={{ fontSize: 15, color: "hsl(var(--muted))", lineHeight: 1.7, margin: 0 }}>
              We are not a bank, payment processor, acquirer, or financial adviser. The information provided
              does not constitute financial, legal, or tax advice. You should not rely on this calculator
              for accounting, auditing, or making binding financial decisions.
            </p>
          </div>

          <div className="card-surface" style={{ padding: 24, borderLeft: "4px solid hsl(var(--primary))" }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>3. Estimates and Variability</h2>
            <p style={{ fontSize: 15, color: "hsl(var(--muted))", lineHeight: 1.7, margin: 0 }}>
              The results generated are estimates. Actual settlement amounts and MDR charges applied to your
              business may vary based on your specific Merchant Category Code (MCC), agreements with your
              acquiring bank or payment aggregator, transaction type classification by the network, and
              changes in regulatory circulars.
            </p>
          </div>

          <div className="card-surface" style={{ padding: 24, borderLeft: "4px solid hsl(var(--primary))" }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>4. Independent Verification</h2>
            <p style={{ fontSize: 15, color: "hsl(var(--muted))", lineHeight: 1.7, margin: 0 }}>
              While we base our rules engine on official publications, we do not guarantee that the ruleset
              perfectly reflects the final implementation by the National Payments Corporation of India (NPCI)
              or the Reserve Bank of India (RBI). Always refer to official circulars from NPCI and your
              banking partners for definitive fee structures.
            </p>
          </div>
        </div>

        <div style={{ marginTop: 40, textAlign: "center", fontSize: 13, color: "hsl(var(--muted))" }}>
          By using this site, you acknowledge that you have read and understood this disclaimer.
        </div>
      </div>
    </section>
  );
}
