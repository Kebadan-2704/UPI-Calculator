"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, ArrowRight, Trophy, RotateCcw, BrainCircuit } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Is there any charge for a customer transferring money to a friend's bank account via UPI?",
    options: [
      "Yes, 1.1% above ₹2,000",
      "No, Peer-to-Peer (P2P) transfers are always free",
      "Yes, a flat ₹10 fee",
      "Only if they use a credit card"
    ],
    correctIndex: 1,
    explanation: "Peer-to-Peer (P2P) transfers between bank accounts are strictly free under NPCI guidelines, regardless of the amount."
  },
  {
    id: 2,
    question: "If a merchant accepts a ₹1,500 payment via a standard UPI QR code from a customer's bank account, what is the MDR?",
    options: [
      "Zero (0%)",
      "1.1%",
      "0.5%",
      "₹15"
    ],
    correctIndex: 0,
    explanation: "Standard P2M (Person-to-Merchant) payments from a standard bank account carry ZERO MDR for the merchant."
  },
  {
    id: 3,
    question: "When does the 1.1% Interchange Fee typically apply?",
    options: [
      "On all transactions",
      "When the customer pays using a Prepaid Payment Instrument (PPI) or Wallet for an amount > ₹2,000",
      "When transferring money to a savings account",
      "On transactions below ₹1,000"
    ],
    correctIndex: 1,
    explanation: "The 1.1% fee is generally levied on PPI (Wallets, Cards) transactions exceeding ₹2,000."
  },
  {
    id: 4,
    question: "For certain categories (like Education or Utilities), there is a 'cap' on the MDR. What does this mean?",
    options: [
      "The merchant cannot accept payments above the cap",
      "The fee percentage increases after the cap",
      "The total fee charged cannot exceed a specific flat amount, regardless of how large the transaction is",
      "The customer must pay the fee"
    ],
    correctIndex: 2,
    explanation: "A cap is a maximum ceiling on the fee. Even if a transaction is ₹1,00,000, if the category cap is ₹300, the merchant will only pay a maximum of ₹300."
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleSelect = (index: number) => {
    if (showExplanation) return; // Prevent changing answer after submission
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;
    
    setShowExplanation(true);
    if (selectedAnswer === QUIZ_QUESTIONS[currentQuestion].correctIndex) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    return (
      <div className="container-narrow" style={{ padding: "60px 16px", minHeight: "80vh", textAlign: "center" }}>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="card-surface" 
          style={{ padding: 48, borderRadius: "var(--radius-lg)" }}
        >
          <Trophy size={64} style={{ color: "hsl(var(--primary))", margin: "0 auto 24px" }} />
          <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 16 }}>Quiz Complete!</h1>
          <p style={{ fontSize: 20, color: "hsl(var(--muted))", marginBottom: 32 }}>
            You scored {score} out of {QUIZ_QUESTIONS.length}
          </p>
          
          <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
            <button 
              onClick={resetQuiz}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: "var(--radius-sm)", background: "hsl(var(--muted-bg))", border: "1px solid hsl(var(--border))", color: "hsl(var(--foreground))", fontWeight: 600, cursor: "pointer" }}
            >
              <RotateCcw size={18} /> Try Again
            </button>
            <Link 
              href="/calculator"
              className="gradient-primary"
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 24px", borderRadius: "var(--radius-sm)", color: "white", textDecoration: "none", fontWeight: 600 }}
            >
              Go to Calculator <ArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  const question = QUIZ_QUESTIONS[currentQuestion];

  return (
    <div className="container-narrow" style={{ padding: "40px 16px", minHeight: "80vh" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
        <BrainCircuit size={28} color="hsl(var(--primary))" />
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700 }}>UPI MDR Mastery Quiz</h1>
          <p style={{ color: "hsl(var(--muted))", fontSize: 14 }}>Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}</p>
        </div>
      </div>

      <div className="card-surface" style={{ padding: 32, borderRadius: "var(--radius-lg)" }}>
        <h2 style={{ fontSize: 20, fontWeight: 600, marginBottom: 24, lineHeight: 1.4 }}>
          {question.question}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctIndex;
            
            let bg = "hsl(var(--surface))";
            let border = "1px solid hsl(var(--border))";
            let color = "hsl(var(--foreground))";

            if (showExplanation) {
              if (isCorrect) {
                bg = "hsl(var(--success-light))";
                border = "1px solid hsl(var(--success))";
                color = "hsl(var(--success))";
              } else if (isSelected && !isCorrect) {
                bg = "hsl(var(--destructive-light))";
                border = "1px solid hsl(var(--destructive))";
                color = "hsl(var(--destructive))";
              } else {
                bg = "hsl(var(--muted-bg))";
                color = "hsl(var(--muted))";
              }
            } else if (isSelected) {
              bg = "hsl(var(--primary-light))";
              border = "1px solid hsl(var(--primary))";
              color = "hsl(var(--primary))";
            }

            return (
              <button
                key={index}
                onClick={() => handleSelect(index)}
                disabled={showExplanation}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px 20px",
                  borderRadius: "var(--radius-md)",
                  background: bg,
                  border: border,
                  color: color,
                  fontSize: 16,
                  fontWeight: 500,
                  textAlign: "left",
                  cursor: showExplanation ? "default" : "pointer",
                  transition: "all 0.2s"
                }}
              >
                {option}
                {showExplanation && isCorrect && <CheckCircle2 size={20} />}
                {showExplanation && isSelected && !isCorrect && <XCircle size={20} />}
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              style={{ overflow: "hidden" }}
            >
              <div style={{ padding: 20, background: selectedAnswer === question.correctIndex ? "hsl(var(--success-light))" : "hsl(var(--warning-light))", borderRadius: "var(--radius-md)", marginBottom: 24 }}>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: selectedAnswer === question.correctIndex ? "hsl(var(--success))" : "hsl(var(--warning-dark))" }}>
                  {selectedAnswer === question.correctIndex ? "Correct!" : "Not quite!"}
                </h3>
                <p style={{ fontSize: 15, lineHeight: 1.5 }}>{question.explanation}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {!showExplanation ? (
            <button
              onClick={handleSubmit}
              disabled={selectedAnswer === null}
              className="gradient-primary"
              style={{
                padding: "12px 24px",
                borderRadius: "var(--radius-sm)",
                color: "white",
                fontWeight: 600,
                border: "none",
                cursor: selectedAnswer === null ? "not-allowed" : "pointer",
                opacity: selectedAnswer === null ? 0.5 : 1
              }}
            >
              Submit Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="gradient-primary"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "12px 24px",
                borderRadius: "var(--radius-sm)",
                color: "white",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
              }}
            >
              {currentQuestion < QUIZ_QUESTIONS.length - 1 ? "Next Question" : "See Results"} <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
