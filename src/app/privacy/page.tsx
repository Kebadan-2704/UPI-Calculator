import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for UPI Cost Calculator. Learn how we handle your data and protect your privacy.",
};

export default function PrivacyPage() {
  return (
    <section style={{ padding: "48px 0" }}>
      <div className="container-narrow">
        <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8 }}>
          Privacy Policy
        </h1>
        <p style={{ fontSize: 14, color: "hsl(var(--muted))", marginBottom: 32 }}>
          Last updated: September 2026
        </p>

        <article style={{ fontSize: 15, lineHeight: 1.9, color: "hsl(var(--foreground))" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>Overview</h2>
          <p>
            UPI Cost Calculator (&quot;we&quot;, &quot;our&quot;, &quot;the platform&quot;) is committed to protecting
            your privacy. This policy explains what data we collect, how we use it, and your rights.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>What We Do NOT Collect</h2>
          <p>We <strong>never</strong> collect, store, or transmit:</p>
          <ul style={{ paddingLeft: 24, margin: "12px 0" }}>
            <li>UPI IDs or Virtual Payment Addresses (VPAs)</li>
            <li>Bank account numbers or IFSC codes</li>
            <li>Card numbers, CVVs, or PINs</li>
            <li>OTPs (One-Time Passwords)</li>
            <li>Payment credentials of any kind</li>
            <li>Phone numbers or personal identification</li>
          </ul>

          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>What We May Collect</h2>
          <p>For improving the platform, we may collect anonymous, aggregate analytics:</p>
          <ul style={{ paddingLeft: 24, margin: "12px 0" }}>
            <li><strong>Page views:</strong> Which pages are visited</li>
            <li><strong>Tool usage:</strong> Which calculators are used (not specific inputs)</li>
            <li><strong>Amount buckets:</strong> Coarse ranges (e.g., &quot;₹2,000–₹5,000&quot;) rather than exact amounts</li>
            <li><strong>Device class:</strong> Mobile/tablet/desktop</li>
            <li><strong>Language:</strong> Browser language preference</li>
            <li><strong>Error tracking:</strong> Technical errors for reliability</li>
          </ul>

          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>Calculator Data</h2>
          <p>
            All calculations are performed locally in your browser. The amounts you enter into the
            calculator are not sent to our servers. The calculator operates entirely client-side
            using the downloaded ruleset.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>Cookies</h2>
          <p>
            We may use essential cookies for theme preference (light/dark mode) and language selection.
            Analytics cookies, if used, will respect your browser&apos;s Do Not Track setting and
            applicable cookie consent requirements.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>Third-Party Services</h2>
          <p>
            If we use third-party analytics, they will be privacy-conscious services that do not
            track individual users across websites. We do not sell or share user data with third
            parties for advertising purposes.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>Your Rights</h2>
          <p>
            You may disable cookies, use browser privacy features, or contact us to request
            information about any data associated with your usage.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, marginTop: 32, marginBottom: 12 }}>Changes</h2>
          <p>
            We may update this privacy policy to reflect changes in our practices. Updates will be
            posted on this page with a revised &quot;last updated&quot; date.
          </p>
        </article>
      </div>
    </section>
  );
}
