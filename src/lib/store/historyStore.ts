"use client";

import { useState, useEffect, useCallback } from "react";
import type { CalculationResult } from "@/lib/rules/types";

export type HistoryEntry = {
  id: string;
  timestamp: number;
  type: "SINGLE" | "BULK";
  details: any;
};

const STORAGE_KEY = "upi-cost-history";

export function useHistoryStore() {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          setHistory(JSON.parse(stored));
        } catch (e) {
          console.error("Failed to parse history");
        }
      }
      setIsLoaded(true);
    }
  }, []);

  const saveHistory = useCallback((entries: HistoryEntry[]) => {
    setHistory(entries);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    }
  }, []);

  const addSingleCalculation = useCallback((result: CalculationResult) => {
    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      type: "SINGLE",
      details: {
        amount: result.input.amount,
        type: result.input.transactionType,
        mdr: result.estimatedMDR,
        net: result.estimatedNet
      }
    };
    
    setHistory(prev => {
      const updated = [entry, ...prev].slice(0, 100); // Keep last 100
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  const addBulkCalculation = useCallback((totalVolume: number, totalMDR: number, totalTransactions: number) => {
    const entry: HistoryEntry = {
      id: crypto.randomUUID(),
      timestamp: Date.now(),
      type: "BULK",
      details: {
        totalVolume,
        totalMDR,
        totalTransactions
      }
    };
    
    setHistory(prev => {
      const updated = [entry, ...prev].slice(0, 100);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    saveHistory([]);
  }, [saveHistory]);

  return {
    history,
    isLoaded,
    addSingleCalculation,
    addBulkCalculation,
    clearHistory
  };
}
