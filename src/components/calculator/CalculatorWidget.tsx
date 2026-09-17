"use client";

import React, { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Info,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Copy,
  Check,
  Share2,
  Sparkles,
  Download,
  Settings2,
  Edit3,
  Scan
} from "lucide-react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { QRCodeSVG } from "qrcode.react";
import { calculate } from "@/lib/rules/engine";
import { resolveRuleset } from "@/lib/rules/resolver";
import { formatINR, parseINRInput } from "@/lib/formatting/currency";
import { validateAmountInput } from "@/lib/validation/calculator";
import type { CalculationResult } from "@/lib/rules/types";
import { MDRChart } from "./MDRChart";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useHistoryStore } from "@/lib/store/historyStore";

const QUICK_AMOUNTS = [
  { label: "₹1,999", value: 1999 },
  { label: "₹2,000", value: 2000 },
  { label: "₹2,001", value: 2001 },
  { label: "₹10,000", value: 10000 },
  { label: "₹75,000", value: 75000 },
  { label: "₹1,00,000", value: 100000 },
];

type Props = {
  compact?: boolean;
};

export function CalculatorWidget({ compact = false }: Props) {
  const [amountInput, setAmountInput] = useState("");
  const [transactionType, setTransactionType] = useState<"P2M" | "P2P">("P2M");
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  
  // Custom Receipt & QR State
  const [shopName, setShopName] = useState("");
  const [gstin, setGstin] = useState("");
  const [upiId, setUpiId] = useState("");
  const [isEditingReceipt, setIsEditingReceipt] = useState(false);
  const [isQrCodeVisible, setIsQrCodeVisible] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const resultCardRef = useRef<HTMLDivElement>(null);
  
  const { t } = useLanguage();
  const { addSingleCalculation } = useHistoryStore();

  const handleDownloadPDF = async () => {
    if (!resultCardRef.current || !result) return;
    try {
      setIsDownloading(true);
      // Brief pause to ensure any active states settle
      await new Promise((resolve) => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(resultCardRef.current, {
        scale: 2, // High resolution
        backgroundColor: document.documentElement.getAttribute("data-theme") === "dark" ? "#0F172A" : "#FFFFFF",
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`upi-mdr-receipt-${result.input.amount}.pdf`);
    } catch (err) {
      console.error("PDF generation failed:", err);
    } finally {
      setIsDownloading(false);
    }
  };

  // Read from URL on mount for shareable links
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const amountParam = params.get("amount");
      const typeParam = params.get("type");
      
      let initialType = transactionType;
      let initialAmount = amountInput;

      if (amountParam) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setAmountInput(amountParam);
        initialAmount = amountParam;
      }
      if (typeParam && (typeParam === "P2M" || typeParam === "P2P")) {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTransactionType(typeParam as "P2M" | "P2P");
        initialType = typeParam as "P2M" | "P2P";
      }

      if (initialAmount) {
        // Auto-calculate on load if amount is provided
        const validation = validateAmountInput(initialAmount);
        if (validation.valid && validation.value !== null) {
          const ruleset = resolveRuleset();
          const res = calculate(
            { amount: validation.value, transactionType: initialType },
            ruleset
          );
          setResult(res);
          addSingleCalculation(res);
        }
      }

      // Load White-label receipt settings
      const savedShopName = localStorage.getItem("upi-receipt-shop-name");
      const savedGstin = localStorage.getItem("upi-receipt-gstin");
      const savedUpiId = localStorage.getItem("upi-receipt-id");
      if (savedShopName) setShopName(savedShopName);
      if (savedGstin) setGstin(savedGstin);
      if (savedUpiId) setUpiId(savedUpiId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Focus input on mount
  useEffect(() => {
    if (!compact && !amountInput) {
      inputRef.current?.focus();
    }
  }, [compact, amountInput]);

  const handleCalculate = useCallback(() => {
    const validation = validateAmountInput(amountInput);
    if (!validation.valid || validation.value === null) {
      setError(validation.error);
      setResult(null);
      return;
    }

    setError(null);
    const ruleset = resolveRuleset();
    const calcResult = calculate(
      { amount: validation.value, transactionType },
      ruleset
    );
    setResult(calcResult);
    addSingleCalculation(calcResult);
  }, [amountInput, transactionType, addSingleCalculation]);

  const saveReceiptSettings = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("upi-receipt-shop-name", shopName);
      localStorage.setItem("upi-receipt-gstin", gstin);
      localStorage.setItem("upi-receipt-id", upiId);
    }
    setIsEditingReceipt(false);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    // Allow only digits, commas, and dots
    const filtered = raw.replace(/[^0-9.,]/g, "");
    setAmountInput(filtered);
    setError(null);

    // Clear result on input change so user must click calculate
    setResult(null);
  };

  const handleQuickAmount = (value: number) => {
    setAmountInput(value.toString());
    setError(null);
    // Clear result so user must click calculate
    setResult(null);
  };

  const handleTypeChange = (type: "P2M" | "P2P") => {
    setTransactionType(type);
    // Clear result so user must click calculate
    setResult(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCalculate();
    }
  };

  const handleCopyResult = () => {
    if (!result) return;
    const text = `UPI ${result.classification}: ${formatINR(result.input.amount)} → MDR: ${formatINR(result.estimatedMDR, true)} | Net: ${formatINR(result.estimatedNet, true)} (Rules v${result.rulesetVersion})`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={
        compact
          ? { width: "100%", maxWidth: 520, margin: "0 auto" }
          : {
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
              gap: 32,
              alignItems: "start",
              width: "100%",
              maxWidth: 960,
              margin: "0 auto",
            }
      }
    >
      {/* Calculator Card */}
      <div
        className="card-surface"
        style={{
          padding: compact ? 24 : 32,
          position: "relative",
          overflow: "hidden",
        }}
      >

        {/* Amount Input */}
        <div style={{ marginBottom: 20 }}>
          <label
            htmlFor="calc-amount"
            style={{
              display: "block",
              fontSize: 13,
              fontWeight: 600,
              color: "hsl(var(--muted))",
              marginBottom: 8,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Payment Amount
          </label>
          <div style={{ position: "relative" }}>
            <span
              style={{
                position: "absolute",
                left: 16,
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: 24,
                fontWeight: 600,
                color: "hsl(var(--muted))",
              }}
            >
              ₹
            </span>
            <input
              ref={inputRef}
              id="calc-amount"
              type="text"
              inputMode="numeric"
              placeholder="0.00"
              value={amountInput}
              onChange={handleAmountChange}
              onKeyDown={handleKeyDown}
              style={{
                width: "100%",
                padding: "20px 16px 20px 48px",
                fontSize: 32,
                fontWeight: 700,
                letterSpacing: "-0.04em",
                border: "none",
                borderBottom: error ? "2px solid hsl(var(--destructive))" : "2px solid hsl(var(--border))",
                background: "transparent",
                color: "hsl(var(--foreground))",
                outline: "none",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => {
                if (!error) e.currentTarget.style.borderBottom = "2px solid hsl(var(--foreground))";
              }}
              onBlur={(e) => {
                if (!error) e.currentTarget.style.borderBottom = "2px solid hsl(var(--border))";
              }}
            />
          </div>
          {error && (
            <p
              id="calc-error"
              role="alert"
              style={{
                fontSize: 13,
                color: "hsl(var(--destructive))",
                marginTop: 6,
              }}
            >
              {error}
            </p>
          )}
        </div>

        {/* Quick Amount Buttons */}
        <div style={{ marginBottom: 20 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              marginBottom: 8,
              color: "hsl(var(--muted))",
            }}
          >
            {t("quickAmounts")}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
            }}
          >
            {QUICK_AMOUNTS.map((qa) => (
              <button
                key={qa.value}
                onClick={() => handleQuickAmount(qa.value)}
                style={{
                  padding: "6px 14px",
                  fontSize: 13,
                  fontWeight: 500,
                  borderRadius: "var(--radius-full)",
                  border: "1px solid hsl(var(--border))",
                  background:
                    parseINRInput(amountInput) === qa.value
                      ? "hsl(var(--primary))"
                      : "hsl(var(--surface))",
                  color:
                    parseINRInput(amountInput) === qa.value
                      ? "white"
                      : "hsl(var(--foreground))",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {qa.label}
              </button>
            ))}
          </div>
        </div>

        {/* Transaction Type */}
        <div style={{ marginBottom: 24 }}>
          <label
            style={{
              display: "block",
              fontSize: 14,
              fontWeight: 600,
              marginBottom: 10,
              color: "hsl(var(--foreground))",
            }}
          >
            {t("transactionType")}
          </label>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 8,
            }}
          >
            {(["P2M", "P2P"] as const).map((type) => (
              <button
                key={type}
                onClick={() => handleTypeChange(type)}
                aria-pressed={transactionType === type}
                style={{
                  padding: "12px 16px",
                  borderRadius: "var(--radius-sm)",
                  border: `2px solid ${transactionType === type ? "hsl(var(--primary))" : "hsl(var(--border))"}`,
                  background:
                    transactionType === type
                      ? "hsl(var(--primary-light))"
                      : "hsl(var(--surface))",
                  color: "hsl(var(--foreground))",
                  cursor: "pointer",
                  transition: "all 0.15s",
                  textAlign: "left",
                  fontFamily: "inherit",
                }}
              >
                <div style={{ fontSize: 14, fontWeight: 600 }}>
                  {type === "P2M" ? t("p2mTitle") : t("p2pTitle")}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color:
                      transactionType === type
                        ? "hsl(var(--primary))"
                        : "hsl(var(--muted))",
                    marginTop: 2,
                  }}
                >
                  {type === "P2M" ? t("p2mDesc") : t("p2pDesc")}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          style={{
            width: "100%",
            padding: "14px 24px",
            fontSize: 16,
            fontWeight: 600,
            borderRadius: "var(--radius-sm)",
            border: "none",
            color: "white",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            transition: "opacity 0.15s, transform 0.1s",
            fontFamily: "inherit",
          }}
          className="gradient-primary"
          onMouseDown={(e) =>
            (e.currentTarget.style.transform = "scale(0.98)")
          }
          onMouseUp={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        >
          <Sparkles size={18} />
          {t("calculateBtn")}
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Result Card */}
      <AnimatePresence mode="wait">
        {result && (
          <motion.div
            key={`${result.input.amount}-${result.input.transactionType}`}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="card-surface"
            ref={resultCardRef}
            style={{ 
              marginTop: compact ? 16 : 0, 
              padding: compact ? 24 : 32, 
              position: "relative", 
              overflow: "hidden",
              height: "100%"
            }}
          >
            {/* Status indicator bar */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background:
                  result.estimatedMDR === 0
                    ? "hsl(var(--success))"
                    : result.capReached
                      ? "hsl(var(--warning))"
                      : "hsl(var(--primary))",
              }}
            />

            {/* Custom Receipt Header */}
            {(shopName || gstin) && (
              <div style={{ textAlign: "center", marginBottom: 24, paddingBottom: 16, borderBottom: "1px dashed hsl(var(--border))" }}>
                {shopName && <div style={{ fontSize: 18, fontWeight: 700 }}>{shopName}</div>}
                {gstin && <div style={{ fontSize: 12, color: "hsl(var(--muted))", marginTop: 4 }}>GSTIN: {gstin}</div>}
              </div>
            )}
            
            {/* Dynamic QR Code */}
            {isQrCodeVisible && upiId && result.input.amount > 0 && (
              <div style={{ textAlign: "center", marginBottom: 24, paddingBottom: 24, borderBottom: "1px dashed hsl(var(--border))" }}>
                <div style={{ background: "white", padding: 16, borderRadius: 12, display: "inline-block", border: "1px solid #E2E8F0" }}>
                  <QRCodeSVG 
                    value={`upi://pay?pa=${upiId}&pn=${encodeURIComponent(shopName || 'Merchant')}&am=${result.input.amount}&cu=INR`}
                    size={180}
                    level="H"
                  />
                </div>
                <div style={{ marginTop: 12, fontSize: 14, fontWeight: 600 }}>Scan to Pay {formatINR(result.input.amount)}</div>
                <div style={{ marginTop: 4, fontSize: 12, color: "hsl(var(--muted))" }}>UPI ID: {upiId}</div>
              </div>
            )}

            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "hsl(var(--muted))",
                  }}
                >
                  {result.classification}
                </div>
                <div
                  className="amount-display"
                  style={{
                    fontSize: 20,
                    marginTop: 4,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  {formatINR(result.input.amount)}
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                  title="Download PDF Receipt"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid hsl(var(--border))",
                    background: "hsl(var(--surface))",
                    color: "hsl(var(--muted))",
                    cursor: isDownloading ? "wait" : "pointer",
                    opacity: isDownloading ? 0.7 : 1,
                  }}
                >
                  <Download size={16} />
                </button>
                <button
                  onClick={() => {
                    if (!result) return;
                    const text = `Hey! The UPI fee for this ${formatINR(result.input.amount)} payment will be ${formatINR(result.estimatedMDR)}. Check the full breakdown here: https://upicost.in`;
                    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
                  }}
                  title="Share to WhatsApp"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid hsl(var(--border))",
                    background: "#25D366", // WhatsApp Green
                    color: "white",
                    cursor: "pointer",
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </button>
                <button
                  onClick={handleCopyResult}
                  title="Copy result"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid hsl(var(--border))",
                    background: "hsl(var(--surface))",
                    color: copied ? "hsl(var(--success))" : "hsl(var(--foreground))",
                    cursor: "pointer",
                  }}
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
                <button
                  onClick={() => setIsEditingReceipt(!isEditingReceipt)}
                  title="Customize Receipt"
                  data-html2canvas-ignore="true"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid hsl(var(--border))",
                    background: isEditingReceipt ? "hsl(var(--primary-light))" : "hsl(var(--surface))",
                    color: isEditingReceipt ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                    cursor: "pointer",
                  }}
                >
                  <Edit3 size={16} />
                </button>
              </div>
            </div>
            
            {/* Action for QR */}
            {upiId && (
              <div data-html2canvas-ignore="true" style={{ marginBottom: 20 }}>
                <button
                  onClick={() => setIsQrCodeVisible(!isQrCodeVisible)}
                  className="gradient-primary"
                  style={{ width: "100%", padding: "10px", borderRadius: "var(--radius-sm)", color: "white", fontWeight: 600, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                >
                  <Scan size={18} /> {isQrCodeVisible ? "Hide QR Code" : "Show Payment QR"}
                </button>
              </div>
            )}

            {/* Receipt Editor Form (Hidden from PDF) */}
            {isEditingReceipt && (
              <div data-html2canvas-ignore="true" style={{ marginBottom: 24, padding: 16, background: "hsl(var(--muted-bg))", borderRadius: "var(--radius-md)", border: "1px solid hsl(var(--border))" }}>
                <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}>
                  <Settings2 size={16} /> Customize Receipt & POS
                </h4>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12, marginBottom: 4, color: "hsl(var(--muted))" }}>Shop Name</label>
                    <input type="text" value={shopName} onChange={(e) => setShopName(e.target.value)} placeholder="e.g. Sharma Kirana" style={{ width: "100%", padding: "8px", borderRadius: "var(--radius-sm)", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", color: "hsl(var(--foreground))" }} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, marginBottom: 4, color: "hsl(var(--muted))" }}>GSTIN (Optional)</label>
                    <input type="text" value={gstin} onChange={(e) => setGstin(e.target.value)} placeholder="22AAAAA0000A1Z5" style={{ width: "100%", padding: "8px", borderRadius: "var(--radius-sm)", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", color: "hsl(var(--foreground))" }} />
                  </div>
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 12, marginBottom: 4, color: "hsl(var(--muted))" }}>UPI ID (VPA) for QR Code</label>
                  <input type="text" value={upiId} onChange={(e) => setUpiId(e.target.value)} placeholder="e.g. shop@okicici" style={{ width: "100%", padding: "8px", borderRadius: "var(--radius-sm)", border: "1px solid hsl(var(--border))", background: "hsl(var(--background))", color: "hsl(var(--foreground))" }} />
                </div>
                <button onClick={saveReceiptSettings} className="gradient-primary" style={{ padding: "8px 16px", borderRadius: "var(--radius-sm)", color: "white", fontWeight: 600, border: "none", cursor: "pointer", fontSize: 13 }}>
                  Save & Apply
                </button>
              </div>
            )}

            {/* Main Result */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  padding: 16,
                  borderRadius: "var(--radius-sm)",
                  background: result.estimatedMDR === 0
                    ? "hsl(var(--success-light))"
                    : "hsl(var(--primary-light))",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "hsl(var(--muted))",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {t("estMDR")}
                </div>
                <div
                  className="amount-display"
                  style={{
                    fontSize: 28,
                    marginTop: 6,
                    color: result.estimatedMDR === 0
                      ? "hsl(var(--success))"
                      : "hsl(var(--primary))",
                  }}
                >
                  {formatINR(result.estimatedMDR, true)}
                </div>
                {result.ratePercent && (
                  <div
                    style={{
                      fontSize: 13,
                      color: "hsl(var(--muted))",
                      marginTop: 4,
                    }}
                  >
                    {t("rate")}: {result.ratePercent}
                  </div>
                )}
              </div>

              <div
                style={{
                  padding: 16,
                  borderRadius: "var(--radius-sm)",
                  background: "hsl(var(--muted-bg))",
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "hsl(var(--muted))",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {t("estNet")}
                </div>
                <div
                  className="amount-display"
                  style={{
                    fontSize: 28,
                    marginTop: 6,
                    color: "hsl(var(--foreground))",
                  }}
                >
                  {formatINR(result.estimatedNet, true)}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "hsl(var(--muted))",
                    marginTop: 4,
                  }}
                >
                  {t("merchantReceives")}
                </div>
              </div>
            </div>

            {/* MDR Chart Visualization */}
            <MDRChart 
              netAmount={result.estimatedNet} 
              mdrAmount={result.estimatedMDR} 
              isDark={typeof document !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'dark'} 
            />

            {/* Status Badges */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 16,
              }}
            >
              {result.isExempt && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "4px 12px",
                    fontSize: 12,
                    fontWeight: 600,
                    borderRadius: "var(--radius-full)",
                    background: "hsl(var(--success-light))",
                    color: "hsl(var(--success))",
                  }}
                >
                  ✓ No MDR
                </span>
              )}
              {result.thresholdApplied && !result.isExempt && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "4px 12px",
                    fontSize: 12,
                    fontWeight: 600,
                    borderRadius: "var(--radius-full)",
                    background: "hsl(var(--primary-light))",
                    color: "hsl(var(--primary))",
                  }}
                >
                  Above ₹{result.thresholdAmount?.toLocaleString("en-IN")} threshold
                </span>
              )}
              {result.capReached && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "4px 12px",
                    fontSize: 12,
                    fontWeight: 600,
                    borderRadius: "var(--radius-full)",
                    background: "hsl(var(--warning-light))",
                    color: "hsl(var(--warning))",
                  }}
                >
                  ₹{result.capAmount} cap reached
                </span>
              )}
              {!result.isExempt && !result.capReached && result.estimatedMDR > 0 && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "4px 12px",
                    fontSize: 12,
                    fontWeight: 600,
                    borderRadius: "var(--radius-full)",
                    background: "hsl(var(--muted-bg))",
                    color: "hsl(var(--muted))",
                  }}
                >
                  Cap not reached
                </span>
              )}
            </div>

            {/* Merchant-side label */}
            <div
              style={{
                padding: "10px 14px",
                borderRadius: "var(--radius-sm)",
                background: "hsl(var(--muted-bg))",
                fontSize: 13,
                color: "hsl(var(--muted))",
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
                marginBottom: 16,
              }}
            >
              <Info size={16} style={{ flexShrink: 0, marginTop: 1 }} />
              <span>
                {result.explanation}
              </span>
            </div>

            {/* Actions: Expandable Details & Share Result */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>
              <button
                onClick={() => setShowDetails(!showDetails)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 0",
                  background: "none",
                  border: "none",
                  color: "hsl(var(--primary))",
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {showDetails ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                {showDetails ? "Hide" : "Show"} calculation steps
              </button>

              <button
                onClick={() => {
                  const url = new URL(window.location.href);
                  url.searchParams.set("amount", amountInput);
                  url.searchParams.set("type", transactionType);
                  navigator.clipboard.writeText(url.toString());
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "8px 12px",
                  background: "hsl(var(--primary-light))",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  color: "hsl(var(--primary))",
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                {copied ? <Check size={14} /> : <Share2 size={14} />}
                {copied ? "Link Copied!" : "Share Result"}
              </button>
            </div>

            <AnimatePresence>
              {showDetails && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ overflow: "hidden" }}
                >
                  <div
                    style={{
                      padding: 16,
                      borderRadius: "var(--radius-sm)",
                      background: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      marginTop: 8,
                    }}
                  >
                    <ol
                      style={{
                        margin: 0,
                        paddingLeft: 20,
                        fontSize: 13,
                        lineHeight: 1.8,
                        color: "hsl(var(--foreground))",
                      }}
                    >
                      {result.formulaSteps.map((step, i) => (
                        <li key={i} style={{ marginBottom: 4 }}>
                          {step}
                        </li>
                      ))}
                    </ol>

                    {/* Source & Version */}
                    <div
                      style={{
                        marginTop: 16,
                        paddingTop: 12,
                        borderTop: "1px solid hsl(var(--border))",
                        fontSize: 12,
                        color: "hsl(var(--muted))",
                      }}
                    >
                      <div>
                        Ruleset: v{result.rulesetVersion} (effective{" "}
                        {new Date(result.rulesetEffectiveFrom).toLocaleDateString(
                          "en-IN",
                          { day: "numeric", month: "long", year: "numeric" }
                        )}
                        )
                      </div>
                      {result.sourceRefs.length > 0 && (
                        <div style={{ marginTop: 8 }}>
                          <div style={{ fontWeight: 600, marginBottom: 4 }}>Sources:</div>
                          {result.sourceRefs.map((src) => (
                            <a
                              key={src.id}
                              href={src.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                                color: "hsl(var(--primary))",
                                textDecoration: "none",
                                marginBottom: 4,
                              }}
                            >
                              {src.title} — {src.publisher}
                              <ExternalLink size={10} />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
