"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Bar1Type } from '@/lib/types/analyticsType';

export default function Bar1(props: Bar1Type) {
  const { acceptance_rate, application_funnel } = props;


  const chartData = [
    { name: "Submitted", amt: application_funnel.submitted },
    { name: "Pending Review", amt: application_funnel.pending_review },
    { name: "In Progress", amt: application_funnel.in_progress },
    { name: "Accepted", amt: Math.round((acceptance_rate * application_funnel.submitted) / 100)
},
  ];

  return (
    <div style={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 20, right: 30, bottom: 20, left: 50 }}
        >
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" tickLine={false} />
          <Tooltip />
          <Bar
            dataKey="amt"
            fill="#8884d8"
            label={{ position: "center", fill: "white" }}
            radius={[0, 5, 5, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
