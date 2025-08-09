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
import { Bar2Type } from "@/lib/types/analyticsType";

const DEFAULT_DATA = [
  { country: "Ethiopia", applicants: 900 },
  { country: "Kenya", applicants: 150 },
  { country: "Ghana", applicants: 100 },
  { country: "Nigeria", applicants: 54 },
];
const width = "100%";
const height = 400;
const barColor = "#4f46e5";
const gradientId = "barGradient";
export default function Bar2(props:Bar2Type ) {
    console.log(props)
  const countryDataArray = Object.entries(props.country_distribution).map(
  ([name, value]) => ({ country:name, applicants:value })
);
console.log(1,countryDataArray,DEFAULT_DATA)
  return (
    <div style={{ padding: 24 }}>
      <ResponsiveContainer width={width} height={height}>
        <BarChart
          data={countryDataArray}
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
            {countryDataArray.map((_, idx) => (
              <Cell key={idx} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
