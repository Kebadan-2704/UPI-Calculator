/**
 * Indian currency formatting utilities.
 * Uses the Indian numbering system (lakhs, crores) and INR symbol.
 */

/**
 * Format a number in Indian notation with ₹ symbol.
 * e.g. 100000 → "₹1,00,000"
 */
export function formatINR(amount: number, showDecimals?: boolean): string {
  const hasDecimals = amount % 1 !== 0;
  const useDecimals = showDecimals ?? hasDecimals;

  return `₹${formatIndianNumber(amount, useDecimals)}`;
}

/**
 * Format a number using Indian grouping (XX,XX,XXX).
 * e.g. 10000000 → "1,00,00,000"
 */
export function formatIndianNumber(
  amount: number,
  showDecimals: boolean = false
): string {
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);

  let intPart: string;
  let decPart: string | null = null;

  if (showDecimals) {
    const parts = absAmount.toFixed(2).split(".");
    intPart = parts[0];
    decPart = parts[1];
  } else {
    intPart = Math.round(absAmount).toString();
  }

  // Apply Indian grouping: last 3 digits, then groups of 2
  const len = intPart.length;
  if (len <= 3) {
    const formatted = decPart ? `${intPart}.${decPart}` : intPart;
    return isNegative ? `-${formatted}` : formatted;
  }

  const lastThree = intPart.slice(-3);
  const remaining = intPart.slice(0, -3);

  // Group remaining digits in pairs from right
  const pairs: string[] = [];
  for (let i = remaining.length; i > 0; i -= 2) {
    pairs.unshift(remaining.slice(Math.max(0, i - 2), i));
  }

  const groupedRemaining = pairs.join(",");
  const result = `${groupedRemaining},${lastThree}`;

  const formatted = decPart ? `${result}.${decPart}` : result;
  return isNegative ? `-${formatted}` : formatted;
}

/**
 * Parse an INR input string to a numeric value.
 * Accepts: "₹25,000", "25000", "25,000", "₹ 25,000", "Rs.25000", "RS 25,000"
 */
export function parseINRInput(input: string): number | null {
  if (!input || typeof input !== "string") return null;

  // Remove ₹, Rs, Rs., RS, spaces, commas
  let cleaned = input
    .replace(/[₹]/g, "")
    .replace(/Rs\.?/gi, "")
    .replace(/,/g, "")
    .replace(/\s/g, "")
    .trim();

  // Remove trailing dots
  if (cleaned.endsWith(".")) {
    cleaned = cleaned.slice(0, -1);
  }

  if (cleaned === "" || cleaned === "-") return null;

  const num = Number(cleaned);
  if (isNaN(num) || !isFinite(num)) return null;
  if (num < 0) return null;

  return num;
}

/**
 * Format a percentage for display.
 * e.g. 0.004 → "0.40%"
 */
export function formatPercent(rate: number): string {
  return `${(rate * 100).toFixed(2)}%`;
}

/**
 * Get a display-friendly amount bucket for analytics.
 */
export function getAmountBucket(
  amount: number
): string {
  if (amount <= 500) return "0-500";
  if (amount <= 2000) return "500-2000";
  if (amount <= 5000) return "2000-5000";
  if (amount <= 10000) return "5000-10000";
  if (amount <= 25000) return "10000-25000";
  if (amount <= 50000) return "25000-50000";
  if (amount <= 75000) return "50000-75000";
  if (amount <= 100000) return "75000-100000";
  return "100000+";
}
