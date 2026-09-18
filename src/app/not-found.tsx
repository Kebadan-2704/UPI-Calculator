import Link from "next/link";
import { Calculator, ArrowRight, Home, BookOpen, HelpCircle } from "lucide-react";

export default function NotFound() {
  return (
    <section
      style={{
        padding: "80px 0",
        textAlign: "center",
        minHeight: "60vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="container-narrow">
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            letterSpacing: "-0.06em",
            color: "hsl(var(--muted) / 0.2)",
            lineHeight: 1,
            marginBottom: 16,
          }}
        >
          404
        </div>

        <h1
          style={{
            fontSize: "clamp(22px, 4vw, 32px)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            marginBottom: 12,
          }}
        >
          Page Not Found
        </h1>

        <p
          style={{
            fontSize: 16,
            color: "hsl(var(--muted))",
            maxWidth: 440,
            margin: "0 auto 32px",
            lineHeight: 1.6,
          }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Try one of our tools below.
        </p>

        {/* Primary CTA */}
        <Link
          href="/calculator"
          className="gradient-primary"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "14px 28px",
            borderRadius: "var(--radius-sm)",
            color: "hsl(var(--primary-foreground))",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: 15,
            marginBottom: 40,
          }}
        >
          <Calculator size={18} />
          Open Calculator
          <ArrowRight size={16} />
        </Link>

        {/* Quick links */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 12,
            maxWidth: 520,
            margin: "0 auto",
          }}
        >
          {[
            { label: "Homepage", href: "/", icon: Home },
            { label: "Learn about UPI MDR", href: "/learn/what-is-upi-mdr", icon: BookOpen },
            { label: "FAQ", href: "/faq", icon: HelpCircle },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="card-surface"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "14px 18px",
                textDecoration: "none",
                color: "hsl(var(--foreground))",
                fontSize: 14,
                fontWeight: 500,
                transition: "border-color 0.2s",
              }}
            >
              <link.icon size={18} style={{ color: "hsl(var(--muted))" }} />
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
