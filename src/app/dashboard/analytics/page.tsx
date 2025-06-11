"use client";

import React, { useState, useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ComposedChart,
  Area,
} from "recharts";


type ViewType1 = "Week" | "Month" | "Year" | "All";

const activityData = [
  {
    user: "Bender project",
    names: ["Johnson", "Johnson", "Johnson"],
    progress: 53,
    status: "Inprogress",
    date: "06 Jan 2024",
  },
  {
    user: "Batman",
    names: ["William", "William", "William"],
    progress: 24,
    status: "Pending",
    date: "06 Jan 2024",
  },
  {
    user: "Candy",
    names: ["Paul", "Paul", "Paul"],
    progress: 86,
    status: "Completed",
    date: "30 Jan 2024",
  },
  {
    user: "Throwing",
    names: ["Ellisebeth", "Ellisebeth", "Ellisebeth"],
    progress: 51,
    status: "Inprogress",
    date: "11 Jan 2024",
  },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-700";
    case "Pending":
      return "bg-red-100 text-red-600";
    case "Inprogress":
      return "bg-black text-white";
    default:
      return "";
  }
};

const dataMap: Record<ViewType1, any[]> = {
  Week: [
    { name: "Mon", bar: 80, line: 80 },
    { name: "Tue", bar: 50, line: 50 },
    { name: "Wed", bar: 70, line: 70 },
    { name: "Thu", bar: 60, line: 60 },
    { name: "Fri", bar: 90, line: 90 },
    { name: "Sat", bar: 40, line: 40 },
    { name: "Sun", bar: 30, line: 30 },
  ],
  Month: [
    { name: "Jan", bar: 100, line: 100 },
    { name: "Feb", bar: 95, line: 95 },
    { name: "Mar", bar: 50, line: 50 },
    { name: "Apr", bar: 30, line: 30 },
    { name: "May", bar: 60, line: 60 },
    { name: "Jun", bar: 80, line: 80 },
    { name: "Jul", bar: 40, line: 40 },
    { name: "Aug", bar: 90, line: 90 },
    { name: "Sep", bar: 60, line: 60 },
    { name: "Oct", bar: 40, line: 40 },
    { name: "Nov", bar: 70, line: 70 },
    { name: "Dec", bar: 80, line: 80 },
  ],
  Year: [
    { name: "2020", bar: 50, line: 50 },
    { name: "2021", bar: 70, line: 70 },
    { name: "2022", bar: 70, line: 70 },
    { name: "2023", bar: 90, line: 90 },
    { name: "2024", bar: 75, line: 75 },
  ],
  All: [
    { name: "Phase 1", bar: 60, line: 60 },
    { name: "Phase 2", bar: 90, line: 90 },
    { name: "Phase 3", bar: 50, line: 50 },
    { name: "Phase 4", bar: 100, line: 100 },
  ],
};

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-states.json";

const categoryColors: Record<string, string> = {
  Mass: "#8ED1FC",
  Large: "#FFB347",
  Medium: "#FCD34D",
  Small: "#E5E7EB",
};

const stateData = [
  { id: "Uttar Pradesh", category: "Large", value: 4.9 },
  { id: "Rajasthan", category: "Mass", value: 15.7 },
  { id: "Bihar", category: "Mass", value: 15.7 },
  { id: "Madhya Pradesh", category: "Medium", value: 2.4 },
  { id: "Chhattisgarh", category: "Small", value: 0.98 },
];

const totalCustomers = 19.8;

type ViewType = "Monthly" | "Daily" | "Yearly";

const donutData = [
  { name: "Lorem Ipsum", value: 50, color: "#000000" },
  { name: "Lorem Ipsum", value: 80, color: "#FFD700" },
  { name: "Lorem Ipsum", value: 60, color: "#7ED957" },
  { name: "Lorem Ipsum", value: 40, color: "#8ED1FC" },
];

const ChartSection: React.FC = () => {
  const [view, setView] = useState<ViewType>("Monthly");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const labels = useMemo(() => {
    switch (view) {
      case "Monthly":
        return [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
      case "Daily":
        return Array.from({ length: 31 }, (_, i) => (i + 1).toString());
      case "Yearly":
        return Array.from({ length: 8 }, (_, i) => (2020 + i).toString());
      default:
        return [];
    }
  }, [view]);

  const data = useMemo(() => {
    return labels.map(() => Math.floor(Math.random() * 200) + 10);
  }, [labels]);

  const donutTotal = donutData.reduce((acc, cur) => acc + cur.value, 0);
  const [view1, setView1] = useState<ViewType1>("Week");
  const data1 = dataMap[view1];
  return (
    <div className="min-h-screen justify-center px-10">
    <div className="flex gap-4 w-full py-6 h-[400px]">
      {/* Bar Chart Section */}
      <div className="bg-white rounded-2xl shadow p-6 w-2/7 h-full flex flex-col max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Lorem Ipsum</h2>
          <select
            value={view}
            onChange={(e) => setView(e.target.value as ViewType)}
            className="border rounded-full px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 cursor-pointer"
          >
            <option value="Monthly">Monthly</option>
            <option value="Daily">Daily</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>
        <div className="flex items-end justify-center gap-2 overflow-x-auto scrollbar-hide flex-grow">
          {labels.map((label, i) => (
            <div
              key={label}
              className="flex flex-col items-center group"
              onMouseEnter={() => setHoverIndex(i)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <div
                className={`w-4 rounded-t-lg transition-all duration-300 ${
                  hoverIndex === i ? "bg-blue-400" : "bg-black"
                }`}
                style={{ height: `${data[i]}px` }}
              ></div>
              <span className="text-xs mt-2">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Donut Chart Section */}
      <div className="bg-white rounded-2xl shadow p-6 w-1/3 h-full flex">
        <div className="relative w-1/2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Lorem Ipsum</h2>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={donutData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {donutData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <p className="text-2xl font-bold">{donutTotal}K</p>
          </div>
        </div>
        <div className="w-1/2 space-y-3 pl-4 flex flex-col justify-center">
          {donutData.map((entry, index) => (
            <div key={index} className="flex items-center space-x-2">
              <span
                className="w-4 h-4 rounded-full inline-block"
                style={{ backgroundColor: entry.color }}
              ></span>
              <span className="text-sm font-medium">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-white rounded-2xl shadow p-6 w-1/3 h-full flex flex-col">
        <div className="mb-4">
          <h2 className="text-lg font-semibold">Top Sales Locations</h2>
          <h1 className="text-3xl font-bold">{totalCustomers} M</h1>
          <p className="text-sm text-gray-500 mb-4">
            Our most customers in India
          </p>
          <div className="space-y-2">
            {Object.entries({
              Delhi: 15434,
              Mumbai: 4429,
              Rajasthan: 2434,
              Bangalore: 4898,
            }).map(([label, value]) => (
              <div key={label} className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: categoryColors[label] }}
                  />
                  <span className="text-sm">{label}</span>
                </div>
                <span className="font-semibold text-sm">{value}</span>
              </div>
            ))}
          </div>
        </div>
        
      </div>
      
    </div>
    <div className="bg-white rounded-2xl shadow-xl p-6 ">
  <h2 className="text-lg font-semibold mb-4">Project Overview</h2>

  <div className="flex justify-end gap-2 mb-4">
    {(["Week", "Month", "Year", "All"] as ViewType1[]).map((v) => (
      <button
        key={v}
        onClick={() => setView1(v)}
        className={`px-4 py-1 rounded-full text-sm font-medium ${
          view1 === v
            ? "bg-sky-400 text-white"
            : "bg-black text-white hover:bg-gray-800"
        }`}
      >
        {v}
      </button>
    ))}
  </div>

  <ResponsiveContainer width="100%" height={300}>
    <ComposedChart data={data1}>
      <defs>
        <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#60A5FA" stopOpacity={0.6} />
          <stop offset="100%" stopColor="#60A5FA" stopOpacity={0.1} />
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="bar" barSize={20} fill="#000000" radius={[5, 5, 0, 0]} />
      <Area
        type="monotone"
        dataKey="line"
        stroke="#60A5FA"
        fill="url(#lineGradient)"
        strokeWidth={3}
        dot={{ r: 5, stroke: "#60A5FA", strokeWidth: 2, fill: "white" }}
      />
    </ComposedChart>
  </ResponsiveContainer>

  <div className="grid grid-cols-4 text-center mt-6 border-t pt-4 text-sm text-gray-600">
    <div>
      <p className="text-xl font-bold text-black">12,721</p>
      <p>No. of Users</p>
    </div>
    <div>
      <p className="text-xl font-bold text-black">721</p>
      <p>No. Hospitals</p>
    </div>
    <div>
      <p className="text-xl font-bold text-black">Rs. 12.9 M</p>
      <p>Revenue</p>
    </div>
    <div>
      <p className="text-xl font-bold text-black">128</p>
      <p>Ambulance Partners</p>
    </div>
  </div>
</div>
<br />
<div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Activity Report</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium">
          Export Report
        </button>
      </div>

      <div className="overflow-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-500">
            <tr>
              <th className="py-2 px-4">Users</th>
              <th className="py-2 px-4">Lorem Ipsum</th>
              <th className="py-2 px-4">Lorem Ipsum</th>
              <th className="py-2 px-4">Lorem Ipsum</th>
              <th className="py-2 px-4">Lorem Ipsum</th>
              <th className="py-2 px-4">Lorem Ipsum</th>
              <th className="py-2 px-4">Lorem Ipsum</th>
            </tr>
          </thead>
          <tbody>
            {activityData.map((item, idx) => (
              <tr key={idx} className="border-b">
                <td className="py-3 px-4">{item.user}</td>
                {item.names.map((name, i) => (
                  <td key={i} className="py-3 px-4">
                    {name}
                  </td>
                ))}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded">
                      <div
                        className={`h-2 rounded ${
                          item.progress > 70
                            ? "bg-green-500"
                            : item.progress < 30
                            ? "bg-pink-500"
                            : "bg-blue-400"
                        }`}
                        style={{ width: `${item.progress}%` }}
                      ></div>
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        item.progress > 70
                          ? "text-green-600"
                          : item.progress < 30
                          ? "text-pink-500"
                          : "text-blue-400"
                      }`}
                    >
                      {item.progress}%
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center justify-center w-24 h-8 text-xs font-semibold rounded-md ${getStatusStyle(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-500">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    <br />
</div>
  );
};

export default ChartSection;
