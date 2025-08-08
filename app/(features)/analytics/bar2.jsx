// src/components/GeoBarChart.jsx
"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

const DEFAULT_DATA = [
  { country: "Ethiopia", applicants: 900 },
  { country: "Kenya",    applicants: 150 },
  { country: "Ghana",    applicants: 100 },
  { country: "Nigeria",  applicants:  54 },
];

export default function Bar2({
  data = DEFAULT_DATA,
  width = "100%",
  height = 400,
  barColor = "#4f46e5",
  gradientId = "barGradient",
}) {
  return (
    <div style={{ padding: 24 }}>

      <ResponsiveContainer width={width} height={height}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={barColor} stopOpacity={0.8} />
              <stop offset="100%" stopColor={barColor} stopOpacity={0.1} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="country" />
          <YAxis />
          <Tooltip formatter={(value) => [value, "Applicants"]} />
          {/* Legend not needed for a single series */}
          
          <Bar
            dataKey="applicants"
            fill={`url(#${gradientId})`}
            label={{
              position: "top",
              formatter: (value) => value,
              style: { fill: "#000", fontSize: 14 },
            }}
          >
            {data.map((_, idx) => (
              <Cell key={idx} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
