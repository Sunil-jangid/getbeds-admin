"use client";

import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Lock } from "lucide-react"; // ✅ Added

interface CardItem {
  id: string;
  title: string;
  revenue: number;
  growth: number;
  chartData: number[];
  link: string;
  locked?: boolean; // ✅ Optional locked flag
}

interface SummaryCardProps {
  item: CardItem;
  className?: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ item, className = "" }) => {
  const [timeframe, setTimeframe] = useState("Monthly");

  const timeframes = ["Daily", "Weekly", "Monthly", "Yearly"];

  const generateChartData = (data: number[], type: string) => {
    switch (type) {
      case "Daily":
        return data.slice(0, 30).map((v, i) => ({ name: `Day ${i + 1}`, value: v }));
      case "Weekly":
        return Array.from({ length: 12 }, (_, i) =>
          data.slice(i * 7, i * 7 + 7).reduce((sum, val) => sum + val, 0)
        ).map((v, i) => ({ name: `W${i + 1}`, value: v }));
      case "Monthly":
        return Array.from({ length: 12 }, (_, i) =>
          data.slice(i * 30, i * 30 + 30).reduce((sum, val) => sum + val, 0)
        ).map((v, i) => ({
          name: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][i],
          value: v,
        }));
      case "Yearly":
        return [{ name: "2024", value: data.reduce((sum, val) => sum + val, 0) }];
      default:
        return [];
    }
  };

  const chartData = useMemo(() => generateChartData(item.chartData, timeframe), [item, timeframe]);
  const totalRevenue = chartData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className={`relative bg-white rounded-2xl shadow-xl p-4 flex flex-col justify-between ${className}`}>
      {/* 🔒 Locked Overlay */}
      {item.locked && (
  <div className="absolute inset-0 backdrop-blur-sm bg-black/10 z-10 flex flex-col items-center justify-center rounded-2xl">
    <Lock className="w-8 h-8 text-gray-700 mb-2" />
    <p className="text-gray-800 font-medium text-sm">Work in Progress</p>
  </div>
)}


      {/* Content */}
     <div className={`bg-white rounded-2xl flex flex-col justify-between ${className}`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-2">
        <div>
          <h2 className="text-base font-semibold text-gray-600">{item.title}</h2>
          <h1 className="text-2xl font-bold text-gray-900">Rs. {totalRevenue.toLocaleString()}</h1>
          <p className="text-xs text-blue-500 mt-1">Revenue generated</p>
        </div>

        <select
  value={timeframe}
  onChange={(e) => setTimeframe(e.target.value)}
  className="bg-white border border-gray-300 rounded text-xs px-4 py-1 text-gray-700 shadow-sm focus:outline-none duration-200"
>
  {timeframes.map((tf) => (
    <option key={tf} value={tf} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">
      {tf}
    </option>
  ))}
</select>

      </div>

      {/* Growth */}
      <div className="flex justify-end mb-1">
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${item.growth >= 0 ? "text-green-600 bg-green-100" : "text-red-600 bg-red-100"}`}>
          {item.growth >= 0 ? "+" : "-"}Rs. {Math.abs(item.growth).toLocaleString()}
        </span>
      </div>

      {/* Chart */}
      <div className="flex-1">
        <div className="h-[180px] mt-2 -ml-4 sm:ml-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <XAxis dataKey="name" axisLine={false} tickLine={false} fontSize={10} />
              <YAxis
                tickFormatter={(v) => `Rs. ${(v / 1000).toFixed(0)}K`}
                axisLine={false}
                tickLine={false}
                fontSize={10}
              />
              <Tooltip formatter={(val: any) => `Rs. ${val.toLocaleString()}`} />
              <Area
                type="monotone"
                dataKey="value"
                stroke={item.growth >= 0 ? "#4ade80" : "#f87171"}
                fill={item.growth >= 0 ? "#bbf7d0" : "#fecaca"}
                strokeWidth={2}
                dot={{ r: 2, stroke: item.growth >= 0 ? '#4ade80' : '#f87171', strokeWidth: 2, fill: 'white' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Button */}
      <div className="flex justify-center mt-[-30px]">
        <Link href={item.link}>
  <button className="w-36 bg-black text-white py-2 rounded-full text-sm font-semibold hover:bg-gray-800 transition">
    Details
  </button>
  </Link>
</div>

    </div>
    </div>
  );
};

export default SummaryCard;
