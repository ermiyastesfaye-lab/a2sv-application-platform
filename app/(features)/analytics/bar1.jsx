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

const data = [
  { name: "Applied", amt: 1204 },
  { name: "Under Review", amt: 750 },
  { name: "Interview", amt: 250 },
  { name: "Accepted", amt: 82 },
];

export default function Bar1() {
  return (
    <div style={{ width: '100%', height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 30, bottom: 20, left: 50 }}
          
        >
          <XAxis type="number" />
          <YAxis type="category" dataKey="name" tickLine={false}/>
          <Tooltip />
          <Bar dataKey="amt" fill="#8884d8" label={{position:"center",fill:"white"}} radius={[0, 5, 5, 0]}/>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
