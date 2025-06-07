'use client';

import { useEffect, FC, useState } from "react";
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
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';
import { Button } from "@/components/ui/button";

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

interface EarningsChartData {
  labels: string[];
  thisMonth: number[];
  lastMonth: number[];
}

interface HospitalData {
  hospitalId: string;
  hospitalName: string;
  location: string;
  registrationDate: string;
  approvalStatus: string;
  revenue: string;
}

const FILTER_TABS: string[] = ['All', 'Weekly', 'Monthly', 'Yearly'];

const createHospitalRecords = (total = 500): HospitalData[] => {
  const hospitalNames = ["Mithlesh Kumar Singh", "Suron Maharjan", "Sandesh Bajracharya", "Rohit Sharma", "Anjali Mehta"];
  const hospitalLocations = [
    "Kritipur, Kathmandu",
    "Natole, Lalitpur",
    "Bhinchhebahal, Lalitpur",
    "Jawalakhel, Lalitpur",
    "New Road, Kathmandu",
  ];
  const registrationDates = ["12.Jan.2021", "21.Feb.2021", "13.Mar.2021", "10.Apr.2021", "25.May.2021"];
  const approvalStatuses = ["Approved", "Pending"];

  return Array.from({ length: total }, () => ({
    hospitalId: `#${Math.floor(Math.random() * 900000 + 100000)}`,
    hospitalName: hospitalNames[Math.floor(Math.random() * hospitalNames.length)],
    location: hospitalLocations[Math.floor(Math.random() * hospitalLocations.length)],
    registrationDate: registrationDates[Math.floor(Math.random() * registrationDates.length)],
    approvalStatus: approvalStatuses[Math.floor(Math.random() * approvalStatuses.length)],
    revenue: `Rs. ${Math.floor(Math.random() * 4500 + 500)}`,
  }));
};

export interface Hospital {
  name: string;
  earnings: string;
  isPositive: boolean;
  color: string;
}

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
  data: ChartData[];
  totalPatients: number;
  totalRevenue: string;
  hospitals: Hospital[];
}

const timeRanges = ["Daily", "Monthly", "Yearly"];
const COLORS = ["#7CC3F1", "#000000"];

const TotalPatientsChart: FC<TotalPatientsChartProps> = ({
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
  const [timeframe, setTimeframe] = useState<'Daily' | 'Monthly' | 'Yearly'>('Yearly');

  const chartData = [
    { name: "Onboarded", value: onboarded },
    { name: "Not Onboarded", value: notOnboarded },
  ];

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
const [allHospitalData, setAllHospitalData] = useState<Record<string, HospitalData[]>>({});
  const [displayedHospitals, setDisplayedHospitals] = useState<HospitalData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedTab, setSelectedTab] = useState<string>('All');
  const recordsPerPage = 10;

  useEffect(() => {
    const data: Record<string, HospitalData[]> = {};
    FILTER_TABS.forEach(tab => {
      data[tab] = createHospitalRecords();
    });
    setAllHospitalData(data);
    setDisplayedHospitals(data['All']);
  }, []);

  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
    setCurrentPage(1);
    setDisplayedHospitals(allHospitalData[tab]);
  };

  const totalPages = Math.ceil(displayedHospitals.length / recordsPerPage);
  const visibleHospitals = displayedHospitals.slice((currentPage - 1) * recordsPerPage, currentPage * recordsPerPage);

  const getVisiblePageNumbers = () => {
    const totalPageNumbers = [...Array(totalPages).keys()].map(i => i + 1);
    const start = Math.max(0, currentPage - 3);
    return totalPageNumbers.slice(start, start + 5);
  };
  return (
    <div className="w-full">
      <div className="flex flex-col lg:flex-row gap-6 h-full">
        {/* Left column */}
        <div className="flex flex-col gap-6 w-full lg:w-1/3">
          {/* Average Order Value */}
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
              <span className={`${data1.isPositive ? "text-green-500" : "text-red-500"} font-medium`}>
                {data1.percentageChange}
              </span>
              <span className="text-gray-500 ml-1">than last month</span>
            </div>
          </div>

          {/* Top Performing Hospitals */}
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
                    <span className={`w-2.5 h-2.5 rounded-full ${hospital.color}`} />
                    <span className="font-semibold text-black">{hospital.name}</span>
                  </div>
                  <div className={`flex items-center font-semibold ${hospital.isPositive ? "text-green-500" : "text-red-500"}`}>
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

        {/* Right column - Total Patients vs Revenue */}
        <div className="w-full lg:w-2/3 flex flex-col justify-between bg-white p-6 rounded-2xl shadow-sm">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 gap-4">
            <div>
              <h2 className="text-md font-semibold text-gray-700 mb-1">
                Total Patients v/s Revenue
              </h2>
              <div className="flex gap-6 text-sm text-gray-500 font-medium">
                <span>
                  <span className="inline-block w-2 h-2 bg-sky-400 rounded-full mr-2" />
                  Total Patients: <strong className="text-black">{totalPatients}</strong>
                </span>
                <span>
                  <span className="inline-block w-2 h-2 bg-black rounded-full mr-2" />
                  Total Revenue: <strong className="text-black">{totalRevenue}</strong>
                </span>
              </div>
            </div>

            {/* Time Selector */}
            <div className="flex gap-2 bg-gray-100 p-1 rounded-lg w-fit">
              {timeRanges.map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedRange(range)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition ${selectedRange === range ? "bg-white shadow text-black" : "text-gray-500 hover:text-black"}`}
                >
                  {range}
                </button>
              ))}
            </div>
          </div>

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

      {/* Bottom section */}
      <div className="bg-gray-100 mt-8 min-h-screen">
        <div className="flex gap-6">
          {/* Hospital Info */}
          <div className="w-1/2 bg-white rounded-2xl shadow-sm p-6 flex flex-col justify-between">
            <h2 className="text-lg font-bold text-black">Hospital Info</h2>
            <div className="h-56 w-full flex justify-center items-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
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

          {/* Earning Comparison */}
          <div className="w-3/4 bg-white rounded-2xl shadow-sm p-4 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-semibold text-black">Earning Comparison</h2>
              <div className="flex items-center space-x-4">
                <select
                  className="border rounded px-2 py-1 text-sm text-gray-700"
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value as any)}
                >
                  <option value="Daily">Daily</option>
                  <option value="Monthly">Monthly</option>
                  <option value="Yearly">Yearly</option>
                </select>
                <div className="flex items-center space-x-5 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#7CC3F1]" />
                    Last Month
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-black" />
                    This Month
                  </div>
                </div>
              </div>
            </div>
            <div className="h-full w-full">
              <Line data={chartData3} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
      





      <div className="bg-white p-6 rounded-xl shadow w-full overflow-x-auto mt-[-140]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Hospitals List</h2>
        <div className="flex space-x-2">
          {FILTER_TABS.map(tab => (
            <button
              key={tab}
              onClick={() => handleTabClick(tab)}
              className={`px-4 py-1 rounded-full border ${
                selectedTab === tab ? 'bg-black text-white' : 'border-gray-300 text-gray-700'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr className="text-gray-600">
            <th>Hospital ID</th>
            <th>Hospital Name</th>
            <th>Location</th>
            <th>Date of Registered</th>
            <th>Hospital Approval Status</th>
            <th>Revenue Generated</th>
          </tr>
        </thead>
        <tbody>
          {visibleHospitals.map((entry, index) => (
            <tr key={index} className="bg-gray-50 hover:bg-gray-100 rounded">
              <td>{entry.hospitalId}</td>
              <td>{entry.hospitalName}</td>
              <td>{entry.location}</td>
              <td>{entry.registrationDate}</td>
              <td>
                <span
                  className={`px-3 py-1 rounded-sm text-sm font-medium inline-block cursor-default ${
                    entry.approvalStatus === 'Approved'
                      ? 'bg-black text-white px-8 py-1'
                      : 'bg-red-100 text-red-500 px-9 py-1'
                  }`}
                >
                  {entry.approvalStatus}
                </span>
              </td>
              <td>{entry.revenue}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between items-center text-sm text-gray-500">
        <span>
          Showing {(currentPage - 1) * recordsPerPage + 1} to {Math.min(currentPage * recordsPerPage, displayedHospitals.length)} of {displayedHospitals.length} entries
        </span>
        <div className="flex items-center space-x-1">
          <button className="px-2 py-1 rounded border" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>&lt;</button>
          {getVisiblePageNumbers().map(p => (
            <button
              key={p}
              onClick={() => setCurrentPage(p)}
              className={`px-2 py-1 rounded border ${
                currentPage === p ? 'bg-black text-white' : 'border-gray-300'
              }`}
            >
              {p}
            </button>
          ))}
          <button className="px-2 py-1 rounded border" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>&gt;</button>
        </div>
      </div>
    </div>


      
    </div>
  );
};

export default TotalPatientsChart;
