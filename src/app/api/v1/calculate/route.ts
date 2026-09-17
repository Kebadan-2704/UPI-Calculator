import { NextRequest, NextResponse } from "next/server";
import { calculate } from "@/lib/rules/engine";
import { resolveRuleset } from "@/lib/rules/resolver";
import { calculatorInputSchema } from "@/lib/validation/calculator";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Extract query params
    const amountStr = searchParams.get("amount");
    const typeStr = searchParams.get("transactionType");
    const category = searchParams.get("category") || undefined;

    // Validate inputs
    if (!amountStr || !typeStr) {
      return NextResponse.json(
        { error: "Missing required parameters: 'amount' and 'transactionType'." },
        { status: 400 }
      );
    }

    const amount = Number(amountStr);
    
    // Parse using Zod
    const validationResult = calculatorInputSchema.safeParse({
      amount,
      transactionType: typeStr.toUpperCase(),
      category,
    });

    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: "Validation failed", 
          details: validationResult.error.issues.map(i => i.message)
        },
        { status: 400 }
      );
    }

    const validData = validationResult.data;

    // Resolve rules and calculate
    const ruleset = resolveRuleset();
    const result = calculate(
      {
        amount: validData.amount,
        transactionType: validData.transactionType,
        category: validData.category,
      },
      ruleset
    );

    // Format output
    return NextResponse.json({
      success: true,
      data: {
        input: {
          amount: validData.amount,
          transactionType: validData.transactionType,
          category: validData.category,
        },
        calculation: {
          estimatedMDR: result.estimatedMDR,
          estimatedNet: result.estimatedNet,
          isExempt: result.isExempt,
          thresholdApplied: result.thresholdApplied,
          thresholdAmount: result.thresholdAmount,
          capReached: result.capReached,
          capAmount: result.capAmount,
          ratePercent: result.ratePercent,
          formulaSteps: result.formulaSteps,
        },
        metadata: {
          rulesetVersion: result.rulesetVersion,
          effectiveFrom: result.rulesetEffectiveFrom,
          explanation: result.explanation,
        }
      }
    });

  } catch (error) {
    console.error("API Error [GET /api/v1/calculate]:", error);
    return NextResponse.json(
      { error: "Internal server error during calculation." },
      { status: 500 }
    );
  }
}
