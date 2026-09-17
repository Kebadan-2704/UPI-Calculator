import { Terminal, Database, Shield, Zap, Cpu, Code, ExternalLink } from "lucide-react";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata = {
  title: "API Documentation | UPI Cost Platform",
  description: "Integrate the UPI Cost & Rules Engine into your own application or billing system.",
};

export default function DevelopersPage() {
  return (
    <div style={{ padding: "48px 0" }}>
      <div className="container-narrow">
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ display: "inline-flex", padding: 16, borderRadius: "var(--radius-full)", background: "hsl(var(--primary-light))", marginBottom: 16 }}>
            <Cpu size={32} style={{ color: "hsl(var(--primary))" }} />
          </div>
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, marginBottom: 16, letterSpacing: "-0.02em" }}>
            Developers & API
          </h1>
          <p style={{ fontSize: 18, color: "hsl(var(--muted))", maxWidth: 600, margin: "0 auto" }}>
            Access our versioned UPI Rules Engine programmatically. Integrate real-time MDR calculations directly into your accounting software, POS system, or merchant dashboard.
          </p>
        </div>

        <div className="card-surface" style={{ padding: 32, marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <span style={{ fontSize: 13, fontWeight: 700, padding: "4px 10px", borderRadius: "var(--radius-sm)", background: "hsl(var(--success-light))", color: "hsl(var(--success))" }}>GET</span>
            <code style={{ fontSize: 16, fontWeight: 600 }}>/api/v1/calculate</code>
          </div>
          <p style={{ color: "hsl(var(--muted))", marginBottom: 32 }}>
            Calculates the estimated Merchant Discount Rate (MDR) and net settlement amount for a specific UPI transaction scenario based on the active ruleset.
          </p>

          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Query Parameters</h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, marginBottom: 32 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid hsl(var(--border))", textAlign: "left", color: "hsl(var(--muted))" }}>
                  <th style={{ padding: "12px 16px", fontWeight: 600 }}>Parameter</th>
                  <th style={{ padding: "12px 16px", fontWeight: 600 }}>Type</th>
                  <th style={{ padding: "12px 16px", fontWeight: 600 }}>Required</th>
                  <th style={{ padding: "12px 16px", fontWeight: 600 }}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid hsl(var(--border))" }}>
                  <td style={{ padding: "16px", fontWeight: 600 }}><code>amount</code></td>
                  <td style={{ padding: "16px", color: "hsl(var(--primary))" }}>Number</td>
                  <td style={{ padding: "16px" }}>Yes</td>
                  <td style={{ padding: "16px", color: "hsl(var(--muted))" }}>The gross transaction amount in INR.</td>
                </tr>
                <tr style={{ borderBottom: "1px solid hsl(var(--border))" }}>
                  <td style={{ padding: "16px", fontWeight: 600 }}><code>transactionType</code></td>
                  <td style={{ padding: "16px", color: "hsl(var(--primary))" }}>String</td>
                  <td style={{ padding: "16px" }}>Yes</td>
                  <td style={{ padding: "16px", color: "hsl(var(--muted))" }}>Must be <code>P2P</code> or <code>P2M</code>.</td>
                </tr>
                <tr>
                  <td style={{ padding: "16px", fontWeight: 600 }}><code>category</code></td>
                  <td style={{ padding: "16px", color: "hsl(var(--primary))" }}>String</td>
                  <td style={{ padding: "16px" }}>No</td>
                  <td style={{ padding: "16px", color: "hsl(var(--muted))" }}>Optional MCC category (e.g., <code>Fuel</code>, <code>Telecom</code>).</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Example Request</h3>
          <CodeBlock
            code={'curl -X GET "https://upicost.in/api/v1/calculate?amount=25000&transactionType=P2M" \\\n  -H "Accept: application/json"'}
            language="cURL"
            icon={<Terminal size={16} style={{ color: "hsl(var(--primary))" }} />}
          />

          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Example Response</h3>
          <CodeBlock
            code={`{
  "success": true,
  "data": {
    "input": {
      "amount": 25000,
      "transactionType": "P2M"
    },
    "calculation": {
      "estimatedMDR": 100,
      "estimatedNet": 24900,
      "isExempt": false,
      "thresholdApplied": true,
      "thresholdAmount": 2000,
      "capReached": false,
      "capAmount": 300,
      "ratePercent": "0.4%",
      "formulaSteps": [
        "Identified as P2M (Person-to-Merchant) transaction.",
        "Amount ₹25,000 exceeds the threshold of ₹2,000. Applying MDR to full amount.",
        "Calculated MDR at 0.4%: ₹100.00",
        "Charge is below ₹300 cap."
      ]
    },
    "metadata": {
      "rulesetVersion": "1.0.0",
      "effectiveFrom": "2026-10-15T00:00:00.000Z",
      "explanation": "Standard P2M transactions above ₹2,000 attract a 0.4% MDR, capped at ₹300 per transaction."
    }
  }
}`}
            language="JSON"
            icon={<Code size={16} style={{ color: "hsl(var(--primary))" }} />}
          />
        </div>

        <div className="card-surface" style={{ padding: 32, textAlign: "center", background: "hsl(var(--primary-light))", border: "1px solid hsl(var(--primary) / 0.2)" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "hsl(var(--primary))", marginBottom: 12 }}>Need Higher Volume Limits?</h2>
          <p style={{ color: "hsl(var(--foreground))", marginBottom: 24, maxWidth: 480, margin: "0 auto 24px" }}>
            Our public API is currently subject to rate limiting for abuse prevention. Contact our enterprise team for a dedicated API key and SLA.
          </p>
          <button className="gradient-primary" style={{ padding: "12px 24px", borderRadius: "var(--radius-sm)", color: "white", fontWeight: 600, border: "none", cursor: "pointer", fontSize: 14 }}>
            Contact Enterprise Sales
          </button>
        </div>
      </div>
    </div>
  );
}
