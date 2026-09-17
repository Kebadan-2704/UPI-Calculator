import { Database, FileText, Activity } from "lucide-react";
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24 }}>Platform Overview</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 40 }}>
        {/* Stats Cards */}
        <div className="card-surface" style={{ padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: "var(--radius-sm)", background: "hsl(var(--primary-light))", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Database size={20} style={{ color: "hsl(var(--primary))" }} />
            </div>
            <div>
              <h2 style={{ fontSize: 14, fontWeight: 600, color: "hsl(var(--muted))" }}>Active Rulesets</h2>
              <div style={{ fontSize: 24, fontWeight: 800 }}>1</div>
            </div>
          </div>
          <Link href="/admin/rules" style={{ fontSize: 13, color: "hsl(var(--primary))", textDecoration: "none", fontWeight: 600 }}>Manage rulesets →</Link>
        </div>

        <div className="card-surface" style={{ padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: "var(--radius-sm)", background: "hsl(var(--success-light))", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <FileText size={20} style={{ color: "hsl(var(--success))" }} />
            </div>
            <div>
              <h2 style={{ fontSize: 14, fontWeight: 600, color: "hsl(var(--muted))" }}>Verified Sources</h2>
              <div style={{ fontSize: 24, fontWeight: 800 }}>5</div>
            </div>
          </div>
          <Link href="/admin/sources" style={{ fontSize: 13, color: "hsl(var(--primary))", textDecoration: "none", fontWeight: 600 }}>Manage sources →</Link>
        </div>

        <div className="card-surface" style={{ padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: "var(--radius-sm)", background: "hsl(var(--warning-light))", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Activity size={20} style={{ color: "hsl(var(--warning))" }} />
            </div>
            <div>
              <h2 style={{ fontSize: 14, fontWeight: 600, color: "hsl(var(--muted))" }}>Calculations Today</h2>
              <div style={{ fontSize: 24, fontWeight: 800 }}>1,204</div>
            </div>
          </div>
          <span style={{ fontSize: 13, color: "hsl(var(--muted))" }}>Anonymous aggregate data</span>
        </div>
      </div>

      <div className="card-surface" style={{ padding: 32 }}>
        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16 }}>System Status</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 12, borderBottom: "1px solid hsl(var(--border))" }}>
            <span style={{ fontSize: 14, fontWeight: 500 }}>Database Connection</span>
            <span style={{ fontSize: 12, fontWeight: 600, padding: "2px 8px", borderRadius: "var(--radius-full)", background: "hsl(var(--success-light))", color: "hsl(var(--success))" }}>Connected</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", paddingBottom: 12, borderBottom: "1px solid hsl(var(--border))" }}>
            <span style={{ fontSize: 14, fontWeight: 500 }}>Active Ruleset Version</span>
            <span style={{ fontSize: 14, fontWeight: 600, fontFamily: "monospace" }}>v1.0.0 (rs-2026-10-15)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
