"use client";

import SummaryCard from "@/components/dashboard/SummaryCard";
import Image from "next/image";
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer , Legend
} from 'recharts';

const Dashboard = () => {
  const adminData = {
    name: "Johe",
    location: "Bangalore",
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning!" : hour < 18 ? "Good Afternoon!" : "Good Evening!";

  const generateDailyData = (min: number, max: number, count: number) =>
    Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);

  const cardsData = [
    {
      id: "hospitals",
      title: "HOSPITALS",
      revenue: 0,
      growth: 12890,
      chartData: generateDailyData(1000, 2000, 360),
    },
    {
      id: "ambulance",
      title: "AMBULANCE",
      revenue: 0,
      growth: 7890,
      chartData: generateDailyData(800, 1500, 360),
    },
    {
      id: "diagnostic",
      title: "DIAGNOSTIC CENTRES",
      revenue: 0,
      growth: -14580,
      chartData: generateDailyData(500, 1200, 360),
    },
  ];

  const data = [
    {
      icon: "/user.png",
      title: "Total No. of Users",
      count: "5,423",
      change: 16,
    },
    {
      icon: "/hospitals.png",
      title: "Total No. of Hospitals",
      count: "1,893",
      change: -1,
    },
    {
      icon: "/diagnostic.png",
      title: "Total No. of Diagnostic Centres",
      count: "189",
      change: 16,
    },
  ];

  const timeframeOptions = [
    { label: "Jan 2024", value: "jan-2024" },
    { label: "Feb 2024", value: "feb-2024" },
    { label: "Mar 2024", value: "mar-2024" },
    { label: "Apr 2024", value: "apr-2024" },
    { label: "May 2024", value: "may-2024" },
  ];

  const pieData = [
  { name: 'Delhi', value: 34, color: '#fb5531' },
  { name: 'Mumbai', value: 28, color: '#20c997' },
  { name: 'UP', value: 16, color: '#845ef7' },
  { name: 'Gujrat', value: 23, color: '#3b82f6' },
];
  const COLORS = ['#f87171', '#fbbf24', '#60a5fa', '#34d399'];

  const barData = [
    { name: '17-20', actual: 70, expected: 100 },
    { name: '21-25', actual: 50, expected: 60 },
    { name: '26-30', actual: 30, expected: 40 },
    { name: '31-35', actual: 40, expected: 50 },
    { name: '36-40', actual: 20, expected: 30 },
    { name: '41-45', actual: 80, expected: 70 },
    { name: '50-89', actual: 60, expected: 75 },
  ];

  const performanceData = [
  {
    label: "Beds Booked",
    value: 1000,
    change: "+8%",
    icon: '/bedbooking.png',
    bg: "bg-pink-100",
    iconBg: "#ff6584"
  },
  {
    label: "Total Orders",
    value: 300,
    change: "+5%",
    icon: '/totaloders.png',
    bg: "bg-orange-100",
    iconBg: "#ff9f68"
  },
  {
    label: "Medicines Sold",
    value: 5,
    change: "-12%",
    icon: '/medicinessold.png',
    bg: "bg-green-100",
    iconBg: "#34d399"
  },
  {
    label: "Home Service",
    value: 8,
    change: "0.5%",
    icon: '/homeservies.png',
    bg: "bg-purple-100",
    iconBg: "#a78bfa"
  }
];


  return (
    <div className="min-h-screen flex justify-center px-4">
      <div className="w-full max-w-7xl p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <p className="text-2xl text-gray-500">Hello {adminData.name}!</p>
            <h1 className="text-5xl font-bold">{greeting}</h1>
            <p className="text-1xl text-gray-400">{adminData.location}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <select className="border rounded-md px-6 py-2">
              {timeframeOptions.map((option, index) => (
                <option key={index} value={option.value}>{option.label}</option>
              ))}
            </select>
            <button className="bg-gray-100 px-6 py-2 rounded-md text-sm">Export CSV</button>
            <button className="bg-black text-white px-6 py-2 rounded-full text-sm">Add New +</button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="flex flex-wrap justify-center gap-5">
          {cardsData.map(item => (
            <SummaryCard key={item.id} item={item} />
          ))}
        </div>

        {/* Overview Stats */}
        <div className="flex flex-wrap justify-center gap-8 bg-white rounded-xl shadow p-5 lg:mx-2">
          {data.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-4 w-full sm:w-72 last:border-none pb-4 sm:pb-0 sm:pr-4"
            >
              <div className="bg-black rounded-full p-4">
                <Image src={item.icon} alt="icon" width={55} height={55} />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-500">{item.title}</h4>
                <p className="text-2xl font-bold text-gray-900">{item.count}</p>
                <p className={`text-sm mt-1 ${item.change >= 0 ? "text-green-600" : "text-red-600"}`}>
                  {item.change >= 0 ? "↑" : "↓"} {Math.abs(item.change)}%
                  <span className="text-gray-500"> this month</span>
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Chart & Performance Section */}
        <div className="grid lg:grid-cols-3 gap-6 mt-6">

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Area Wise Bookings</h3>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-4 flex flex-col gap-2">
        {pieData.map((entry, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <span className="text-sm text-gray-700">{entry.name}</span>
            <span className="ml-auto font-semibold text-gray-900">{entry.value}%</span>
          </div>
        ))}
      </div>
    </div>

          {/* Bar Chart */}
          {/* Inventory vs Utilization Bar Chart */}
<div className="bg-white p-6 rounded-lg shadow-md col-span-2">
  <h3 className="text-lg font-semibold text-gray-800 mb-4">Inventory v/s Utilization</h3>
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={barData} barSize={30}>
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend
        verticalAlign="top"
        align="right"
        iconType="circle"
        formatter={(value) =>
          value === "actual" ? (
            <span className="text-blue-400">Actual</span>
          ) : (
            <span className="text-black">Expected</span>
          )
        }
      />
      <Bar dataKey="actual" fill="#93c5fd" name="actual" />
      <Bar dataKey="expected" fill="#000000" name="expected" />
    </BarChart>
  </ResponsiveContainer>
</div>


          
        </div>

        {/* Performance Cards */}
        <div className="mt-6">
  <h2 className="text-xl font-bold text-[#1C1C45]">Performance Overview</h2>
  <p className="text-sm text-gray-500 mt-1">Today Summary</p>

  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
    {performanceData.map((item, index) => (
      <div
        key={index}
        className={`rounded-2xl p-5 flex justify-between items-center ${item.bg}`}
      >
        <div>
          <p className="text-3xl font-extrabold text-[#1C1C45]">{item.value}</p>
          <p className="text-sm text-[#1C1C45] font-medium mt-1">{item.label}</p>
          <p className={`text-xs mt-1 ${item.change.startsWith('-') ? 'text-red-500' : 'text-green-500'}`}>
            {item.change} from yesterday
          </p>
        </div>
          <Image src={item.icon} alt={item.label} width={50} height={50} />
        
      </div>
    ))}
  </div>
</div>

      </div>
    </div>
  );
};

export default Dashboard;
