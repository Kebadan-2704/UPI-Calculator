"use client";

import React, { useState, useRef } from "react";
import Papa from "papaparse";
import { Upload, FileSpreadsheet, AlertCircle } from "lucide-react";
import { calculate } from "@/lib/rules/engine";
import { resolveRuleset } from "@/lib/rules/resolver";
import { formatINR } from "@/lib/formatting/currency";
import { MDRChart } from "@/components/calculator/MDRChart";
import { useHistoryStore } from "@/lib/store/historyStore";

type BulkResult = {
  totalVolume: number;
  totalTransactions: number;
  totalMDR: number;
  totalNet: number;
};

export default function BulkCalculatorPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<BulkResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const { addBulkCalculation } = useHistoryStore();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== "text/csv" && !selectedFile.name.endsWith(".csv")) {
        setError("Please upload a valid CSV file.");
        return;
      }
      setFile(selectedFile);
      setError(null);
      setResults(null);
    }
  };

  const processCSV = () => {
    if (!file) return;
    setLoading(true);
    setError(null);

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const ruleset = resolveRuleset();
          let totalVolume = 0;
          let totalMDR = 0;
          let totalNet = 0;
          let validTransactions = 0;

          results.data.forEach((row: any) => {
            // Find keys dynamically to be forgiving with headers (Amount, amount, Amount (INR))
            const amountKey = Object.keys(row).find((k) => k.toLowerCase().includes("amount"));
            const typeKey = Object.keys(row).find((k) => k.toLowerCase().includes("type"));
            
            if (!amountKey) return;
            
            const rawAmount = String(row[amountKey]).replace(/[^0-9.]/g, "");
            const amount = parseFloat(rawAmount);
            if (isNaN(amount)) return;

            let type: "P2M" | "P2P" = "P2M";
            if (typeKey && String(row[typeKey]).toUpperCase().includes("P2P")) {
              type = "P2P";
            }

            const calc = calculate(
              { amount, transactionType: type, category: "STANDARD" },
              ruleset
            );

            totalVolume += amount;
            totalMDR += calc.estimatedMDR;
            totalNet += calc.estimatedNet;
            validTransactions++;
          });

          if (validTransactions === 0) {
            setError("Could not find valid transaction data in the CSV. Ensure there is an 'Amount' column.");
            setLoading(false);
            return;
          }

          setResults({
            totalVolume,
            totalTransactions: validTransactions,
            totalMDR,
            totalNet,
          });
          
          addBulkCalculation(totalVolume, totalMDR, validTransactions);
        } catch (err) {
          setError("An error occurred while processing the file.");
        } finally {
          setLoading(false);
        }
      },
      error: (err) => {
        setError("Failed to parse CSV: " + err.message);
        setLoading(false);
      }
    });
  };

  return (
    <div className="container-narrow" style={{ padding: "40px 16px", minHeight: "80vh" }}>
      <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12, color: "hsl(var(--foreground))" }}>
        Bulk CSV Calculator
      </h1>
      <p style={{ color: "hsl(var(--muted))", marginBottom: 32, fontSize: 16 }}>
        Upload a daily settlement CSV to instantly calculate the total MDR cost across all your transactions.
      </p>

      <div 
        className="card-surface" 
        style={{ 
          padding: 32, 
          borderRadius: "var(--radius-lg)",
          marginBottom: 32,
          border: "1px dashed hsl(var(--border))",
          textAlign: "center"
        }}
      >
        <FileSpreadsheet size={48} style={{ color: "hsl(var(--primary))", margin: "0 auto 16px" }} />
        
        <input 
          type="file" 
          accept=".csv" 
          onChange={handleFileUpload}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        
        {!file ? (
          <div>
            <p style={{ marginBottom: 20, fontWeight: 500 }}>
              Upload your transaction ledger
            </p>
            <p style={{ fontSize: 13, color: "hsl(var(--muted))", marginBottom: 20 }}>
              Required Columns: <code style={{ background: "hsl(var(--muted-bg))", padding: "2px 6px", borderRadius: 4 }}>Amount</code>
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="gradient-primary"
              style={{
                padding: "10px 24px",
                borderRadius: "var(--radius-sm)",
                color: "white",
                fontWeight: 600,
                border: "none",
                cursor: "pointer"
              }}
            >
              Select CSV File
            </button>
          </div>
        ) : (
          <div>
            <p style={{ marginBottom: 16, fontWeight: 600, color: "hsl(var(--success))" }}>
              {file.name} selected
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button
                onClick={processCSV}
                disabled={loading}
                className="gradient-primary"
                style={{
                  padding: "10px 24px",
                  borderRadius: "var(--radius-sm)",
                  color: "white",
                  fontWeight: 600,
                  border: "none",
                  cursor: loading ? "wait" : "pointer",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Processing..." : "Process Ledger"}
              </button>
              <button
                onClick={() => { setFile(null); setResults(null); }}
                style={{
                  padding: "10px 24px",
                  borderRadius: "var(--radius-sm)",
                  color: "hsl(var(--foreground))",
                  background: "hsl(var(--surface))",
                  border: "1px solid hsl(var(--border))",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {error && (
          <div style={{ marginTop: 24, padding: 12, background: "hsl(var(--destructive-light))", color: "hsl(var(--destructive))", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            <AlertCircle size={16} />
            <span style={{ fontSize: 14 }}>{error}</span>
          </div>
        )}
      </div>

      {results && (
        <div 
          className="card-surface"
          style={{
            padding: 32,
            borderRadius: "var(--radius-lg)",
            animation: "fadeIn 0.5s ease-out"
          }}
        >
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24 }}>Ledger Summary</h2>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 32 }}>
            <div style={{ padding: 20, background: "hsl(var(--muted-bg))", borderRadius: "var(--radius-md)" }}>
              <div style={{ fontSize: 13, color: "hsl(var(--muted))", marginBottom: 8, textTransform: "uppercase" }}>Total Volume</div>
              <div style={{ fontSize: 28, fontWeight: 700 }}>{formatINR(results.totalVolume)}</div>
              <div style={{ fontSize: 12, color: "hsl(var(--muted))", marginTop: 4 }}>Across {results.totalTransactions} transactions</div>
            </div>
            
            <div style={{ padding: 20, background: "hsl(var(--primary-light))", borderRadius: "var(--radius-md)" }}>
              <div style={{ fontSize: 13, color: "hsl(var(--muted))", marginBottom: 8, textTransform: "uppercase" }}>Total MDR Cost</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: "hsl(var(--primary))" }}>{formatINR(results.totalMDR)}</div>
              <div style={{ fontSize: 12, color: "hsl(var(--muted))", marginTop: 4 }}>
                Effective Rate: {((results.totalMDR / results.totalVolume) * 100).toFixed(2)}%
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, textAlign: "center" }}>Cost Distribution</h3>
          <MDRChart 
            netAmount={results.totalNet} 
            mdrAmount={results.totalMDR} 
            isDark={typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'dark'} 
          />
        </div>
      )}
    </div>
  );
}
