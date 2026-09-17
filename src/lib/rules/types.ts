// ─── Source Reference ───────────────────────────────────────────────
export type SourceRef = {
  id: string;
  title: string;
  publisher: string;
  url: string;
  publishedAt: string;
  accessedAt: string;
  documentHash?: string;
};

// ─── Condition ──────────────────────────────────────────────────────
export type Condition = {
  field: string;
  operator: "eq" | "neq" | "gt" | "gte" | "lt" | "lte" | "in" | "notIn";
  value: string | number | boolean | string[];
  description: string;
};

// ─── Transaction Rule ───────────────────────────────────────────────
export type TransactionRule = {
  id: string;
  priority: number;
  transactionType: "P2P" | "P2M";
  category?: string;
  merchantClass?: string;
  minAmount?: number;
  maxAmount?: number;
  rateType: "NONE" | "PERCENT" | "FLAT";
  rate?: number;
  flatAmount?: number;
  cap?: number;
  capStartsAt?: number;
  conditions: Condition[];
  explanation: string;
  sourceIds: string[];
};

// ─── Rule Set ───────────────────────────────────────────────────────
export type RuleSet = {
  id: string;
  version: string;
  effectiveFrom: string; // ISO date
  effectiveTo?: string | null;
  status: "draft" | "active" | "archived";
  currency: "INR";
  sources: SourceRef[];
  rules: TransactionRule[];
};

// ─── Calculator Input ───────────────────────────────────────────────
export type CalculatorInput = {
  amount: number; // in rupees
  transactionType: "P2P" | "P2M";
  category?: string;
  merchantClass?: string;
  transactionDate?: string; // ISO date
};

// ─── Calculation Result ─────────────────────────────────────────────
export type CalculationResult = {
  input: CalculatorInput;
  amountPaise: number;
  classification: string;
  applicableRule: TransactionRule | null;
  estimatedMDR: number; // in rupees
  estimatedMDRPaise: number;
  rate: number | null; // decimal, e.g. 0.004
  ratePercent: string | null; // display string, e.g. "0.40%"
  capReached: boolean;
  capAmount: number | null;
  thresholdApplied: boolean;
  thresholdAmount: number | null;
  estimatedNet: number; // in rupees
  estimatedNetPaise: number;
  isExempt: boolean;
  exemptionReason: string | null;
  explanation: string;
  formulaSteps: string[];
  rulesetVersion: string;
  rulesetEffectiveFrom: string;
  sourceRefs: SourceRef[];
};

// ─── Monthly Calculator Types ───────────────────────────────────────
export type MonthlyEstimateInput = {
  averageTransaction: number;
  numberOfTransactions: number;
  monthlyVolume: number;
  transactionType: "P2P" | "P2M";
  category?: string;
  merchantClass?: string;
};

export type MonthlyEstimateResult = {
  grossVolume: number;
  eligibleVolume: number;
  exemptVolume: number;
  estimatedTotalMDR: number;
  averageMDRPerTransaction: number;
  perTransactionResult: CalculationResult;
};

// ─── Amount Bucket (for analytics) ──────────────────────────────────
export type AmountBucket =
  | "0-500"
  | "500-2000"
  | "2000-5000"
  | "5000-10000"
  | "10000-25000"
  | "25000-50000"
  | "50000-75000"
  | "75000-100000"
  | "100000+";
