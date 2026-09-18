import { describe, it, expect } from "vitest";
import { calculate } from "./engine";
import { resolveRuleset } from "./resolver";

describe("UPI Rules Engine", () => {
  const ruleset = resolveRuleset();

  describe("P2M Standard Transactions", () => {
    it("should charge 0 MDR for transactions below threshold", () => {
      const result = calculate({ amount: 1000, transactionType: "P2M" }, ruleset);
      expect(result.estimatedMDR).toBe(0);
      expect(result.isExempt).toBe(true);
      expect(result.thresholdApplied).toBe(false);
    });

    it("should charge 0 MDR for transactions exactly at threshold", () => {
      const result = calculate({ amount: 2000, transactionType: "P2M" }, ruleset);
      expect(result.estimatedMDR).toBe(0);
    });

    it("should calculate 0.4% MDR for transactions above threshold", () => {
      // 10000 * 0.4% = 40
      const result = calculate({ amount: 10000, transactionType: "P2M" }, ruleset);
      expect(result.estimatedMDR).toBe(40);
      expect(result.estimatedNet).toBe(9960);
      expect(result.capReached).toBe(false);
    });

    it("should cap MDR at ₹300", () => {
      // 100,000 * 0.4% = 400 (which is > 300)
      const result = calculate({ amount: 100000, transactionType: "P2M" }, ruleset);
      expect(result.estimatedMDR).toBe(300);
      expect(result.estimatedNet).toBe(99700);
      expect(result.capReached).toBe(true);
    });

    it("should apply cap at exactly ₹75,000", () => {
      // 75,000 * 0.4% = 300
      const result = calculate({ amount: 75000, transactionType: "P2M" }, ruleset);
      expect(result.estimatedMDR).toBe(300);
      expect(result.capReached).toBe(false); // Exactly at cap, not exceeded
    });
  });

  describe("P2P Transactions", () => {
    it("should be fully exempt regardless of amount", () => {
      const small = calculate({ amount: 1000, transactionType: "P2P" }, ruleset);
      expect(small.estimatedMDR).toBe(0);
      expect(small.isExempt).toBe(true);

      const large = calculate({ amount: 100000, transactionType: "P2P" }, ruleset);
      expect(large.estimatedMDR).toBe(0);
      expect(large.isExempt).toBe(true);
    });
  });

  describe("Precision and Rounding", () => {
    it("should safely handle float precision issues", () => {
      // 2000.01 * 0.4% = 8.00004
      const result = calculate({ amount: 2000.01, transactionType: "P2M" }, ruleset);
      expect(result.estimatedMDR).toBe(8.00004); // UI formatting rounds this to 8
    });
  });

  describe("Resolver", () => {
    it("should resolve to the default ruleset", () => {
      const activeRules = resolveRuleset();
      expect(activeRules.version).toBe("1.0.0");
      expect(activeRules.effectiveFrom).toBe("2026-10-15");
    });
  });
});
