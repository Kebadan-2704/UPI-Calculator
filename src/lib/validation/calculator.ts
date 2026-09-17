import { z } from "zod";

/**
 * Schema for calculator input validation
 */
export const calculatorInputSchema = z.object({
  amount: z
    .number()
    .positive("Amount must be greater than zero")
    .max(100_00_00_000, "Amount exceeds maximum allowed value"), // 100 crore limit
  transactionType: z.enum(["P2P", "P2M"]),
  category: z.string().optional(),
  merchantClass: z.string().optional(),
  transactionDate: z.string().optional(),
});

export type CalculatorInputSchema = z.infer<typeof calculatorInputSchema>;

/**
 * Schema for monthly calculator input
 */
export const monthlyCalculatorSchema = z.object({
  averageTransaction: z
    .number()
    .positive("Amount must be greater than zero"),
  numberOfTransactions: z
    .number()
    .int("Must be a whole number")
    .positive("Must be at least 1"),
  transactionType: z.enum(["P2P", "P2M"]),
  category: z.string().optional(),
  merchantClass: z.string().optional(),
});

export type MonthlyCalculatorSchema = z.infer<typeof monthlyCalculatorSchema>;

/**
 * Validate and sanitize an amount string input.
 * Returns the validation result with parsed numeric value.
 */
export function validateAmountInput(input: string): {
  valid: boolean;
  value: number | null;
  error: string | null;
} {
  // Remove formatting characters
  const cleaned = input
    .replace(/[₹,\s]/g, "")
    .replace(/Rs\.?/gi, "")
    .trim();

  if (!cleaned) {
    return { valid: false, value: null, error: "Please enter an amount" };
  }

  const num = Number(cleaned);

  if (isNaN(num) || !isFinite(num)) {
    return { valid: false, value: null, error: "Please enter a valid number" };
  }

  if (num <= 0) {
    return { valid: false, value: null, error: "Amount must be greater than zero" };
  }

  if (num > 1_00_00_000) {
    return { valid: false, value: null, error: "Amount exceeds standard UPI limits (₹1 Crore)" };
  }

  return { valid: true, value: num, error: null };
}
