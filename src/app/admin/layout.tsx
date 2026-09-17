"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Database, FileText, BarChart3, Settings } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Rulesets", href: "/admin/rules", icon: Database },
    { label: "Sources", href: "/admin/sources", icon: FileText },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
    { label: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "hsl(var(--background))" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 260,
          borderRight: "1px solid hsl(var(--border))",
          background: "hsl(var(--surface))",
          padding: "24px 16px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ marginBottom: 32, padding: "0 12px" }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, letterSpacing: "-0.02em" }}>UPI Cost Platform</h2>
          <p style={{ fontSize: 12, color: "hsl(var(--muted))" }}>Admin Dashboard</p>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "10px 12px",
                  borderRadius: "var(--radius-sm)",
                  color: isActive ? "hsl(var(--primary))" : "hsl(var(--foreground))",
                  background: isActive ? "hsl(var(--primary) / 0.1)" : "transparent",
                  textDecoration: "none",
                  fontSize: 14,
                  fontWeight: isActive ? 600 : 500,
                  transition: "background 0.2s",
                }}
              >
                <item.icon size={18} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, overflowY: "auto" }}>
        <header
          style={{
            height: 64,
            borderBottom: "1px solid hsl(var(--border))",
            background: "hsl(var(--surface))",
            display: "flex",
            alignItems: "center",
            padding: "0 32px",
            position: "sticky",
            top: 0,
            zIndex: 10,
          }}
        >
          <div style={{ fontSize: 14, fontWeight: 600, color: "hsl(var(--muted))" }}>
            Admin / {pathname.split("/").filter(Boolean).pop() || "dashboard"}
          </div>
        </header>
        <div style={{ padding: "32px" }}>
          {children}
        </div>
      </main>
    </div>
  );
}
