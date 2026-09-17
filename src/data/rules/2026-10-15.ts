import type { RuleSet } from "@/lib/rules/types";

/**
 * Active ruleset: 2026-10-15
 * Based on reported regulatory baseline (Section 1.3 of product spec).
 *
 * IMPORTANT: Before production launch, verify against the latest
 * NPCI/RBI/Government circular and update accordingly.
 */
export const RULESET_2026_10_15: RuleSet = {
  id: "rs-2026-10-15",
  version: "1.0.0",
  effectiveFrom: "2026-10-15",
  effectiveTo: null,
  status: "active",
  currency: "INR",
  sources: [
    {
      id: "src-npci-circular",
      title: "NPCI UPI Circular Repository",
      publisher: "National Payments Corporation of India",
      url: "https://www.npci.org.in/circulars/upi",
      publishedAt: "2026-09-15",
      accessedAt: "2026-09-16",
    },
    {
      id: "src-npci-product",
      title: "NPCI UPI Product Information",
      publisher: "National Payments Corporation of India",
      url: "https://www.npci.org.in/product/upi",
      publishedAt: "2026-09-15",
      accessedAt: "2026-09-16",
    },
    {
      id: "src-reuters",
      title: "Reuters report on UPI MDR framework",
      publisher: "Reuters",
      url: "https://www.reuters.com",
      publishedAt: "2026-09-16",
      accessedAt: "2026-09-16",
    },
    {
      id: "src-indian-express",
      title: "Indian Express report on merchant treatment and cap",
      publisher: "The Indian Express",
      url: "https://indianexpress.com",
      publishedAt: "2026-09-15",
      accessedAt: "2026-09-16",
    },
    {
      id: "src-economic-times",
      title: "Economic Times report on effective date and P2M scope",
      publisher: "The Economic Times",
      url: "https://economictimes.indiatimes.com",
      publishedAt: "2026-09-15",
      accessedAt: "2026-09-16",
    },
  ],
  rules: [
    // ── P2P: No merchant MDR ─────────────────────────────
    {
      id: "rule-p2p-free",
      priority: 100,
      transactionType: "P2P",
      rateType: "NONE",
      conditions: [],
      explanation:
        "Person-to-Person (P2P) transfers are reported as free and not subject to merchant MDR.",
      sourceIds: ["src-npci-circular", "src-reuters"],
    },

    // ── P2M: Below/at threshold (≤ ₹2,000) ──────────────
    {
      id: "rule-p2m-below-threshold",
      priority: 90,
      transactionType: "P2M",
      maxAmount: 2000,
      rateType: "NONE",
      conditions: [],
      explanation:
        "Merchant payments at or below ₹2,000 are below the standard MDR threshold and are not subject to the standard 0.4% MDR.",
      sourceIds: ["src-reuters", "src-economic-times"],
    },

    // ── P2M: Above threshold (> ₹2,000) standard MDR ────
    {
      id: "rule-p2m-standard",
      priority: 80,
      transactionType: "P2M",
      minAmount: 2000,
      rateType: "PERCENT",
      rate: 0.004, // 0.4%
      cap: 300, // ₹300 maximum
      capStartsAt: 75000, // 0.4% × ₹75,000 = ₹300
      conditions: [],
      explanation:
        "Standard P2M transactions above ₹2,000 attract a 0.4% MDR, capped at ₹300 per transaction (cap reached at ₹75,000).",
      sourceIds: [
        "src-npci-circular",
        "src-reuters",
        "src-indian-express",
        "src-economic-times",
      ],
    },
  ],
};
