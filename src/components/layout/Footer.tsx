"use client";

import Link from "next/link";
import { ExternalLink, Shield, AlertTriangle } from "lucide-react";

const FOOTER_SECTIONS = [
  {
    title: "Calculators",
    links: [
      { label: "UPI MDR Calculator", href: "/calculator" },
      { label: "Payment Breakdown", href: "/payment-breakdown" },
      { label: "Threshold Calculator", href: "/threshold" },
      { label: "Cap Calculator", href: "/cap" },
    ],
  },
  {
    title: "Learn",
    links: [
      { label: "What is UPI MDR?", href: "/learn/what-is-upi-mdr" },
      { label: "Does UPI Cost Money?", href: "/learn/does-upi-cost-money" },
      { label: "₹2,000 Threshold", href: "/learn/upi-2000-threshold" },
      { label: "₹300 Cap Explained", href: "/learn/upi-300-cap" },
      { label: "P2P vs P2M", href: "/learn/p2p-vs-p2m" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Current Rules", href: "/rules" },
      { label: "FAQ", href: "/faq" },
      { label: "Sources", href: "/sources" },
      { label: "Updates", href: "/updates" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "About", href: "/about" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Disclaimer", href: "/disclaimer" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

const SOURCES = [
  {
    label: "NPCI UPI Circulars",
    url: "https://www.npci.org.in/circulars/upi",
  },
  {
    label: "NPCI UPI Product",
    url: "https://www.npci.org.in/product/upi",
  },
];

export function Footer() {
  return (
    <footer
      style={{
        borderTop: "1px solid hsl(var(--border))",
        backgroundColor: "hsl(var(--surface))",
        marginTop: 80,
      }}
    >
      {/* Disclaimer Banner */}
      <div
        style={{
          padding: "16px 24px",
          backgroundColor: "hsl(var(--warning-light))",
          borderBottom: "1px solid hsl(var(--border))",
        }}
      >
        <div className="container-wide" style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          <AlertTriangle
            size={18}
            style={{ color: "hsl(var(--warning))", flexShrink: 0, marginTop: 2 }}
          />
          <p
            style={{
              fontSize: 13,
              lineHeight: 1.5,
              color: "hsl(var(--foreground))",
              margin: 0,
            }}
          >
            <strong>Disclaimer:</strong> This is an informational calculator and rules reference.
            It is not a bank, payment processor, UPI app, tax adviser, or financial adviser.
            Calculations are estimates based on reported rules. Always verify with official sources
            before making financial decisions.
          </p>
        </div>
      </div>

      {/* Footer Links */}
      <div className="container-wide" style={{ padding: "48px 24px 32px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 40,
          }}
        >
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                  color: "hsl(var(--muted))",
                  marginBottom: 16,
                }}
              >
                {section.title}
              </h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {section.links.map((link) => (
                  <li key={link.href} style={{ marginBottom: 10 }}>
                    <Link
                      href={link.href}
                      style={{
                        textDecoration: "none",
                        color: "hsl(var(--foreground))",
                        fontSize: 14,
                        transition: "color 0.15s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "hsl(var(--primary))")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "hsl(var(--foreground))")
                      }
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Sources Strip */}
        <div
          style={{
            marginTop: 40,
            paddingTop: 24,
            borderTop: "1px solid hsl(var(--border))",
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: "hsl(var(--muted))",
              fontSize: 13,
            }}
          >
            <Shield size={14} />
            <span>Official Sources:</span>
          </div>
          {SOURCES.map((s) => (
            <a
              key={s.url}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 4,
                fontSize: 13,
                color: "hsl(var(--primary))",
                textDecoration: "none",
              }}
            >
              {s.label}
              <ExternalLink size={12} />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div
          style={{
            marginTop: 24,
            paddingTop: 24,
            borderTop: "1px solid hsl(var(--border))",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p
            style={{
              fontSize: 13,
              color: "hsl(var(--muted))",
              margin: 0,
            }}
          >
            © {new Date().getFullYear()} UPI Cost Calculator. For informational purposes only.
          </p>
          <p
            style={{
              fontSize: 13,
              color: "hsl(var(--muted))",
              margin: 0,
            }}
          >
            Rules effective from 15 October 2026. Last reviewed: September 2026.
          </p>
        </div>
      </div>
    </footer>
  );
}
