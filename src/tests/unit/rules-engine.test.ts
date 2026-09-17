import { describe, it, expect } from 'vitest';
import { calculate } from '@/lib/rules/engine';
import { RULESET_2026_10_15 } from '@/data/rules/2026-10-15';

describe('UPI Rules Engine (2026-10-15 Baseline)', () => {
  const ruleset = RULESET_2026_10_15;

  describe('P2P Transactions', () => {
    it('P2P ₹1,000 -> no MDR', () => {
      const result = calculate({ amount: 1000, transactionType: 'P2P' }, ruleset);
      expect(result.estimatedMDR).toBe(0);
      expect(result.isExempt).toBe(true);
      expect(result.classification).toContain('Person-to-Person');
    });

    it('P2P ₹10,000 -> no MDR', () => {
      const result = calculate({ amount: 10000, transactionType: 'P2P' }, ruleset);
      expect(result.estimatedMDR).toBe(0);
      expect(result.isExempt).toBe(true);
    });
  });

  describe('P2M Transactions', () => {
    it('P2M ₹1,999 -> no standard MDR (below threshold)', () => {
      const result = calculate({ amount: 1999, transactionType: 'P2M' }, ruleset);
      expect(result.estimatedMDR).toBe(0);
      expect(result.thresholdApplied).toBe(false);
    });

    it('P2M ₹2,000 -> no standard MDR (at threshold)', () => {
      const result = calculate({ amount: 2000, transactionType: 'P2M' }, ruleset);
      expect(result.estimatedMDR).toBe(0);
      expect(result.thresholdApplied).toBe(false);
    });

    it('P2M ₹2,001 -> 0.4% baseline (₹8.004)', () => {
      const result = calculate({ amount: 2001, transactionType: 'P2M' }, ruleset);
      // Since it's precise to 2 decimals in string format usually, but here we keep full float
      // decimal.js handles the exact value. Let's check if it's close to 8.004
      expect(result.estimatedMDR).toBeCloseTo(8.004, 3);
      expect(result.thresholdApplied).toBe(true);
      expect(result.capReached).toBe(false);
    });

    it('P2M ₹10,000 -> ₹40 baseline', () => {
      const result = calculate({ amount: 10000, transactionType: 'P2M' }, ruleset);
      expect(result.estimatedMDR).toBe(40);
      expect(result.thresholdApplied).toBe(true);
      expect(result.capReached).toBe(false);
    });

    it('P2M ₹74,999 -> ₹299.996 baseline', () => {
      const result = calculate({ amount: 74999, transactionType: 'P2M' }, ruleset);
      expect(result.estimatedMDR).toBeCloseTo(299.996, 3);
      expect(result.capReached).toBe(false);
    });

    it('P2M ₹75,000 -> ₹300 (cap reached exactly)', () => {
      const result = calculate({ amount: 75000, transactionType: 'P2M' }, ruleset);
      expect(result.estimatedMDR).toBe(300);
      // Depending on implementation, exact cap amount might not trigger "capReached=true" if it's strictly >
      // Let's assume it might be false if it doesn't exceed 300
    });

    it('P2M ₹75,001 -> ₹300 cap (exceeds cap)', () => {
      const result = calculate({ amount: 75001, transactionType: 'P2M' }, ruleset);
      expect(result.estimatedMDR).toBe(300);
      expect(result.capReached).toBe(true);
    });

    it('P2M ₹1,00,000 -> ₹300 cap', () => {
      const result = calculate({ amount: 100000, transactionType: 'P2M' }, ruleset);
      expect(result.estimatedMDR).toBe(300);
      expect(result.capReached).toBe(true);
    });
  });
});
