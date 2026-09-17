import type { RuleSet } from "@/lib/rules/types";
import { RULESET_2026_10_15 } from "@/data/rules/2026-10-15";

/**
 * Registry of all rulesets, ordered by effective date (newest first).
 */
const RULESETS: RuleSet[] = [RULESET_2026_10_15];

/**
 * Resolve the active ruleset for a given date.
 * Returns the most recent ruleset whose effectiveFrom <= date
 * and whose effectiveTo is null or >= date.
 */
export function resolveRuleset(dateStr?: string): RuleSet {
  const date = dateStr || new Date().toISOString().split("T")[0];

  const applicable = RULESETS.filter((rs) => {
    if (rs.status !== "active") return false;
    if (rs.effectiveFrom > date) return false;
    if (rs.effectiveTo && rs.effectiveTo < date) return false;
    return true;
  });

  // Return the most recent applicable ruleset
  if (applicable.length > 0) {
    return applicable[0];
  }

  // Fallback to the newest active ruleset
  const active = RULESETS.find((rs) => rs.status === "active");
  if (active) return active;

  // Last resort: return first ruleset
  return RULESETS[0];
}

/**
 * Get all rulesets for history/admin views
 */
export function getAllRulesets(): RuleSet[] {
  return RULESETS;
}

/**
 * Get a specific ruleset by ID
 */
export function getRulesetById(id: string): RuleSet | undefined {
  return RULESETS.find((rs) => rs.id === id);
}

/**
 * Get a specific ruleset by version
 */
export function getRulesetByVersion(version: string): RuleSet | undefined {
  return RULESETS.find((rs) => rs.version === version);
}
