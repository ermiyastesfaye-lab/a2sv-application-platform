// src/components/DonutChart.jsx
"use client";

import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from "recharts";

const DEFAULT_COLORS = ["#4f46e5", "#6366f1", "#a5b4fc"];

export default function DonutChart({
  data = [
    { name: "AAU", value: 47.62 },
    { name: "ASTU", value: 28.57 },
    { name: "AASTU", value: 23.81 },
  ],
  colors = DEFAULT_COLORS,
  innerRadius = "60%",
  outerRadius = "80%",
  width = "100%",
  height = 700,
}) {
  return (
    <ResponsiveContainer width={width} height={height}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          label={({ percent }) => `${percent*100}%`}
          labelLine={false}
        >
          {data.map((_, idx) => (
            <Cell key={idx} fill={colors[idx % colors.length]} />
          ))}
        </Pie>

        <Tooltip
          formatter={(val) => `${val}%`}
          wrapperStyle={{ fontSize: 14 }}
        />

        <Legend verticalAlign="bottom" height={100} iconType="circle" />
      </PieChart>
    </ResponsiveContainer>
  );
}
