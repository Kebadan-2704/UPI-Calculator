import { Metadata } from "next";
import { Mail, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the team behind the UPI Cost Calculator platform.",
};

export default function ContactPage() {
  return (
    <section style={{ padding: "48px 0" }}>
      <div className="container-narrow">
        <h1 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 24 }}>
          Contact Us
        </h1>
        
        <p style={{ fontSize: 16, color: "hsl(var(--muted))", marginBottom: 40, lineHeight: 1.6 }}>
          Have a question about the calculator? Found a discrepancy with the latest rules?
          We&apos;d love to hear from you.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          <div className="card-surface" style={{ padding: 24 }}>
            <div style={{ width: 40, height: 40, borderRadius: "var(--radius-sm)", background: "hsl(var(--primary-light))", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
              <Mail size={20} style={{ color: "hsl(var(--primary))" }} />
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Email Us</h2>
            <p style={{ fontSize: 14, color: "hsl(var(--muted))", marginBottom: 16 }}>
              For general inquiries, feedback, or rule corrections.
            </p>
            <a href="mailto:support@example.com" style={{ fontSize: 15, fontWeight: 600, color: "hsl(var(--primary))", textDecoration: "none" }}>
              support@example.com
            </a>
          </div>

          <div className="card-surface" style={{ padding: 24 }}>
            <div style={{ width: 40, height: 40, borderRadius: "var(--radius-sm)", background: "hsl(var(--success-light))", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
              <MessageSquare size={20} style={{ color: "hsl(var(--success))" }} />
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Feedback</h2>
            <p style={{ fontSize: 14, color: "hsl(var(--muted))", marginBottom: 16 }}>
              Let us know how we can improve the platform for you.
            </p>
            <span style={{ fontSize: 15, fontWeight: 600, color: "hsl(var(--success))" }}>
              Open Feedback Form
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
