'use client';
import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { Search, ScanLine } from 'lucide-react';

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


const pieData = [
  { name: 'Age', value: 63 },
  { name: 'Gender', value: 25 },
  { name: 'Area', value: 25 },
];

const Dashboard = () => {
  const [timeframeBasic, setTimeframeBasic] = useState<TimeFrame>('Monthly');
  const [timeframePremium, setTimeframePremium] = useState<TimeFrame>('Monthly');
  const [timeframeAdvanced, setTimeframeAdvanced] = useState<TimeFrame>('Monthly');
  const [timeframePie, setTimeframePie] = useState<TimeFrame>('Monthly');

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
    <div className="bg-white rounded-xl p-4 shadow-md w-full max-w-xs">
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
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
        <div className="mb-5 flex items-center bg-gray-100 rounded-full px-4 py-2 w-full max-w-md shadow-md">
      <Search className="w-4 h-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search for subscriptions, payouts, and reminders"
        className="flex-grow px-3 text-sm text-gray-700 bg-transparent outline-none placeholder-gray-400"
      />
      <ScanLine className="w-4 h-4 text-gray-400" />
    </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {renderBarCard('Basic Plan', 25222, timeframeBasic, (t) => handleChange('basic', t), dataBasic)}
        {renderBarCard('Premium Plan', 45222, timeframePremium, (t) => handleChange('premium', t), dataPremium)}
        {renderBarCard('Advanced Plan', 75422, timeframeAdvanced, (t) => handleChange('advanced', t), dataAdvanced)}

        {/* Pie Chart */}
        <div className="bg-white rounded-lg shadow-md p-4 w-full max-w-xs">
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

  <div className="flex justify-around mt-3 bg-gray-50 rounded-lg py-1.5">
    {data.map((item, index) => (
      <div key={item.name} className="text-center">
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
    </div>
  );
};

export default Dashboard;
