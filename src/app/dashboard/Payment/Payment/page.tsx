"use client";

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
import React, { useEffect, useMemo, useState } from "react";
import { faker } from "@faker-js/faker";
import { format, subDays, subMonths, subYears, isAfter, parseISO } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaymentData {
  user: string;
  address: string;
  date: string;
  amount: number;
}

interface HospitalData {
  hospitalId: string;
  hospitalName: string;
  location: string;
  dateOfRegistered: string;
  hospitalApprovalStatus: "Approved" | "Pending";
  revenueGenerated: number;
}

const generateRandomPaymentData = (count: number): PaymentData[] => {
  const data: PaymentData[] = [];
  for (let i = 0; i < count; i++) {
    const randomDate = faker.date.between({ from: "2020-01-01", to: new Date() });
    data.push({
      user: faker.person.fullName(),
      address: `${faker.location.streetAddress()}, ${faker.location.city()}`,
      date: format(randomDate, "dd.MMM.yyyy"),
      amount: faker.number.int({ min: 500, max: 10000 }),
    });
  }
  return data;
};

const generateRandomHospitalData = (count: number): HospitalData[] => {
  const data: HospitalData[] = [];
  for (let i = 0; i < count; i++) {
    const randomDate = faker.date.between({ from: "2020-01-01", to: new Date() });
    data.push({
      hospitalId: `#${faker.string.numeric(6)}`,
      hospitalName: faker.company.name(),
      location: `${faker.location.city()}, ${faker.location.state()}`,
      dateOfRegistered: format(randomDate, "dd.MMM.yyyy"),
      hospitalApprovalStatus: faker.helpers.arrayElement(["Approved", "Pending"]),
      revenueGenerated: faker.number.int({ min: 500, max: 10000 }) * 100, // Larger revenue
    });
  }
  return data;
};

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
  const [selectedRange, setSelectedRange] = useState("Monthly"); // This state is not currently used in the provided snippet
  const [activeTab, setActiveTab] = useState("Users");
  const [filterRange, setFilterRange] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 12;

  const allPaymentData = useMemo(() => generateRandomPaymentData(500), []);
  const allHospitalData = useMemo(() => generateRandomHospitalData(100), []); // Generate hospital data

  const filteredPaymentData = useMemo(() => {
    let data = [...allPaymentData];
    const now = new Date();

    if (filterRange === "Last Week") {
      data = data.filter(d => isAfter(parseISO(format(new Date(d.date), "yyyy-MM-dd")), subDays(now, 7)));
    } else if (filterRange === "Last Month") {
      data = data.filter(d => isAfter(parseISO(format(new Date(d.date), "yyyy-MM-dd")), subMonths(now, 1)));
    } else if (filterRange === "Last Year") {
      data = data.filter(d => isAfter(parseISO(format(new Date(d.date), "yyyy-MM-dd")), subYears(now, 1)));
    }

    if (searchTerm) {
      data = data.filter(d =>
        d.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return data;
  }, [filterRange, searchTerm, allPaymentData]);

  const filteredHospitalData = useMemo(() => {
    let data = [...allHospitalData];
    const now = new Date();

    if (filterRange === "Last Week") {
      data = data.filter(d => isAfter(parseISO(format(new Date(d.dateOfRegistered), "yyyy-MM-dd")), subDays(now, 7)));
    } else if (filterRange === "Last Month") {
      data = data.filter(d => isAfter(parseISO(format(new Date(d.dateOfRegistered), "yyyy-MM-dd")), subMonths(now, 1)));
    } else if (filterRange === "Last Year") {
      data = data.filter(d => isAfter(parseISO(format(new Date(d.dateOfRegistered), "yyyy-MM-dd")), subYears(now, 1)));
    }

    if (searchTerm) {
      data = data.filter(d =>
        d.hospitalName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.hospitalId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.hospitalApprovalStatus.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    return data;
  }, [filterRange, searchTerm, allHospitalData]);

  const currentTableData = activeTab === "Users" ? filteredPaymentData : filteredHospitalData;

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return currentTableData.slice(start, start + perPage);
  }, [currentTableData, currentPage]);

  const totalPages = Math.ceil(currentTableData.length / perPage);
  const maxPageButtons = 5;
  const startPage = Math.max(1, currentPage - 2);
  const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

  // Reset page when tab or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, filterRange, searchTerm]);

  return (
    <div>
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
    <div className="bg-white rounded-2xl p-7 shadow mt-[-20]">
    <div className="bg-white rounded-2xl p-4 shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Payment Details</h2>
        <div className="flex gap-2 rounded-full bg-gray-100 p-1">
          {['Users', 'Hospitals'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-1 rounded-full ${activeTab === tab ? 'bg-white text-black shadow' : 'text-gray-500'}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between mb-4">
        <div className="flex items-center border rounded px-3 py-1 gap-2 w-full max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z" /></svg>
          <input
            type="text"
            placeholder="Search"
            className="outline-none w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
        </div>
        <button className="ml-2 bg-black text-white px-4 py-1 rounded">Search</button>

        <div className="flex ml-auto">
  <div className="flex rounded-full border overflow-hidden">
    {['All', 'Last Week', 'Last Month', 'Last Year'].map((label, index) => (
      <button
        key={label}
        className={`px-4 py-1 text-sm font-medium transition-colors duration-200
          ${filterRange === label ? 'bg-black text-white' : 'bg-white text-black'}
          ${index === 0 ? 'rounded-l-full' : ''}
          ${index === 3 ? 'rounded-r-full' : ''}
        `}
        onClick={() => setFilterRange(label)}
      >
        {label}
      </button>
    ))}
  </div>
</div>

      </div>

      {activeTab === 'Users' ? (
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="text-gray-500 text-xs border-b">
              <th className="py-2">Users</th>
              <th className="py-2">Address</th>
              <th className="py-2">Date</th>
              <th className="py-2">Amount</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((entry, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2">{(entry as PaymentData).user}</td>
                <td className="py-2">{(entry as PaymentData).address}</td>
                <td className="py-2">{(entry as PaymentData).date}</td>
                <td className="py-2">Rs. {(entry as PaymentData).amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <table className="w-full text-sm text-left border-collapse">
          <thead>
            <tr className="text-gray-500 text-xs border-b">
              <th className="py-2">Hospital ID</th>
              <th className="py-2">Hospital Name</th>
              <th className="py-2">Location</th>
              <th className="py-2">Date of Registered</th>
              <th className="py-2">Hospital Approval Status</th>
              <th className="py-2">Revenue Generated</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((entry, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="py-2">{(entry as HospitalData).hospitalId}</td>
                <td className="py-2">{(entry as HospitalData).hospitalName}</td>
                <td className="py-2">{(entry as HospitalData).location}</td>
                <td className="py-2">{(entry as HospitalData).dateOfRegistered}</td>
                <td className="py-2">
                  <span className={`
                    inline-flex justify-center items-center
                    px-4 py-1 rounded-md text-xs font-semibold w-24 text-center
                    ${(entry as HospitalData).hospitalApprovalStatus === 'Approved' ? 'bg-black text-white' : 'bg-red-100 text-red-700'}
                  `}>
                    {(entry as HospitalData).hospitalApprovalStatus}
                  </span>
                </td>
                <td className="py-2">Rs. {(entry as HospitalData).revenueGenerated.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
        <span> </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-2"
          >
            <ChevronLeft size={16} />
          </button>
          {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 rounded ${page === currentPage ? 'bg-black text-white' : 'border'}`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-2"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div></div>
    </div>
  );
}