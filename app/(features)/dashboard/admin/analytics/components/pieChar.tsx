import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  PieLabelRenderProps,
} from "recharts";
import { DonutChartType } from "@/lib/types/analyticsType";

const BASE_COLOR = "#4f46e5"; 
const innerRadius = 120;
const outerRadius = 170;
const width = "100%";
const height = 550;

const renderCustomLabel = (props: PieLabelRenderProps) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
  if (
    cx === undefined ||
    cy === undefined ||
    midAngle === undefined ||
    innerRadius === undefined ||
    outerRadius === undefined ||
    percent === undefined
  ) {
    return null;
  }
  const radius =
    ((Number(innerRadius) || 0) + (Number(outerRadius) || 0)) / 2;
  const radian = Math.PI / 180;
  const x = Number(cx) + radius * Math.cos(-midAngle * radian);
  const y = Number(cy) + radius * Math.sin(-midAngle * radian);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={16}
    >
      {`${(percent * 100).toFixed(2)}%`}
    </text>
  );
};

export default function DonutChart(props: DonutChartType) {
  const data = Object.entries(props.school_distribution).map(([name, value]) => ({
    name,
    value,
  }));

  const total = data.reduce((sum, d) => sum + d.value, 0);

  const r = parseInt(BASE_COLOR.slice(1, 3), 16);
  const g = parseInt(BASE_COLOR.slice(3, 5), 16);
  const b = parseInt(BASE_COLOR.slice(5, 7), 16);

  return (
    <ResponsiveContainer width={width} height={height}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          label={renderCustomLabel}
          labelLine={false}
          paddingAngle={1}
        >
          {data.map((entry, idx) => {
            const percent = entry.value / total;
            const opacity = 0.3 + percent * 0.7; 
            return (
              <Cell
                key={idx}
                fill={`rgba(${r}, ${g}, ${b}, ${opacity})`}
              />
            );
          })}
        </Pie>

        <Tooltip
          formatter={(val: number) => `${val}%`}
          wrapperStyle={{ fontSize: 14 }}
        />
        <Legend verticalAlign="bottom" height={100} iconType="circle" />
      </PieChart>
    </ResponsiveContainer>
  );
}
