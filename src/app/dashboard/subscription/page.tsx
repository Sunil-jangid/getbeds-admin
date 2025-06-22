'use client';
import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, LineChart, Line, CartesianGrid,
} from 'recharts';
import { Search, ScanLine } from 'lucide-react';
import Image from 'next/image';

const dateData1 = [
  { date: "Jan 9", change: "+8%", value: 8 },
  { date: "Jan 10", change: "+10%", value: 10 },
  { date: "Jan 11", change: "+2%", value: 2 },
  { date: "Jan 12", change: "+20%", value: 20 },
  { date: "Jan 13", change: "-12%", value: -12 },
];
const subscriptionData4 = [
  { label: "Active", value: 10087, color: "#22C55E" }, // green
  { label: "Renewal", value: 9009, color: "#FACC15" },  // yellow
  { label: "Cancel", value: 4000, color: "#EF4444" },    // red
];

// Helper to get circle dash offset
const getStrokeDashoffset = (value: number, total: number) =>
  2 * Math.PI * 50 * (1 - value / total);

type SubscriptionItem = {
  day: number;
  title: string;
  desc: string;
  users: number;
};

const subscriptionData1: Record<string, SubscriptionItem[]> = {
  "Jan 10": [
    {
      day: 2,
      title: "Subscription renewal alert",
      desc: "3 of 4 payments, Recharge",
      users: 123,
    },
    {
      day: 8,
      title: "Payment Due",
      desc: "3 of 4 payments, Electricity",
      users: 100,
    },
    {
      day: 11,
      title: "Subscription upgrade",
      desc: "1 of 2 upgrades, Phone",
      users: 132,
    },
    {
      day: 23,
      title: "Bill payment alert",
      desc: "2 of 4 payments, Tuition fees",
      users: 140,
    },
    {
      day: 27,
      title: "Subscription Due",
      desc: "1 of 4 payments, Water Bill",
      users: 1500,
    },
  ],
  "Jan 12": [
    {
      day: 5,
      title: "Subscription Paused",
      desc: "1 of 3, Streaming Service",
      users: 89,
    },
    {
      day: 13,
      title: "Payment Reminder",
      desc: "2 of 4 payments, Broadband",
      users: 60,
    },
  ],
};

const dataMap = {
  Weekly: [
    { name: '1st week', users: 20, revenue: 22 },
    { name: '2nd week', users: 40, revenue: 65 },
    { name: '3rd week', users: 48, revenue: 70 },
    { name: '4th week', users: 52, revenue: 50 },
    { name: '5th week', users: 60, revenue: 75 },
    { name: '6th week', users: 78, revenue: 98 },
  ],
  Monthly: [
    { name: 'Jan', users: 200, revenue: 250 },
    { name: 'Feb', users: 180, revenue: 220 },
    { name: 'Mar', users: 240, revenue: 300 },
    { name: 'Apr', users: 260, revenue: 310 },
    { name: 'May', users: 300, revenue: 380 },
    { name: 'Jun', users: 320, revenue: 400 },
  ],
  Yearly: [
    { name: '2019', users: 1000, revenue: 1200 },
    { name: '2020', users: 1400, revenue: 1800 },
    { name: '2021', users: 1600, revenue: 2000 },
    { name: '2022', users: 1800, revenue: 2200 },
    { name: '2023', users: 2100, revenue: 2800 },
    { name: '2024', users: 2500, revenue: 3200 },
  ],
};

const timeFrames = ['Weekly', 'Monthly', 'Yearly'] as const;
type TimeFrame = typeof timeFrames[number];
const allData = {
  Daily: [
    { name: "Age", value: 45 },
    { name: "Gender", value: 30 },
    { name: "Area", value: 25 },
  ],
  Monthly: [
    { name: "Age", value: 63 },
    { name: "Gender", value: 25 },
    { name: "Area", value: 25 },
  ],
  Yearly: [
    { name: "Age", value: 70 },
    { name: "Gender", value: 20 },
    { name: "Area", value: 10 },
  ],
};

const subscriptionStats = [
  { month: 'Jan', annual: 10, total: 20 },
  { month: 'Feb', annual: 1, total: 20 },
  { month: 'Mar', annual: 20, total: 20 },
  { month: 'Apr', annual: 10, total: 20 },
  { month: 'May', annual: 10, total: 20 },
  { month: 'Jun', annual: 5, total: 20 },
  { month: 'Jul', annual: 10, total: 20 },
  { month: 'Aug', annual: 7, total: 20 },
  { month: 'Sep', annual: 5, total: 20 },
  { month: 'Oct', annual: 15, total: 20 },
  { month: 'Nov', annual: 6, total: 20 },
  { month: 'Dec', annual: 3, total: 20 },
];

const subscriptionData = [
  {
    name: 'John Adams',
    avatar: '/pro.png', // replace with actual path
    type: 'Monthly Subscription',
    due: 'Due today!',
    subscribedOn: '19th Oct, 2024',
  },
  {
    name: 'John Adams',
    avatar: '/pro.png',
    type: 'Monthly Subscription',
    due: 'Due today!',
    subscribedOn: '12th Nov, 2024',
  },
  {
    name: 'John Adams',
    avatar: '/pro.png',
    type: 'Annual Payment',
    due: 'Due tomorrow',
    subscribedOn: '12th Dec, 2024',
  },
  {
    name: 'John Adams',
    avatar: '/pro.png',
    type: 'Set payment reminder',
    due: 'Due today',
    subscribedOn: '15th Oct, 2024',
  },
];

const COLORS = ["#6B5BFF", "#FACC15", "#F43F5E"]; // Purple, Yellow, Red

const getLabels = (type: TimeFrame) => {
  if (type === 'Weekly') return ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  if (type === 'Yearly') return ['2018', '2019', '2020', '2021', '2022', '2023', '2024'];
  return ['June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
};

const generateData = (labels: string[]) =>
  labels.map((label) => ({
    name: label,
    value: Math.floor(Math.random() * 100) + 20,
  }));

const Dashboard = () => {
  const [timeframeBasic, setTimeframeBasic] = useState<TimeFrame>('Monthly');
  const [timeframePremium, setTimeframePremium] = useState<TimeFrame>('Monthly');
  const [timeframeAdvanced, setTimeframeAdvanced] = useState<TimeFrame>('Monthly');
  const [timeframe, setTimeframe] = useState<'Weekly' | 'Monthly' | 'Yearly'>('Weekly');
  const chartData = dataMap[timeframe];
  const [dataBasic, setDataBasic] = useState(generateData(getLabels('Monthly')));
  const [dataPremium, setDataPremium] = useState(generateData(getLabels('Monthly')));
  const [dataAdvanced, setDataAdvanced] = useState(generateData(getLabels('Monthly')));

  const handleChange = (plan: 'basic' | 'premium' | 'advanced', newTimeframe: TimeFrame) => {
    const labels = getLabels(newTimeframe);
    const newData = generateData(labels);

    if (plan === 'basic') {
      setTimeframeBasic(newTimeframe);
      setDataBasic(newData);
    } else if (plan === 'premium') {
      setTimeframePremium(newTimeframe);
      setDataPremium(newData);
    } else if (plan === 'advanced') {
      setTimeframeAdvanced(newTimeframe);
      setDataAdvanced(newData);
    }
  };

  const renderBarCard = (
    title: string,
    amount: number,
    timeframe: TimeFrame,
    onChange: (newTime: TimeFrame) => void,
    data: any[]
  ) => (
    <div className="bg-white rounded-xl p-4 shadow-md w-full">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-semibold">{title}</h2>
        <select
          className="text-xs border rounded px-2 py-1 cursor-pointer"
          value={timeframe}
          onChange={(e) => onChange(e.target.value as TimeFrame)}
        >
          {timeFrames.map((tf) => (
            <option key={tf} value={tf}>{tf}</option>
          ))}
        </select>
      </div>
      <div className="text-xl font-bold">Rs. {amount.toLocaleString()}</div>
      <div className="text-xs text-gray-500 mb-3">
        No. of customers buying in last 7 {timeframe.toLowerCase()}
      </div>
      <ResponsiveContainer width="100%" height={150}>
        <BarChart data={data} barSize={14}>
          <XAxis dataKey="name" stroke="#888" />
          <YAxis hide />
          <Tooltip />
          <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
  const [selectedRange, setSelectedRange] = useState<"Daily" | "Monthly" | "Yearly">("Monthly");
  const data = allData[selectedRange];
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState("Jan 10");
  const total = subscriptionData4.reduce((acc, item) => acc + item.value, 0);
  let offset = 0;
  return (
    <div className="p-4 sm:p-6 min-h-screen w-full flex flex-col">
      {/* Search Bar at Top Left */}
      <div className="mb-5 flex items-center bg-gray-100 rounded-full px-4 py-2 w-full max-w-md shadow-md self-start">
        <Search className="w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search for subscriptions, payouts, and reminders"
          className="flex-grow px-3 text-sm text-gray-700 bg-transparent outline-none placeholder-gray-400"
        />
        <ScanLine className="w-4 h-4 text-gray-400" />
      </div>

      {/* Grid for Bar Charts and Pie Chart */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-full">
        {renderBarCard('Basic Plan', 25222, timeframeBasic, (t) => handleChange('basic', t), dataBasic)}
        {renderBarCard('Premium Plan', 45222, timeframePremium, (t) => handleChange('premium', t), dataPremium)}
        {renderBarCard('Advanced Plan', 75422, timeframeAdvanced, (t) => handleChange('advanced', t), dataAdvanced)}

        {/* Pie Chart */}
        <div className="bg-white rounded-lg shadow-md p-4 w-full">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-semibold leading-tight">Customer Categories v/s Subscription</h2>
            <select
              className="bg-transparent text-xs border rounded px-2 py-1 outline-none cursor-pointer"
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value as "Daily" | "Monthly" | "Yearly")}
            >
              <option value="Daily">Daily</option>
              <option value="Monthly">Monthly</option>
              <option value="Yearly">Yearly</option>
            </select>
          </div>

          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={55}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="flex flex-wrap justify-around mt-3 bg-gray-50 rounded-lg py-1.5">
            {data.map((item, index) => (
              <div key={item.name} className="text-center p-1">
                <div className="flex items-center justify-center gap-1.5">
                  <span
                    className="inline-block w-2 h-2 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  ></span>
                  <span className="text-xs font-medium text-gray-800">{item.name}</span>
                </div>
                <p className="text-xs text-gray-600">{item.value}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area: User Subscriptions, Total Subscriptions, Users vs Revenue */}
      <div className="bg-white rounded-lg shadow-md mt-6 p-4 sm:p-6 w-full max-w-full">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Section (2/3 width on large screens) */}
          <div className="w-full lg:w-2/3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-black">Get started with SubsManage</h2>
                <p className="text-sm text-gray-400">View, progress and manage subscription efficiently</p>
              </div>
              <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-full font-semibold mt-4 sm:mt-0">
                +Add Subscription
              </button>
            </div>

            <h3 className="text-lg font-semibold text-black mb-3">User Subscriptions List</h3>

            <div className="bg-gray-100 p-4 rounded-lg space-y-4">
              {subscriptionData.map((item, index) => (
                <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-gray-100 p-2 rounded-md">
                  <div className="flex items-center space-x-3 mb-2 sm:mb-0">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      width={40}
                      height={40}
                      className="rounded-full object-cover"
                    />
                    <p className="font-medium text-black">{item.name}</p>
                  </div>
                  <p className="text-sm text-black mb-1 sm:mb-0">{item.type}</p>
                  <p className="text-sm text-black mb-1 sm:mb-0">{item.due}</p>
                  <p className="text-sm text-gray-500">Subscribed on {item.subscribedOn}</p>
                </div>
              ))}

              <div className="text-center mt-4">
                <button className="bg-black text-white px-6 py-2 rounded-full text-sm font-medium">
                  View all subscriptions
                </button>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-black mb-3 mt-6">Total subscriptions</h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <p className="text-sm font-medium text-black mb-6">Annual Subscriptions</p>

              <div className="flex flex-col sm:flex-row">
                {/* Y-axis Labels */}
                <div className="flex sm:flex-col justify-between h-40 sm:h-auto mr-2 text-xs text-black sm:mb-0 mb-4 flex-shrink-0">
                  {[20, 15, 10, 5, 0].map((val) => (
                    <div key={val} className="sm:h-8">{val}S</div>
                  ))}
                </div>

                {/* Bar Chart */}
                <div className="flex justify-between items-end h-40 w-full overflow-x-auto pb-2">
                  {subscriptionStats.map((item, index) => {
                    const blackHeight = (item.annual / item.total) * 100;
                    const blueHeight = 100 - blackHeight;

                    return (
                      <div
                        key={index}
                        className="relative flex flex-col items-center w-8 sm:w-10 flex-shrink-0"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                        <div className="relative w-full h-40 bg-transparent flex flex-col justify-end">
                          <div className="bg-blue-300 transition-all duration-200" style={{ height: `${blueHeight}%` }} />
                          <div className="bg-black transition-all duration-200" style={{ height: `${blackHeight}%` }} />
                        </div>
                        {hoveredIndex === index && (
                          <div className="absolute -top-16 w-max bg-black text-white text-xs px-2 py-1 rounded shadow-md z-10">
                            <p>{item.month}</p>
                            <p>Total: {item.total}</p>
                            <p>Annual: {item.annual}</p>
                          </div>
                        )}
                        <span className="text-xs text-black mt-2">{item.month}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg mt-6 shadow-md">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <h3 className="text-lg font-semibold text-black">Users v/s Revenue</h3>

                <div className="flex flex-wrap items-center space-x-4 sm:space-x-6 mt-4 sm:mt-0">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 bg-blue-300 rounded-full" />
                    <span className="text-sm text-gray-600">No. of users</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 bg-black rounded-full" />
                    <span className="text-sm text-gray-800">Revenue</span>
                  </div>

                  <select
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value as any)}
                    className="ml-0 sm:ml-4 border border-gray-300 rounded px-2 py-1 text-sm text-gray-700 mt-2 sm:mt-0"
                  >
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Yearly</option>
                  </select>
                </div>
              </div>

              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 'auto']} />
                  <Tooltip />
                  <Line type="monotone" dataKey="users" stroke="#93c5fd" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="revenue" stroke="#000000" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Section (1/3 width on large screens) */}
          <div className="w-full lg:w-1/3 flex flex-col space-y-6">
            <div className="bg-white p-4 rounded-xl shadow-md">
              <h2 className="text-lg font-semibold mb-4">Current Month Overview</h2>

              <div className="flex items-center overflow-x-auto pb-2 space-x-2 mb-4">
                {dateData1.map((item) => (
                  <div
                    key={item.date}
                    className={`flex flex-col items-center cursor-pointer px-3 py-2 rounded flex-shrink-0 ${
                      selectedDate === item.date ? "bg-gray-100 font-semibold" : ""
                    }`}
                    onClick={() => setSelectedDate(item.date)}
                  >
                    <span className="text-sm">{item.date}</span>
                    <span
                      className={`text-xs ${
                        item.value >= 0 ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {item.change}
                    </span>
                  </div>
                ))}
                <span className="ml-auto text-xs cursor-pointer flex-shrink-0">See all</span>
              </div>

              <div>
                <h3 className="text-base font-semibold mb-2">Upcoming subscriptions this month</h3>

                <div className="space-y-3">
                  {subscriptionData1[selectedDate]?.map((sub, index) => (
                    <div
                      key={index}
                      className={`group flex items-center justify-between p-3 rounded-md transition-colors duration-200 ${
                        sub.title === "Payment Due" ? "hover:bg-blue-50" : "hover:bg-blue-50"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                            sub.title === "Payment Due"
                              ? "bg-gray-300 text-black group-hover:bg-gray-800 group-hover:text-white"
                              : "bg-gray-300 text-black group-hover:bg-black group-hover:text-white"
                          }`}
                        >
                          {sub.day}
                        </div>
                        <div>
                          <div className="text-sm font-medium">{sub.title}</div>
                          <div className="text-xs text-gray-500">{sub.desc}</div>
                        </div>
                      </div>
                      <div className="text-right text-sm font-medium">{sub.users} Users</div>
                    </div>
                  )) || <p className="text-gray-400 text-sm p-3">No subscriptions for this date.</p>}
                </div>
              </div>

              <button className="w-full py-2 mt-4 rounded-full bg-black text-white text-sm font-medium">
                View full list
              </button>
            </div>

            <div className="bg-white p-4 rounded-xl shadow-md w-full flex flex-col items-center justify-between">
              <div className="w-full flex justify-between items-center mb-4">
                <h2 className="text-sm font-semibold">Subscription Plans</h2>
              </div>

              <div className="relative w-48 h-48 mb-4">
                <svg width="100%" height="100%" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    fill="none"
                    stroke="#F3F4F6"
                    strokeWidth="10"
                  />
                  {subscriptionData4.map((item, index) => {
                    const valueOffset = getStrokeDashoffset(item.value, total);
                    const circle = (
                      <circle
                        key={item.label}
                        cx="60"
                        cy="60"
                        r="50"
                        fill="none"
                        stroke={item.color}
                        strokeWidth="10"
                        strokeDasharray={2 * Math.PI * 50}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        transform="rotate(-90 60 60)"
                      />
                    );
                    offset += (item.value / total) * 2 * Math.PI * 50;
                    return circle;
                  })}
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">
                  GetBeds+
                </div>
              </div>

              <div className="space-y-2 w-full">
                {subscriptionData4.map((item) => (
                  <div key={item.label} className="flex items-center gap-2 text-sm">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span className="flex-1">{item.label}</span>
                    <span className="font-medium">
                      {item.value.toLocaleString()}+
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;