"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calculator,
  ArrowRight,
  Shield,
  Zap,
  Scale,
  BarChart3,
  Layers,
  TrendingUp,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { CalculatorWidget } from "@/components/calculator/CalculatorWidget";

const TOOLS = [
  {
    title: "Threshold Calculator",
    description: "See what changes around the ₹2,000 boundary",
    href: "/threshold",
    icon: Scale,
    color: "hsl(var(--primary))",
  },
  {
    title: "Cap Calculator",
    description: "Understand the ₹300 MDR ceiling",
    href: "/cap",
    icon: TrendingUp,
    color: "hsl(var(--warning))",
  },
  {
    title: "Payment Breakdown",
    description: "Gross → MDR → estimated net breakdown",
    href: "/payment-breakdown",
    icon: BarChart3,
    color: "hsl(var(--success))",
  },
  {
    title: "Current Rules",
    description: "View the active ruleset with sources",
    href: "/rules",
    icon: Layers,
    color: "hsl(263 84% 67%)",
  },
];

const TRUST_ITEMS = [
  { icon: Shield, text: "Source-backed rules" },
  { icon: Zap, text: "Instant calculation" },
  { icon: CheckCircle2, text: "No data collected" },
  { icon: AlertCircle, text: "Merchant-side MDR only" },
];

const FAQ_ITEMS = [
  {
    q: "Does every UPI payment have charges?",
    a: "No. The standard MDR applies only to payments made to businesses or shops (P2M) above ₹2,000. Normal peer-to-peer (P2P) transfers to friends and family, and merchant payments at or below ₹2,000 are not subject to the standard MDR.",
  },
  {
    q: "Who pays the MDR — customer or merchant?",
    a: "MDR (Merchant Discount Rate) is a merchant-side cost. It is not a fee charged directly to the customer making the payment.",
  },
  {
    q: "What is the ₹300 cap?",
    a: "At the reported standard rate of 0.4%, the MDR charge reaches ₹300 at a transaction amount of ₹75,000. For transactions above ₹75,000, the MDR is capped at ₹300.",
  },
  {
    q: "When do these rules take effect?",
    a: "The reported effective date is 15 October 2026. Before production use, always verify with the latest official NPCI/RBI circular.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="gradient-hero"
        style={{
          paddingTop: 48,
          paddingBottom: 24,
        }}
      >
        <div className="container-wide">
          <div
            style={{
              textAlign: "center",
              maxWidth: 700,
              margin: "0 auto 40px",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 16px",
                  borderRadius: "var(--radius-full)",
                  background: "hsl(var(--primary-light))",
                  color: "hsl(var(--primary))",
                  fontSize: 13,
                  fontWeight: 600,
                  marginBottom: 20,
                }}
              >
                <Zap size={14} />
                Updated for October 2026 Rules
              </div>

              <h1
                className="text-balance"
                style={{
                  fontSize: "clamp(28px, 5vw, 48px)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  letterSpacing: "-0.03em",
                  marginBottom: 16,
                }}
              >
                Understand UPI Payment{" "}
                <span className="gradient-text">Costs & Rules</span>
              </h1>

              <p
                style={{
                  fontSize: "clamp(16px, 2.5vw, 19px)",
                  color: "hsl(var(--muted))",
                  lineHeight: 1.6,
                  maxWidth: 560,
                  margin: "0 auto",
                }}
              >
                Free, source-backed calculator for UPI merchant discount rates.
                Know the costs before you pay or accept a payment.
              </p>
            </motion.div>
          </div>

          {/* Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <CalculatorWidget />
          </motion.div>

          {/* Trust Strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 24,
              marginTop: 32,
              paddingTop: 24,
              borderTop: "1px solid hsl(var(--border) / 0.5)",
            }}
          >
            {TRUST_ITEMS.map((item) => (
              <div
                key={item.text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  fontSize: 13,
                  color: "hsl(var(--muted))",
                  fontWeight: 500,
                }}
              >
                <item.icon size={16} style={{ color: "hsl(var(--primary))" }} />
                {item.text}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Tools Section */}
      <section style={{ padding: "64px 0" }}>
        <div className="container-wide">
          <div
            style={{
              textAlign: "center",
              marginBottom: 40,
            }}
          >
            <h2
              style={{
                fontSize: "clamp(22px, 4vw, 32px)",
                fontWeight: 700,
                marginBottom: 10,
              }}
            >
              Explore Our Tools
            </h2>
            <p
              style={{
                fontSize: 16,
                color: "hsl(var(--muted))",
                maxWidth: 480,
                margin: "0 auto",
              }}
            >
              Comprehensive calculators and references for UPI payment costs
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 16,
            }}
          >
            {TOOLS.map((tool, i) => (
              <motion.div
                key={tool.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
              >
                <Link
                  href={tool.href}
                  className="card-surface"
                  style={{
                    display: "block",
                    padding: 24,
                    textDecoration: "none",
                    color: "inherit",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "var(--radius-sm)",
                      background: `${tool.color}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 16,
                    }}
                  >
                    <tool.icon size={22} style={{ color: tool.color }} />
                  </div>
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      marginBottom: 6,
                    }}
                  >
                    {tool.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      color: "hsl(var(--muted))",
                      lineHeight: 1.5,
                      margin: 0,
                    }}
                  >
                    {tool.description}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: 13,
                      fontWeight: 600,
                      color: "hsl(var(--primary))",
                      marginTop: 16,
                    }}
                  >
                    Open tool <ArrowRight size={14} />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section
        style={{
          padding: "64px 0",
          backgroundColor: "hsl(var(--surface))",
          borderTop: "1px solid hsl(var(--border))",
          borderBottom: "1px solid hsl(var(--border))",
        }}
      >
        <div className="container-narrow">
          <h2
            style={{
              fontSize: "clamp(22px, 4vw, 32px)",
              fontWeight: 700,
              textAlign: "center",
              marginBottom: 32,
            }}
          >
            Frequently Asked Questions
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {FAQ_ITEMS.map((item) => (
              <details
                key={item.q}
                className="card-surface"
                style={{
                  padding: "0",
                  borderRadius: "var(--radius-md)",
                  cursor: "pointer",
                }}
              >
                <summary
                  style={{
                    padding: "18px 20px",
                    fontSize: 15,
                    fontWeight: 600,
                    listStyle: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {item.q}
                  <ChevronDown size={18} style={{ color: "hsl(var(--muted))", flexShrink: 0 }} />
                </summary>
                <div
                  style={{
                    padding: "0 20px 18px",
                    fontSize: 14,
                    color: "hsl(var(--muted))",
                    lineHeight: 1.7,
                  }}
                >
                  {item.a}
                </div>
              </details>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: 24 }}>
            <Link
              href="/faq"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: "hsl(var(--primary))",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              View all FAQs <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Sources Section */}
      <section style={{ padding: "48px 0" }}>
        <div className="container-narrow" style={{ textAlign: "center" }}>
          <h2
            style={{
              fontSize: 20,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            Backed by Official Sources
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "hsl(var(--muted))",
              marginBottom: 24,
            }}
          >
            Every rule in our calculator is sourced from official publications and verified reporting.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 12,
            }}
          >
            {["NPCI", "Reuters", "Indian Express", "Economic Times"].map(
              (pub) => (
                <span
                  key={pub}
                  style={{
                    padding: "8px 18px",
                    borderRadius: "var(--radius-full)",
                    border: "1px solid hsl(var(--border))",
                    fontSize: 13,
                    fontWeight: 500,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  {pub}
                </span>
              )
            )}
          </div>
          <Link
            href="/sources"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: "hsl(var(--primary))",
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              marginTop: 20,
            }}
          >
            View all sources <ExternalLink size={14} />
          </Link>
        </div>
      </section>
    </>
  );
}

function ChevronDown({ size, style }: { size: number; style?: React.CSSProperties }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
