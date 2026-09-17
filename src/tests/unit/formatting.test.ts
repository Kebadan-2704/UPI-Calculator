import { describe, it, expect } from 'vitest';
import { formatINR, formatIndianNumber, parseINRInput, getAmountBucket } from '@/lib/formatting/currency';

describe('Currency Formatting', () => {
  describe('formatIndianNumber', () => {
    it('formats small numbers correctly', () => {
      expect(formatIndianNumber(500)).toBe('500');
      expect(formatIndianNumber(999)).toBe('999');
    });

    it('formats thousands correctly', () => {
      expect(formatIndianNumber(1000)).toBe('1,000');
      expect(formatIndianNumber(9999)).toBe('9,999');
    });

    it('formats lakhs correctly', () => {
      expect(formatIndianNumber(100000)).toBe('1,00,000');
      expect(formatIndianNumber(999999)).toBe('9,99,999');
    });

    it('formats crores correctly', () => {
      expect(formatIndianNumber(10000000)).toBe('1,00,00,000');
    });

    it('handles decimals', () => {
      expect(formatIndianNumber(1234.56, true)).toBe('1,234.56');
    });
  });

  describe('formatINR', () => {
    it('adds ₹ symbol', () => {
      expect(formatINR(100000)).toBe('₹1,00,000');
    });
  });

  describe('parseINRInput', () => {
    it('parses clean numbers', () => {
      expect(parseINRInput('1000')).toBe(1000);
    });

    it('parses numbers with commas', () => {
      expect(parseINRInput('1,00,000')).toBe(100000);
    });

    it('parses numbers with symbols', () => {
      expect(parseINRInput('₹25,000')).toBe(25000);
      expect(parseINRInput('Rs. 1,000')).toBe(1000);
      expect(parseINRInput('₹ 500')).toBe(500);
    });

    it('handles invalid inputs', () => {
      expect(parseINRInput('abc')).toBeNull();
      expect(parseINRInput('')).toBeNull();
      expect(parseINRInput('-500')).toBeNull();
    });
  });

  describe('getAmountBucket', () => {
    it('returns correct buckets', () => {
      expect(getAmountBucket(100)).toBe('0-500');
      expect(getAmountBucket(2000)).toBe('500-2000');
      expect(getAmountBucket(75000)).toBe('50000-75000');
      expect(getAmountBucket(150000)).toBe('100000+');
    });
  });
});
