"use client";

import { FC, useState } from "react";
import { Line, Doughnut } from 'react-chartjs-2';
import {
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,PieChart, Pie, Cell
} from "recharts";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';
import { Button } from "@/components/ui/button"; // Adjust if needed

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);
// SummaryCard Component
interface SummaryCardProps {
  
}
interface EarningsComparisonProps {
  data: {
    yearly: ChartData;
    monthly: ChartData;
    daily: ChartData;
  };
}

interface ChartData {
  labels: string[];
  thisMonth: number[];
  lastMonth: number[];
}

interface EarningsChartData {
  labels: string[];
  thisMonth: number[];
  lastMonth: number[];
}
// TopHospitals Component
export interface Hospital {
  name: string;
  earnings: string;
  isPositive: boolean;
  color: string; // e.g. bg-green-500
}



// TotalPatientsChart Component
interface ChartData {
  name: string;
  patients: number;
  revenue: number;
}

interface TotalPatientsChartProps {
  data1: {
    title: string;
    value: string;
    percentageChange: string;
    isPositive: boolean;
  };
  data2: {
    total: number;
    onboarded: number;
    notOnboarded: number;
  };
  data3: {
    yearly: EarningsChartData;
    monthly: EarningsChartData;
    daily: EarningsChartData;
  };
  data: { name: string; patients: number; revenue: number }[];
  totalPatients: number;
  totalRevenue: string;
  hospitals: Hospital[];
}

const timeRanges = ["Daily", "Monthly", "Yearly"];
const COLORS = ["#7CC3F1", "#000000"];

interface HospitalInfoData {
  total: number;
  onboarded: number;
  notOnboarded: number;
}

interface HospitalInfoChartProps {
  data: HospitalInfoData;
}

export const TotalPatientsChart: FC<TotalPatientsChartProps> = ({
  data,
  totalPatients,
  totalRevenue,
  hospitals,
  data1,
  data2,
  data3,
}) => {
  const { total, onboarded, notOnboarded } = data2;
  const [selectedRange, setSelectedRange] = useState("Yearly");
  const chartData = [
    { name: "Onboarded", value: onboarded },
    { name: "Not Onboarded", value: notOnboarded },
  ];
const [timeframe, setTimeframe] = useState<'Daily' | 'Monthly' | 'Yearly'>('Yearly');

  const getChartData = () => {
    if (timeframe === 'Yearly') return data3.yearly;
    if (timeframe === 'Monthly') return data3.monthly;
    return data3.daily;
  };

  const chartData3 = {
    labels: getChartData().labels,
    datasets: [
      {
        label: 'This Month',
        data: getChartData().thisMonth,
        borderColor: '#000',
        backgroundColor: 'transparent',
        tension: 0.3,
      },
      {
        label: 'Last Month',
        data: getChartData().lastMonth,
        borderColor: '#60A5FA',
        backgroundColor: 'transparent',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
      tooltip: {
        callbacks: {
          label: (context: any) => `Rs. ${context.raw.toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return (
    <div className="w-full">
  <div className="flex flex-col lg:flex-row gap-6 h-full">
    {/* LEFT SIDE: [1] and [2] stacked vertically */}
    <div className="flex flex-col gap-6 w-full lg:w-1/3">
      {/* [1] Average Order Value */}
      <div className="bg-gray-50 p-6 rounded-2xl shadow-sm w-full">
        <h2 className="text-gray-700 text-sm font-semibold mb-2">
          {data1.title}
        </h2>
        <div className="text-3xl font-bold text-black mb-3">{data1.value}</div>
        <div className="flex items-center text-sm">
          {data1.isPositive ? (
            <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
          ) : (
            <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
          )}
          <span
            className={`${
              data1.isPositive ? "text-green-500" : "text-red-500"
            } font-medium`}
          >
            {data1.percentageChange}
          </span>
          <span className="text-gray-500 ml-1">than last month</span>
        </div>
      </div>

      {/* [2] Top Performing Hospitals */}
      <div className="bg-gray-50 p-6 rounded-2xl shadow-sm w-full">
        <h2 className="text-xl font-bold mb-4">Top Performing Hospitals</h2>
        <div className="flex justify-between text-sm text-gray-500 font-medium mb-2">
          <span>Hospitals</span>
          <span>Earnings</span>
        </div>
        <ul className="space-y-4">
          {hospitals.map((hospital, index) => (
            <li key={index} className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${hospital.color}`}
                />
                <span className="font-semibold text-black">
                  {hospital.name}
                </span>
              </div>
              <div
                className={`flex items-center font-semibold ${
                  hospital.isPositive ? "text-green-500" : "text-red-500"
                }`}
              >
                {hospital.isPositive ? (
                  <ArrowUpRight className="w-4 h-4 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 mr-1" />
                )}
                <span>{hospital.earnings}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>

    {/* RIGHT SIDE: [3] Total Patients v/s Revenue */}
    <div className="w-full lg:w-2/3 flex flex-col justify-between bg-white p-6 rounded-2xl shadow-sm">
      {/* Chart Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
        <div>
          <h2 className="text-md font-semibold text-gray-700 mb-1">
            Total Patients v/s Revenue
          </h2>
          <div className="flex gap-6 text-sm text-gray-500 font-medium">
            <span>
              <span className="inline-block w-2 h-2 bg-sky-400 rounded-full mr-2" />
              Total Patients:{" "}
              <strong className="text-black">{totalPatients}</strong>
            </span>
            <span>
              <span className="inline-block w-2 h-2 bg-black rounded-full mr-2" />
              Total Revenue:{" "}
              <strong className="text-black">{totalRevenue}</strong>
            </span>
          </div>
        </div>

        {/* Time Selector */}
        <div className="flex gap-2 bg-gray-100 p-1 rounded-lg w-fit">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => setSelectedRange(range)}
              className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                selectedRange === range
                  ? "bg-white shadow text-black"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "none",
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            }}
          />
          <Bar dataKey="patients" fill="#60A5FA" radius={[4, 4, 0, 0]} />
          <Bar dataKey="revenue" fill="#000000" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>

  <div className="p-8 bg-gray-100 min-h-screen space-y-10">
      <div className="bg-white rounded-2xl shadow-sm p-6 w-full max-w-sm">
      <h2 className="text-lg font-bold text-black mb-4">Hospital Info</h2>

      {/* Donut Chart */}
      <div className="h-56 w-full flex justify-center items-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={1}
              dataKey="value"
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Details */}
      <div className="mt-6 space-y-2">
        <div className="flex justify-between font-semibold text-sm text-black">
          <span>Total Hospitals</span>
          <span>{total.toLocaleString()}</span>
        </div>

        <div className="flex justify-between text-sm items-center">
          <div className="flex items-center gap-2 text-gray-600">
            <span className="w-3 h-3 rounded-full bg-[#7CC3F1]" />
            Onboarded
          </div>
          <span className="text-black font-medium">{onboarded}%</span>
        </div>

        <div className="flex justify-between text-sm items-center">
          <div className="flex items-center gap-2 text-gray-600">
            <span className="w-3 h-3 rounded-full bg-black" />
            Not Onboarded
          </div>
          <span className="text-black font-medium">{notOnboarded}%</span>
        </div>
      </div>
    </div>

    <div className="p-4 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Earning Comparison</h2>
        <select
          className="border rounded px-2 py-1"
          value={timeframe}
          onChange={(e) => setTimeframe(e.target.value as any)}
        >
          <option value="Daily">Daily</option>
          <option value="Monthly">Monthly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>
      <Line data={chartData3} options={chartOptions} />
    </div>

    
  </div>
  

</div>


  );
};


export default TotalPatientsChart;
