"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import {
  Calculator,
  BookOpen,
  FileText,
  HelpCircle,
  Menu,
  X,
  Sun,
  Moon,
  Monitor,
  ChevronDown,
  Store,
} from "lucide-react";

import { useLanguage } from "@/lib/i18n/LanguageContext";

export function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  
  const NAV_ITEMS = [
    {
      label: "Calculator",
      href: "/calculator",
      icon: Calculator,
    },
    {
      label: t("navTools"),
      href: "#",
      icon: Store,
      children: [
        { label: "Payment Breakdown", href: "/payment-breakdown" },
        { label: "Threshold Calculator", href: "/threshold" },
        { label: "Cap Calculator", href: "/cap" },
        { label: "Merchant Estimate", href: "/merchant" },
        { label: "Monthly Estimate", href: "/monthly" },
        { label: t("navBulk"), href: "/bulk" },
      ],
    },
    {
      label: t("navChecker"),
      href: "/checker",
      icon: FileText,
    },
    {
      label: t("navDocs"),
      href: "/developers",
      icon: FileText,
    },
    { label: "Learn", href: "/learn/what-is-upi-mdr", icon: BookOpen },
    { label: "FAQ", href: "/faq", icon: HelpCircle },
  ];
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);

  const themeIcon =
    theme === "system" ? Monitor : resolvedTheme === "dark" ? Moon : Sun;
  const ThemeIcon = themeIcon;

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        backgroundColor: "hsl(var(--surface) / 0.85)",
        borderBottom: "1px solid hsl(var(--border))",
      }}
    >
      <div className="container-wide">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: 64,
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
              color: "hsl(var(--foreground))",
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "var(--radius-sm)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
                fontWeight: 800,
                color: "hsl(var(--background))",
                background: "hsl(var(--foreground))"
              }}
            >
              ₹
            </div>
            <div>
              <span
                style={{
                  fontWeight: 700,
                  fontSize: 17,
                  letterSpacing: "-0.02em",
                }}
              >
                UPI Cost
              </span>
              <span
                style={{
                  fontWeight: 400,
                  fontSize: 17,
                  color: "hsl(var(--muted))",
                  marginLeft: 4,
                }}
              >
                Calculator
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
            className="hidden-mobile"
          >
            {NAV_ITEMS.map((item) =>
              item.children ? (
                <div
                  key={item.label}
                  style={{ position: "relative" }}
                  onMouseEnter={() => setDropdownOpen(item.label)}
                  onMouseLeave={() => setDropdownOpen(null)}
                  onFocus={() => setDropdownOpen(item.label)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) {
                      setDropdownOpen(null);
                    }
                  }}
                >
                  <button
                    aria-haspopup="true"
                    aria-expanded={dropdownOpen === item.label}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "8px 14px",
                      borderRadius: "var(--radius-sm)",
                      border: "none",
                      background: "none",
                      color: "hsl(var(--foreground))",
                      fontSize: 14,
                      fontWeight: 500,
                      cursor: "pointer",
                      transition: "background 0.15s",
                      fontFamily: "inherit",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "hsl(var(--muted-bg))")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "none")
                    }
                  >
                    {item.label}
                    <ChevronDown size={14} />
                  </button>
                  {dropdownOpen === item.label && (
                    <div
                      style={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        minWidth: 200,
                        padding: 6,
                        borderRadius: "var(--radius-md)",
                        backgroundColor: "hsl(var(--surface))",
                        border: "1px solid hsl(var(--border))",
                        boxShadow: "var(--shadow-lg)",
                        zIndex: 100,
                      }}
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          style={{
                            display: "block",
                            padding: "10px 14px",
                            borderRadius: "var(--radius-sm)",
                            textDecoration: "none",
                            color: "hsl(var(--foreground))",
                            fontSize: 14,
                            transition: "background 0.15s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background =
                              "hsl(var(--muted-bg))")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "transparent")
                          }
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "8px 14px",
                    borderRadius: "var(--radius-sm)",
                    textDecoration: "none",
                    color: "hsl(var(--foreground))",
                    fontSize: 14,
                    fontWeight: 500,
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "hsl(var(--muted-bg))")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  {item.label}
                </Link>
              )
            )}

            {/* Theme Toggle */}
            <button
              onClick={cycleTheme}
              aria-label={`Switch theme (current: ${theme})`}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 38,
                height: 38,
                borderRadius: "var(--radius-sm)",
                border: "1px solid hsl(var(--border))",
                background: "hsl(var(--surface))",
                color: "hsl(var(--foreground))",
                cursor: "pointer",
                transition: "all 0.15s",
                marginLeft: 8,
              }}
            >
              <ThemeIcon size={18} />
            </button>

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              aria-label="Toggle language"
              title={language === "en" ? "Switch to Hindi" : "Switch to English"}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 38,
                height: 38,
                borderRadius: "var(--radius-sm)",
                border: "1px solid hsl(var(--border))",
                background: "hsl(var(--surface))",
                color: "hsl(var(--foreground))",
                cursor: "pointer",
                transition: "all 0.15s",
                marginLeft: 8,
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              {language === "en" ? "A/अ" : "अ/A"}
            </button>

            {/* CTA */}
            <Link
              href="/calculator"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "8px 16px",
                borderRadius: "var(--radius-sm)",
                textDecoration: "none",
                color: "hsl(var(--background))",
                background: "hsl(var(--foreground))",
                fontSize: 13,
                fontWeight: 600,
                marginLeft: 8,
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              <Calculator size={14} />
              Calculate
            </Link>
          </nav>

          {/* Mobile: theme + hamburger */}
          <div className="show-mobile" style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button
              onClick={cycleTheme}
              aria-label="Toggle theme"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 38,
                height: 38,
                borderRadius: "var(--radius-sm)",
                border: "1px solid hsl(var(--border))",
                background: "hsl(var(--surface))",
                color: "hsl(var(--foreground))",
                cursor: "pointer",
              }}
            >
              <ThemeIcon size={18} />
            </button>
            <button
              onClick={() => setLanguage(language === "en" ? "hi" : "en")}
              aria-label="Toggle language"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 38,
                height: 38,
                borderRadius: "var(--radius-sm)",
                border: "1px solid hsl(var(--border))",
                background: "hsl(var(--surface))",
                color: "hsl(var(--foreground))",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 16,
              }}
            >
              {language === "en" ? "A/अ" : "अ/A"}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 38,
                height: 38,
                borderRadius: "var(--radius-sm)",
                border: "1px solid hsl(var(--border))",
                background: "hsl(var(--surface))",
                color: "hsl(var(--foreground))",
                cursor: "pointer",
              }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="show-mobile"
          style={{
            padding: "8px 16px 16px",
            borderTop: "1px solid hsl(var(--border))",
            backgroundColor: "hsl(var(--surface))",
          }}
        >
          {NAV_ITEMS.map((item) => (
            <React.Fragment key={item.label}>
              {item.children ? (
                <>
                  <div
                    style={{
                      padding: "12px 14px 6px",
                      fontSize: 12,
                      fontWeight: 600,
                      textTransform: "uppercase",
                      color: "hsl(var(--muted))",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {item.label}
                  </div>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        display: "block",
                        padding: "10px 14px 10px 28px",
                        borderRadius: "var(--radius-sm)",
                        textDecoration: "none",
                        color: "hsl(var(--foreground))",
                        fontSize: 15,
                      }}
                    >
                      {child.label}
                    </Link>
                  ))}
                </>
              ) : (
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "12px 14px",
                    borderRadius: "var(--radius-sm)",
                    textDecoration: "none",
                    color: "hsl(var(--foreground))",
                    fontSize: 15,
                    fontWeight: 500,
                  }}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          ))}
          <Link
            href="/calculator"
            onClick={() => setMobileOpen(false)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "10px 20px",
              borderRadius: "var(--radius-sm)",
              textDecoration: "none",
              color: "hsl(var(--background))",
              background: "hsl(var(--foreground))",
              fontSize: 14,
              fontWeight: 600,
              marginTop: 8,
            }}
          >
            <Calculator size={16} />
            Calculate Now
          </Link>
        </div>
      )}

      <style jsx global>{`
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
        }
      `}</style>
    </header>
  );
}
