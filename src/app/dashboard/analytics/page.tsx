"use client";

import React, { useState, useMemo } from "react";
import {
  BarChart,
  Bar,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ComposableMap,
  Geographies,
  Geography,
} from "react-simple-maps";

const tabs = ["Week", "Month", "Year", "All"];

const dataSets = {
  Week: [
    { name: "Jan", users: 50, revenue: 70 },
    { name: "Feb", users: 100, revenue: 90 },
    { name: "Mar", users: 70, revenue: 50 },
    { name: "Apr", users: 30, revenue: 20 },
    { name: "May", users: 60, revenue: 50 },
    { name: "Jun", users: 90, revenue: 80 },
    { name: "Jul", users: 40, revenue: 40 },
    { name: "Aug", users: 100, revenue: 90 },
    { name: "Sep", users: 70, revenue: 60 },
    { name: "Oct", users: 30, revenue: 40 },
    { name: "Nov", users: 60, revenue: 80 },
    { name: "Dec", users: 90, revenue: 90 },
  ],
  Month: [],
  Year: [],
  All: [],
};

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-states.json";

const categoryColors = {
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

const donutData = [
  { name: "Lorem Ipsum", value: 50, color: "#000000" },
  { name: "Lorem Ipsum", value: 80, color: "#FFD700" },
  { name: "Lorem Ipsum", value: 60, color: "#7ED957" },
  { name: "Lorem Ipsum", value: 40, color: "#8ED1FC" },
];

const ProjectOverviewDashboard = () => {
  const [activeTab, setActiveTab] = useState("Week");
  const data = useMemo(() => dataSets[activeTab], [activeTab]);

  const [view, setView] = useState("Monthly");
  const [hoverIndex, setHoverIndex] = useState(null);

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

  const chartData = useMemo(() => {
    return labels.map(() => Math.floor(Math.random() * 200) + 10);
  }, [labels]);

  const donutTotal = donutData.reduce((acc, cur) => acc + cur.value, 0);

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Project Overview</h2>
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-4 py-1 rounded-full border text-sm font-medium transition ${
                  activeTab === tab
                    ? "bg-black text-white"
                    : "bg-gray-200 text-black"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="users" fill="#000" barSize={20} />
            <Line type="monotone" dataKey="revenue" stroke="#8ED1FC" strokeWidth={3} />
          </BarChart>
        </ResponsiveContainer>

        <div className="grid grid-cols-4 text-center mt-6">
          <div>
            <h3 className="text-xl font-bold">12,721</h3>
            <p className="text-sm text-gray-500">No. of Users</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">721</h3>
            <p className="text-sm text-gray-500">No. Hospitals</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">Rs. 12.9 M</h3>
            <p className="text-sm text-gray-500">Revenue</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">128</h3>
            <p className="text-sm text-gray-500">Ambulance Partners</p>
          </div>
        </div>
      </div>

      <div className="flex gap-4 w-full px-4 py-6 h-[400px]">
        {/* Bar Chart Section */}
        <div className="bg-white rounded-2xl shadow p-6 w-1/3 h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Lorem Ipsum</h2>
            <select
              value={view}
              onChange={(e) => setView(e.target.value)}
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
                  style={{ height: `${chartData[i]}px` }}
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
                      style={{ backgroundColor: categoryColors[label] || "#E5E7EB" }}
                    />
                    <span className="text-sm">{label}</span>
                  </div>
                  <span className="font-semibold text-sm">{value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-grow relative">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 1000, center: [80, 22] }}
              width={400}
              height={300}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const state = stateData.find(
                      (s) => s.id === geo.properties.st_nm
                    );
                    const fillColor = state
                      ? categoryColors[state.category]
                      : "#E5E7EB";

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={fillColor}
                        stroke="#fff"
                        style={{
                          default: { outline: "none" },
                          hover: { fill: "#60A5FA", outline: "none" },
                          pressed: { outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
            <div className="absolute bottom-4 right-4 flex flex-col space-y-2">
              <button className="bg-white rounded-full shadow w-7 h-7 flex items-center justify-center text-lg font-bold">
                +
              </button>
              <button className="bg-white rounded-full shadow w-7 h-7 flex items-center justify-center text-lg font-bold">
                –
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectOverviewDashboard;