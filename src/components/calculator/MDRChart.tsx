"use client";

import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { formatINR } from "@/lib/formatting/currency";

type MDRChartProps = {
  netAmount: number;
  mdrAmount: number;
  isDark: boolean;
};

export function MDRChart({ netAmount, mdrAmount, isDark }: MDRChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  if (mdrAmount === 0) {
    return (
      <div style={{ padding: 16, textAlign: "center", color: "hsl(var(--muted))", fontSize: 13 }}>
        No MDR applied. Chart visualization hidden.
      </div>
    );
  }

  const data = [
    { name: "Net Received", value: netAmount, color: "hsl(var(--success))" },
    { name: "MDR Fee", value: mdrAmount, color: "hsl(var(--primary))" },
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div
          style={{
            background: isDark ? "#1E293B" : "#FFFFFF",
            border: `1px solid ${isDark ? "#334155" : "#E2E8F0"}`,
            padding: "8px 12px",
            borderRadius: "var(--radius-sm)",
            boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
          }}
        >
          <p style={{ margin: 0, fontSize: 13, fontWeight: 600, color: payload[0].payload.color }}>
            {payload[0].name}: {formatINR(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ height: 200, width: "100%", marginTop: 16 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            animationDuration={800}
            animationEasing="ease-out"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
