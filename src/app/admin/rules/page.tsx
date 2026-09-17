import { Plus, Edit2, Archive, CheckCircle2 } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function AdminRulesPage() {
  // Mock data for V2 prototype (Database integration pending CLI fix)
  const rulesets = [
    {
      id: "rs-2026-10-15",
      version: "1.0.0",
      effectiveFrom: new Date("2026-10-15T00:00:00.000Z"),
      status: "active",
      _count: { rules: 3, sources: 5 }
    },
    {
      id: "rs-draft-next",
      version: "1.1.0",
      effectiveFrom: new Date("2027-01-01T00:00:00.000Z"),
      status: "draft",
      _count: { rules: 4, sources: 2 }
    }
  ];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>Ruleset Management</h1>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "10px 16px",
            borderRadius: "var(--radius-sm)",
            background: "hsl(var(--primary))",
            color: "white",
            border: "none",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          <Plus size={16} /> New Ruleset
        </button>
      </div>

      <div className="card-surface" style={{ overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ borderBottom: "1px solid hsl(var(--border))", background: "hsl(var(--muted-bg))" }}>
              <th style={{ padding: "16px 24px", textAlign: "left", fontWeight: 600, color: "hsl(var(--muted))" }}>Version ID</th>
              <th style={{ padding: "16px 24px", textAlign: "left", fontWeight: 600, color: "hsl(var(--muted))" }}>Effective Date</th>
              <th style={{ padding: "16px 24px", textAlign: "left", fontWeight: 600, color: "hsl(var(--muted))" }}>Status</th>
              <th style={{ padding: "16px 24px", textAlign: "left", fontWeight: 600, color: "hsl(var(--muted))" }}>Rules</th>
              <th style={{ padding: "16px 24px", textAlign: "right", fontWeight: 600, color: "hsl(var(--muted))" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {rulesets.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: 40, textAlign: "center", color: "hsl(var(--muted))" }}>
                  No rulesets found. Database might not be seeded.
                </td>
              </tr>
            )}
            {rulesets.map((rs) => (
              <tr key={rs.id} style={{ borderBottom: "1px solid hsl(var(--border))" }}>
                <td style={{ padding: "16px 24px", fontWeight: 600 }}>v{rs.version}</td>
                <td style={{ padding: "16px 24px" }}>
                  {rs.effectiveFrom.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </td>
                <td style={{ padding: "16px 24px" }}>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      padding: "4px 10px",
                      borderRadius: "var(--radius-full)",
                      fontSize: 12,
                      fontWeight: 600,
                      background: rs.status === "active" ? "hsl(var(--success-light))" : "hsl(var(--muted-bg))",
                      color: rs.status === "active" ? "hsl(var(--success))" : "hsl(var(--muted))",
                      textTransform: "capitalize",
                    }}
                  >
                    {rs.status === "active" && <CheckCircle2 size={14} />}
                    {rs.status}
                  </span>
                </td>
                <td style={{ padding: "16px 24px" }}>{rs._count.rules} rules</td>
                <td style={{ padding: "16px 24px", textAlign: "right" }}>
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                    <button style={{ padding: 8, background: "none", border: "none", cursor: "pointer", color: "hsl(var(--muted))" }}>
                      <Edit2 size={16} />
                    </button>
                    <button style={{ padding: 8, background: "none", border: "none", cursor: "pointer", color: "hsl(var(--muted))" }}>
                      <Archive size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
