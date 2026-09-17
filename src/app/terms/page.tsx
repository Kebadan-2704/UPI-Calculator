import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms and conditions for using the UPI Cost Calculator platform.",
};

export default function TermsPage() {
  return (
    <section style={{ padding: "48px 0" }}>
      <div className="container-narrow">
        <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8 }}>
          Terms of Use
        </h1>
        <p style={{ fontSize: 14, color: "hsl(var(--muted))", marginBottom: 32 }}>
          Last updated: September 2026
        </p>

        <article style={{ fontSize: 15, lineHeight: 1.9, color: "hsl(var(--foreground))" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>1. Acceptance of Terms</h2>
          <p>
            By accessing and using UPI Cost Calculator (&quot;the platform&quot;, &quot;we&quot;, &quot;our&quot;),
            you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>2. Informational Purpose Only</h2>
          <p>
            The platform is provided for informational and educational purposes only.
            We are not a financial institution, bank, payment processor, or legal adviser.
            The calculations provided are estimates based on publicly reported rules and
            circulars available at the time of access.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>3. Accuracy of Information</h2>
          <p>
            While we strive to keep our rules engine and calculators up-to-date with the latest
            authoritative sources, we make no warranties or representations regarding the
            accuracy, completeness, or reliability of the calculations. Actual merchant settlement
            amounts may vary based on your specific acquirer agreements, merchant category codes
            (MCC), and subsequent regulatory changes.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>4. Limitation of Liability</h2>
          <p>
            In no event shall UPI Cost Calculator or its contributors be liable for any direct,
            indirect, incidental, special, or consequential damages arising out of or in any way
            connected with the use of this platform or the information provided herein.
            Decisions made based on information from this platform are your sole responsibility.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>5. Use of the Calculator</h2>
          <p>
            You agree to use the calculator for its intended purpose of estimating UPI payment
            costs. You may not attempt to misuse, exploit, or reverse-engineer the application
            infrastructure or APIs.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>6. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be effective
            immediately upon posting to the platform.
          </p>
        </article>
      </div>
    </section>
  );
}
