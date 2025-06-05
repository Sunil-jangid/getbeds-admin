"use client";

import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ChevronDown } from "lucide-react";

const pieData = [
  { name: "Payments Done", value: 63, color: "#000" },
  { name: "Payments Pending", value: 25, color: "#A3D3F3" },
];

const donutData = [
  { name: "Delhi", value: 412870 },
  { name: "Mumbai", value: 549080 },
  { name: "Bangalore", value: 748080 },
  { name: "Kolkata", value: 958900 },
];

const lineChartDataSpending = [
  { month: "JAN", amount: 1200 },
  { month: "FEB", amount: 1900 },
  { month: "APR", amount: 4890 },
  { month: "JUN", amount: 2100 },
  { month: "AUG", amount: 3400 },
  { month: "OCT", amount: 3700 },
  { month: "DEC", amount: 4500 },
];

const lineChartDataArrival = [
  { month: "JAN", amount: 1800 },
  { month: "FEB", amount: 1600 },
  { month: "APR", amount: 3200 },
  { month: "JUN", amount: 2100 },
  { month: "AUG", amount: 4100 },
  { month: "OCT", amount: 3700 },
  { month: "DEC", amount: 3590 },
];

const weeklyPayments = [
  { day: "17", blue: 200, cyan: 150, lightBlue: 100 },
  { day: "18", blue: 180, cyan: 130, lightBlue: 120 },
  { day: "19", blue: 210, cyan: 140, lightBlue: 90 },
  { day: "20", blue: 160, cyan: 120, lightBlue: 130 },
  { day: "21", blue: 170, cyan: 110, lightBlue: 100 },
  { day: "22", blue: 200, cyan: 140, lightBlue: 110 },
  { day: "23", blue: 190, cyan: 130, lightBlue: 100 },
  { day: "24", blue: 170, cyan: 120, lightBlue: 130 },
  { day: "25", blue: 160, cyan: 110, lightBlue: 120 },
];

const recentActivities = [
  { name: "Lorem Ipsum", amount: "+ Rs.1,456", date: "25 April at 09:30 pm" },
  { name: "Lorem Ipsum", amount: "+ Rs. 560", date: "25 April at 6:40 pm" },
  { name: "Lorem Ipsum", amount: "-Rs. 2,890", date: "25 April at 1:00 pm" },
  { name: "Lorem Ipsum", amount: "-Rs. 4,589", date: "25 April at 10:15 am" },
  { name: "Lorem Ipsum", amount: "+ Rs. 567", date: "25 April at 09:30 am" },
  { name: "Lorem Ipsum", amount: "+Rs. 1,789", date: "25 April at 03:50 pm" },
];

const COLORS = ["#A3D3F3", "#FFD700", "#3BE13B", "#38C6D2"];

export default function AnalyticsDashboard() {
  const [selectedStat, setSelectedStat] = useState<"Spending" | "Arrival">(
    "Spending"
  );
  const total = donutData.reduce((sum, d) => sum + d.value, 0);
  const [selectedRange, setSelectedRange] = useState("Monthly");

  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 max-w-full">
      {/* 1. Payment Summary */}
      <div className="bg-white rounded-2xl p-4 shadow flex flex-col md:flex-row items-center md:items-start col-span-1 max-w-[450px]">
        <div className="w-40 h-40 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={donutData}
                dataKey="value"
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
              >
                {donutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-xl font-bold text-gray-800">
              ₹{(total / 1_000_000).toFixed(1)}M
            </p>
            <p className="text-xs text-gray-400">Total</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 ml-0 md:ml-6 mt-4 md:mt-0 text-sm">
          {donutData.map((item, idx) => (
            <div key={idx} className="flex items-start space-x-2">
              <span
                className="w-3 h-3 rounded-full mt-1"
                style={{ backgroundColor: COLORS[idx] }}
              />
              <div>
                <p className="text-sm text-gray-600">{item.name}</p>
                <p className="text-sm font-semibold text-gray-800">
                  ₹{item.value.toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Statistics */}
      <div className="bg-white rounded-2xl p-3 shadow col-span-1 max-w-[450px]">
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-md font-semibold">Statistics</h2>
          <div className="text-xs text-gray-500 space-x-3">
            {["Spending", "Arrival"].map((stat) => (
              <button
                key={stat}
                onClick={() => setSelectedStat(stat as "Spending" | "Arrival")}
                className={`font-semibold ${
                  selectedStat === stat ? "text-black" : ""
                }`}
              >
                {stat}
              </button>
            ))}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={150}>
          <LineChart
            data={
              selectedStat === "Spending"
                ? lineChartDataSpending
                : lineChartDataArrival
            }
          >
            <XAxis dataKey="month" />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#3B82F6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 3. Recent Activities */}
      <div className="bg-white rounded-2xl p-3 shadow col-span-1 row-span-2 max-w-[450px]">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-md font-semibold">Recent Activities</h2>
          <span className="text-xs text-blue-500 cursor-pointer">See all</span>
        </div>
        <div className="space-y-2 text-sm">
          {recentActivities.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100" />
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gray-400">{item.date}</p>
                </div>
              </div>
              <span className="text-sm font-semibold">{item.amount}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Weekly Payments */}
      <div className="bg-white rounded-2xl p-3 shadow col-span-1 max-w-[450px]">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-md font-semibold">Weekly Payments</h2>
          <div className="flex items-center gap-1 text-xs text-gray-400 px-2 py-1 bg-gray-100 rounded">
            <span>This Week</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={weeklyPayments} barSize={14}>
            <XAxis dataKey="day" axisLine={false} tickLine={false} />
            <Tooltip />
            <Bar dataKey="lightBlue" stackId="a" fill="#3C82F6" radius={[2, 2, 0, 0]} />
            <Bar dataKey="cyan" stackId="a" fill="#38C6D2" radius={[2, 2, 0, 0]} />
            <Bar dataKey="blue" stackId="a" fill="#A3D3F3" radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 5. Payment Analysis */}
      <div className="bg-white rounded-2xl p-3 shadow col-span-1 max-w-[450px]">
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-md font-semibold">Payment Analysis</h2>
          <div className="relative inline-block text-left">
            <button className="inline-flex justify-center w-full text-xs font-medium text-gray-700 hover:text-gray-900">
              {selectedRange}
              <ChevronDown className="ml-1 w-3 h-3" />
            </button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={70}
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 bg-gray-50 p-1 rounded-md mt-2 w-4/5 text-xs">
            <div className="text-center">
              <p className="text-lg font-semibold">63%</p>
              <p className="text-xs text-gray-500">Payments Done</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold">37%</p>
              <p className="text-xs text-gray-500">Payments Pending</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
