"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import clsx from "clsx";

type DataPoint = { label: string; revenue: number };

type Props = {
  datasets: {
    Daily: DataPoint[];
    Weekly: DataPoint[];
    Monthly: DataPoint[];
    Yearly: DataPoint[];
  };
};

const timeFrames = ["Daily", "Weekly", "Monthly", "Yearly"] as const;

const RevenueChart: React.FC<Props> = ({ datasets }) => {
  const [selected, setSelected] = useState<keyof typeof datasets>("Yearly");

  const data = datasets[selected];
  const totalRevenue = data.reduce((acc, curr) => acc + curr.revenue, 0);

  const getColor = () => {
    const thresholds: Record<typeof selected, number> = {
      Daily: 1000,
      Weekly: 10000,
      Monthly: 100000,
      Yearly: 10000,
    };
    return totalRevenue < thresholds[selected] ? "#ef4444" : "#10b981";
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-md">
      <div className="flex justify-between items-start mb-6">
        <div>
          <p className="text-sm text-gray-500 font-semibold">
            Total Revenue Generated
          </p>
          <p className="text-3xl font-bold text-black">
            Rs. {totalRevenue.toLocaleString("en-IN")}
          </p>
        </div>
        <div className="flex bg-gray-100 rounded-full p-1">
          {timeFrames.map((frame) => (
            <button
              key={frame}
              onClick={() => setSelected(frame)}
              className={clsx(
                "px-4 py-1 text-sm rounded-full transition",
                selected === frame
                  ? "bg-black text-white"
                  : "text-gray-700 hover:bg-gray-200"
              )}
            >
              {frame}
            </button>
          ))}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={getColor()} stopOpacity={0.4} />
              <stop offset="95%" stopColor={getColor()} stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <XAxis dataKey="label" />
          <YAxis />
          <Tooltip formatter={(val: any) => `Rs. ${val}`} />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke={getColor()}
            fill="url(#colorRevenue)"
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
