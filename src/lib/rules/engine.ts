import Decimal from "decimal.js";
import type {
  CalculatorInput,
  CalculationResult,
  RuleSet,
  TransactionRule,
  SourceRef,
} from "./types";

// Configure Decimal.js for financial precision
Decimal.set({ precision: 20, rounding: Decimal.ROUND_HALF_UP });

/**
 * Convert rupees to paise (integer)
 */
function toPaise(rupees: number): number {
  return new Decimal(rupees).times(100).toNumber();
}

/**
 * Convert paise to rupees
 */
function toRupees(paise: number): number {
  return new Decimal(paise).dividedBy(100).toNumber();
}

/**
 * Evaluate a single condition against input
 */
function evaluateCondition(
  condition: { field: string; operator: string; value: string | number | boolean | string[] },
  input: CalculatorInput
): boolean {
  const fieldValue = (input as Record<string, unknown>)[condition.field];
  switch (condition.operator) {
    case "eq":
      return fieldValue === condition.value;
    case "neq":
      return fieldValue !== condition.value;
    case "gt":
      return typeof fieldValue === "number" && fieldValue > (condition.value as number);
    case "gte":
      return typeof fieldValue === "number" && fieldValue >= (condition.value as number);
    case "lt":
      return typeof fieldValue === "number" && fieldValue < (condition.value as number);
    case "lte":
      return typeof fieldValue === "number" && fieldValue <= (condition.value as number);
    case "in":
      return Array.isArray(condition.value) && condition.value.includes(fieldValue as string);
    case "notIn":
      return Array.isArray(condition.value) && !condition.value.includes(fieldValue as string);
    default:
      return false;
  }
}

/**
 * Find the applicable rule for the given input from the ruleset.
 * Rules are matched by transaction type, category, merchant class, amount range,
 * and conditions, then selected by highest priority.
 */
function findApplicableRule(
  input: CalculatorInput,
  ruleset: RuleSet
): TransactionRule | null {
  const amountPaise = toPaise(input.amount);
  const amountRupees = input.amount;

  const matchingRules = ruleset.rules.filter((rule) => {
    // Match transaction type
    if (rule.transactionType !== input.transactionType) return false;

    // Match category if rule specifies one
    if (rule.category && rule.category !== input.category) return false;

    // Match merchant class if rule specifies one
    if (rule.merchantClass && rule.merchantClass !== input.merchantClass) return false;

    // Check amount range (in rupees)
    if (rule.minAmount !== undefined && amountRupees < rule.minAmount) return false;
    if (rule.maxAmount !== undefined && amountRupees > rule.maxAmount) return false;

    // Evaluate all conditions
    if (rule.conditions.length > 0) {
      return rule.conditions.every((cond) => evaluateCondition(cond, input));
    }

    return true;
  });

  if (matchingRules.length === 0) return null;

  // Sort by priority (highest first) and return the best match
  matchingRules.sort((a, b) => b.priority - a.priority);
  return matchingRules[0];
}

/**
 * Get source references for a rule from the ruleset
 */
function getSourceRefs(rule: TransactionRule, ruleset: RuleSet): SourceRef[] {
  return ruleset.sources.filter((s) => rule.sourceIds.includes(s.id));
}

/**
 * Main calculation engine.
 *
 * Evaluation order (Section 6.3):
 * 1. Validate amount and required fields
 * 2. Resolve transaction date
 * 3. Classify P2P vs P2M
 * 4. Resolve merchant status/classification
 * 5. Resolve special category
 * 6. Check exemptions
 * 7. Check threshold
 * 8. Apply percentage or flat rule
 * 9. Apply cap if applicable
 * 10. Calculate estimated merchant net
 * 11. Generate human-readable explanation
 * 12. Attach source references and ruleset version
 */
export function calculate(
  input: CalculatorInput,
  ruleset: RuleSet
): CalculationResult {
  const amountPaise = toPaise(input.amount);
  const amount = new Decimal(input.amount);
  const steps: string[] = [];

  // Step 1: Validate
  if (input.amount <= 0) {
    return createZeroResult(input, ruleset, "Amount must be greater than zero.");
  }

  // Step 2: Resolve date (use current if not provided)
  const txDate = input.transactionDate || new Date().toISOString().split("T")[0];

  // Step 3-5: Classify and find applicable rule
  const classification =
    input.transactionType === "P2P"
      ? "Person-to-Person (P2P) transfer"
      : "Person-to-Merchant (P2M) payment";

  steps.push(`Transaction classified as: ${classification}`);

  const rule = findApplicableRule(input, ruleset);

  // Step 6: Check exemptions (P2P or NONE rate type)
  if (!rule || rule.rateType === "NONE") {
    const reason =
      input.transactionType === "P2P"
        ? "P2P transfers are not subject to merchant MDR."
        : rule
          ? rule.explanation
          : "No applicable rule found for this transaction.";

    steps.push(reason);

    return {
      input,
      amountPaise,
      classification,
      applicableRule: rule || null,
      estimatedMDR: 0,
      estimatedMDRPaise: 0,
      rate: null,
      ratePercent: null,
      capReached: false,
      capAmount: rule?.cap ?? null,
      thresholdApplied: false,
      thresholdAmount: rule?.minAmount ?? null,
      estimatedNet: input.amount,
      estimatedNetPaise: amountPaise,
      isExempt: true,
      exemptionReason: reason,
      explanation: reason,
      formulaSteps: steps,
      rulesetVersion: ruleset.version,
      rulesetEffectiveFrom: ruleset.effectiveFrom,
      sourceRefs: rule ? getSourceRefs(rule, ruleset) : [],
    };
  }

  // Step 7: Check threshold
  const threshold = rule.minAmount;
  if (threshold !== undefined && input.amount <= threshold) {
    const reason = `Amount ₹${formatNum(input.amount)} is at or below the ₹${formatNum(threshold)} threshold. No MDR applies.`;
    steps.push(reason);

    return {
      input,
      amountPaise,
      classification,
      applicableRule: rule,
      estimatedMDR: 0,
      estimatedMDRPaise: 0,
      rate: rule.rate ?? null,
      ratePercent: rule.rate ? `${new Decimal(rule.rate).times(100).toFixed(2)}%` : null,
      capReached: false,
      capAmount: rule.cap ?? null,
      thresholdApplied: true,
      thresholdAmount: threshold,
      estimatedNet: input.amount,
      estimatedNetPaise: amountPaise,
      isExempt: false,
      exemptionReason: null,
      explanation: reason,
      formulaSteps: steps,
      rulesetVersion: ruleset.version,
      rulesetEffectiveFrom: ruleset.effectiveFrom,
      sourceRefs: getSourceRefs(rule, ruleset),
    };
  }

  if (threshold !== undefined) {
    steps.push(
      `Amount ₹${formatNum(input.amount)} exceeds the ₹${formatNum(threshold)} threshold.`
    );
  }

  // Step 8: Apply rate
  let chargePaise: Decimal;
  let chargeRupees: Decimal;

  if (rule.rateType === "PERCENT" && rule.rate !== undefined) {
    const rate = new Decimal(rule.rate);
    chargeRupees = amount.times(rate);
    chargePaise = chargeRupees.times(100);
    steps.push(
      `Applied ${rate.times(100).toFixed(2)}% rate: ₹${formatNum(input.amount)} × ${rate.times(100).toFixed(2)}% = ₹${chargeRupees.toFixed(2)}`
    );
  } else if (rule.rateType === "FLAT" && rule.flatAmount !== undefined) {
    chargeRupees = new Decimal(rule.flatAmount);
    chargePaise = chargeRupees.times(100);
    steps.push(`Applied flat fee: ₹${chargeRupees.toFixed(2)}`);
  } else {
    return createZeroResult(input, ruleset, "Rule has no applicable rate.");
  }

  // Step 9: Apply cap
  let capReached = false;
  if (rule.cap !== undefined) {
    const capDecimal = new Decimal(rule.cap);
    if (chargeRupees.greaterThan(capDecimal)) {
      capReached = true;
      chargeRupees = capDecimal;
      chargePaise = capDecimal.times(100);
      steps.push(
        `Cap applied: charge capped at ₹${capDecimal.toFixed(2)} (cap reached at ₹${formatNum(rule.capStartsAt ?? rule.cap)})`
      );
    } else {
      steps.push(
        `Cap of ₹${capDecimal.toFixed(2)} not reached.`
      );
    }
  }

  // Step 10: Calculate net
  const netRupees = amount.minus(chargeRupees);
  const netPaise = netRupees.times(100);

  steps.push(
    `Estimated merchant net: ₹${formatNum(input.amount)} − ₹${chargeRupees.toFixed(2)} = ₹${netRupees.toFixed(2)}`
  );

  // Step 11: Generate explanation
  const explanation = generateExplanation(input, rule, chargeRupees, capReached, threshold);

  // Step 12: Return with source references
  return {
    input,
    amountPaise,
    classification,
    applicableRule: rule,
    estimatedMDR: chargeRupees.toNumber(),
    estimatedMDRPaise: Math.round(chargePaise.toNumber()),
    rate: rule.rate ?? null,
    ratePercent: rule.rate
      ? `${new Decimal(rule.rate).times(100).toFixed(2)}%`
      : null,
    capReached,
    capAmount: rule.cap ?? null,
    thresholdApplied: threshold !== undefined && input.amount > threshold,
    thresholdAmount: threshold ?? null,
    estimatedNet: netRupees.toNumber(),
    estimatedNetPaise: Math.round(netPaise.toNumber()),
    isExempt: false,
    exemptionReason: null,
    explanation,
    formulaSteps: steps,
    rulesetVersion: ruleset.version,
    rulesetEffectiveFrom: ruleset.effectiveFrom,
    sourceRefs: getSourceRefs(rule, ruleset),
  };
}

/**
 * Generate a human-readable explanation of the calculation
 */
function generateExplanation(
  input: CalculatorInput,
  rule: TransactionRule,
  charge: Decimal,
  capReached: boolean,
  threshold?: number
): string {
  const parts: string[] = [];

  if (input.transactionType === "P2M") {
    parts.push(
      `This is a merchant (P2M) payment of ₹${formatNum(input.amount)}.`
    );
  }

  if (threshold !== undefined) {
    parts.push(
      `Since the amount exceeds the ₹${formatNum(threshold)} threshold, the standard MDR rate applies.`
    );
  }

  if (rule.rateType === "PERCENT" && rule.rate) {
    parts.push(
      `At ${new Decimal(rule.rate).times(100).toFixed(2)}% MDR, the estimated merchant cost is ₹${charge.toFixed(2)}.`
    );
  }

  if (capReached && rule.cap) {
    parts.push(
      `The charge is capped at ₹${rule.cap}, so the merchant pays no more than this amount.`
    );
  }

  parts.push(
    `This is an estimated merchant-side cost, not a fee charged to the customer.`
  );

  return parts.join(" ");
}

/**
 * Create a zero-charge result
 */
function createZeroResult(
  input: CalculatorInput,
  ruleset: RuleSet,
  explanation: string
): CalculationResult {
  const amountPaise = toPaise(input.amount);
  return {
    input,
    amountPaise,
    classification:
      input.transactionType === "P2P"
        ? "Person-to-Person (P2P) transfer"
        : "Person-to-Merchant (P2M) payment",
    applicableRule: null,
    estimatedMDR: 0,
    estimatedMDRPaise: 0,
    rate: null,
    ratePercent: null,
    capReached: false,
    capAmount: null,
    thresholdApplied: false,
    thresholdAmount: null,
    estimatedNet: input.amount,
    estimatedNetPaise: amountPaise,
    isExempt: true,
    exemptionReason: explanation,
    explanation,
    formulaSteps: [explanation],
    rulesetVersion: ruleset.version,
    rulesetEffectiveFrom: ruleset.effectiveFrom,
    sourceRefs: [],
  };
}

/**
 * Simple number formatter for use in explanations
 */
function formatNum(n: number): string {
  return n.toLocaleString("en-IN");
}
