"use client";

import { useEffect, useState } from "react";
import SummaryCard from "@/components/dashboard/SummaryCard";
import OverviewStats from "@/components/dashboard/OverviewStats";
import PerformanceOverview from "@/components/dashboard/PerformanceOverview";
import ChartsSection from "@/components/dashboard/ChartsSection";
import TotalRevenue from "@/components/dashboard/TotalRevenue";
import AnalyticsCardList from "@/components/dashboard/AnalyticsCardList";
import PatientInsightsChart from "@/components/dashboard/PatientInsightsChart";
import HospitalServiceCards from "@/components/dashboard/HospitalServiceCards";
import StatCardsGrid from "@/components/dashboard/StatCards";
import "react-circular-progressbar/dist/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import Link from 'next/link';

const Dashboard = () => {
  const [selectedYear, setSelectedYear] = useState("2025");
  const timeframes = ["Daily", "Weekly", "Monthly", "Yearly"];
  const adminData = {
    name: "Johe",
    location: "Bangalore",
  };

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good Morning!" : hour < 18 ? "Good Afternoon!" : "Good Evening!";

  const generateRandomData = (min: number, max: number, count: number) =>
    Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);

  const isRealYear = selectedYear === "2025";
  const isRandomYear = selectedYear === "2026" || selectedYear === "2027";

  const getCardsData = () => {
    return [
      {
        id: "hospitals",
        title: "HOSPITALS",
        revenue: 0,
        growth: isRealYear ? 12890 : isRandomYear ? Math.floor(Math.random() * 5000) : 0,
        chartData: isRealYear
          ? generateRandomData(500, 2000, 360)
          : isRandomYear
            ? generateRandomData(500, 1500, 360)
            : Array(360).fill(0),
        link:"/dashboard/hospital/",
      },
      {
        id: "ambulance",
        title: "AMBULANCE",
        revenue: 0,
        growth: isRealYear ? 7890 : isRandomYear ? Math.floor(Math.random() * 4000) : 0,
        chartData: isRealYear
          ? generateRandomData(800, 1500, 360)
          : isRandomYear
            ? generateRandomData(400, 1300, 360)
            : Array(360).fill(0),
            link:"/dashboard/ambulance/",
      },
      {
        id: "diagnostic",
        title: "DIAGNOSTIC CENTRES",
        revenue: 0,
        growth: isRealYear ? -14580 : isRandomYear ? -Math.floor(Math.random() * 2000) : 0,
        chartData: isRealYear
          ? generateRandomData(500, 1200, 360)
          : isRandomYear
            ? generateRandomData(200, 900, 360)
            : Array(360).fill(0),
            link:"/dashboard/Diagnostic/",
      },
    ];
  };

  const getOverviewStats = () => {
    return [
      {
        icon: "/user.png",
        title: "Total No. of Users",
        count: isRealYear ? "5,423" : isRandomYear ? `${Math.floor(Math.random() * 5000) + 1000}` : "0",
        change: isRealYear ? 16 : isRandomYear ? Math.floor(Math.random() * 20) : 0,
      },
      {
        icon: "/hospitals.png",
        title: "Total No. of Hospitals",
        count: isRealYear ? "1,893" : isRandomYear ? `${Math.floor(Math.random() * 1500) + 200}` : "0",
        change: isRealYear ? -1 : isRandomYear ? Math.floor(Math.random() * 20) - 10 : 0,
      },
      {
        icon: "/diagnostic.png",
        title: "Total No. of Diagnostic Centres",
        count: isRealYear ? "189" : isRandomYear ? `${Math.floor(Math.random() * 300) + 50}` : "0",
        change: isRealYear ? 16 : isRandomYear ? Math.floor(Math.random() * 30) : 0,
      },
    ];
  };

  const getPerformanceData = () => {
    return [
      {
        label: "Beds Booked",
        value: isRealYear ? "1000" : isRandomYear ? `${Math.floor(Math.random() * 1000)}` : "0",
        change: isRealYear ? "+8%" : isRandomYear ? `${Math.floor(Math.random() * 20) - 10}%` : "0%",
        icon: '/bedbooking.png',
        bg: "bg-pink-100",
        iconBg: "#ff6584"
      },
      {
        label: "Total Orders",
        value: isRealYear ? "300" : isRandomYear ? `${Math.floor(Math.random() * 500)}` : "0",
        change: isRealYear ? "+5%" : isRandomYear ? `${Math.floor(Math.random() * 20) - 5}%` : "0%",
        icon: '/totaloders.png',
        bg: "bg-orange-100",
        iconBg: "#ff9f68"
      },
      {
        label: "Medicines Sold",
        value: isRealYear ? "5" : isRandomYear ? `${Math.floor(Math.random() * 20)}` : "0",
        change: isRealYear ? "-12%" : isRandomYear ? `${Math.floor(Math.random() * 20) - 10}%` : "0%",
        icon: '/medicinessold.png',
        bg: "bg-green-100",
        iconBg: "#34d399"
      },
      {
        label: "Home Service",
        value: isRealYear ? "8" : isRandomYear ? `${Math.floor(Math.random() * 30)}` : "0",
        change: isRealYear ? "0.5%" : isRandomYear ? `${(Math.random() * 5).toFixed(1)}%` : "0%",
        icon: '/homeservies.png',
        bg: "bg-purple-100",
        iconBg: "#a78bfa"
      }
    ];
  };

  const getPieData = () => {
    return [
      { name: 'Delhi', value: isRealYear ? 34 : isRandomYear ? Math.floor(Math.random() * 50) : 0, color: '#fb5531' },
      { name: 'Mumbai', value: isRealYear ? 28 : isRandomYear ? Math.floor(Math.random() * 50) : 0, color: '#20c997' },
      { name: 'UP', value: isRealYear ? 16 : isRandomYear ? Math.floor(Math.random() * 50) : 0, color: '#845ef7' },
      { name: 'Gujrat', value: isRealYear ? 23 : isRandomYear ? Math.floor(Math.random() * 50) : 0, color: '#3b82f6' },
    ];
  };

  const getBarData = () => {
    const generate = () => ({
      actual: isRealYear ? 70 : isRandomYear ? Math.floor(Math.random() * 100) : 0,
      expected: isRealYear ? 100 : isRandomYear ? Math.floor(Math.random() * 100) : 0,
    });
    return [
      { name: '17-20', ...generate() },
      { name: '21-25', ...generate() },
      { name: '26-30', ...generate() },
      { name: '31-35', ...generate() },
      { name: '36-40', ...generate() },
      { name: '41-45', ...generate() },
      { name: '50-89', ...generate() },
    ];
  };

  const timeframeOptions = [
    { label: "2025", value: "2025" },
    { label: "2026", value: "2026" },
    { label: "2027", value: "2027" },
    { label: "2028", value: "2028" },
    { label: "2029", value: "2029" },
    { label: "2030", value: "2030" },
  ];

  type BookingData = {
  day: string;
  online: number;
  offline: number;
};


const revenueData = [
  { day: 'Monday', online: 14000, offline: 12000 },
  { day: 'Tuesday', online: 18500, offline: 13500 },
  { day: 'Wednesday', online: 3500, offline: 12500 },
  { day: 'Thursday', online: 23000, offline: 10000 },
  { day: 'Friday', online: 6000, offline: 7000 },
  { day: 'Saturday', online: 13000, offline: 11000 },
  { day: 'Sunday', online: 15000, offline: 9000 },
]

type CardData = {
  title: string;
  subtitle: string;
  amount?: string;
  count?: number;
  percentage: string;
  percentValue: number;
  status?: string;
  showProgress?: boolean;
};

const cardData: CardData[] = [
  {
    title: "Analytics",
    subtitle: "Lorem Ipsum",
    amount: "Rs. 56873.12",
    percentage: "+16%",
    percentValue: 70,
    showProgress: true,
  },
  {
    title: "Ambulance Service",
    subtitle: "Lorem Ipsum",
    count: 89,
    percentage: "+16%",
    percentValue: 0,
    status: "On Route",
    showProgress: false,
  },
];

type HospitalCardData = {
  title: string;
  subtitle: string;
  roomsBooked: number;
  growth: string;
  growthColor: string;
  dateRange: string;
  chartData: { day: string; last6Days: number; lastWeek: number }[];
  vendorId: string;
  vendorName: string;
  hospitalName: string;
  hospitalLocation: string;
};

const cardData1: HospitalCardData[] = [
  {
    title: "Hospital Service",
    subtitle: "Lorem Ipsum",
    roomsBooked: 7852,
    growth: "+2.1%",
    growthColor: "text-green-500",
    dateRange: "1–12 Jan, 2024",
    chartData: [
      { day: "01", last6Days: 10, lastWeek: 8 },
      { day: "02", last6Days: 11, lastWeek: 9 },
      { day: "03", last6Days: 12, lastWeek: 9 },
      { day: "04", last6Days: 9, lastWeek: 8 },
      { day: "05", last6Days: 13, lastWeek: 10 },
      { day: "06", last6Days: 16, lastWeek: 9 },
      { day: "07", last6Days: 10, lastWeek: 8 },
      { day: "08", last6Days: 9, lastWeek: 7 },
      { day: "09", last6Days: 11, lastWeek: 8 },
      { day: "10", last6Days: 12, lastWeek: 9 },
      { day: "11", last6Days: 13, lastWeek: 10 },
      { day: "12", last6Days: 14, lastWeek: 11 },
    ],
    vendorId: "#1234567–YUISOP",
    vendorName: "Lorem Ipsum",
    hospitalName: "Max Speciality Hospital",
    hospitalLocation: "Delhi",
  },
];

const patientInsightsData = [
  { month: "Jan", loyal: 390, new: 350, unique: 410 },
  { month: "Feb", loyal: 370, new: 300, unique: 390 },
  { month: "Mar", loyal: 350, new: 330, unique: 370 },
  { month: "Apr", loyal: 360, new: 340, unique: 360 },
  { month: "May", loyal: 370, new: 350, unique: 350 },
  { month: "Jun", loyal: 390, new: 370, unique: 340 },
  { month: "Jul", loyal: 410, new: 390, unique: 330 },
  { month: "Aug", loyal: 400, new: 410, unique: 320 },
  { month: "Sept", loyal: 300, new: 350, unique: 310 },
  { month: "Oct", loyal: 200, new: 280, unique: 300 },
  { month: "Nov", loyal: 150, new: 220, unique: 290 },
  { month: "Dec", loyal: 100, new: 180, unique: 280 },
];

const statCards = [
  { title: "Lorem Ipsum", value: 13, percentage: "+2.1%", positive: true },
  { title: "Lorem Ipsum", value: 20, percentage: "+23.6%", positive: true },
  { title: "Lorem Ipsum", value: 15, percentage: "-11%", positive: false },
  { title: "Lorem Ipsum", value: 13, percentage: "+2.1%", positive: true },
  { title: "Lorem Ipsum", value: 13, percentage: "+23.6%", positive: true },
  { title: "Lorem Ipsum", value: 13, percentage: "-11%", positive: false },
];


  const [selectedTimeframe, setSelectedTimeframe] = useState("Daily");
  const [open, setOpen] = useState(false);

  return (
  <div className="w-full min-h-screen bg-white overflow-x-hidden">
    <div className="w-full flex flex-col px-4 sm:px-6 lg:px-8 py-6 max-w-[100vw]">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
        {/* Greeting */}
        <div>
          <p className="text-2xl text-gray-500">Hello {adminData.name}!</p>
          <h1 className="text-5xl font-bold">{greeting}</h1>
          <p className="text-xl text-gray-400">{adminData.location}</p>
        </div>
        
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4">
          <select
            className="border rounded-md px-6 py-2"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {timeframeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <button className="bg-gray-100 px-6 py-2 rounded-md text-sm">Export CSV</button>
          <Link href="/dashboard/inventory/hospitals">
            <button className="bg-black text-white px-6 py-2 rounded-full text-sm">Add New +</button>
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-6">
  {getCardsData().map((item) => (
    <SummaryCard key={item.id} item={item} className="w-full h-[400px]" />
  ))}
</div>


      {/* Other sections with responsive spacing */}
      <div className="mt-6">
        <OverviewStats data={getOverviewStats()} />
      </div>

      <div className="mt-6">
        <ChartsSection pieData={getPieData()} barData={getBarData()} />
      </div>

      <div className="mt-6">
        <PerformanceOverview data={getPerformanceData()} />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 w-full">
        <TotalRevenue
          revenueData={revenueData}
          selectedTimeframe={selectedTimeframe}
          setSelectedTimeframe={setSelectedTimeframe}
          timeframes={timeframes}
          open={open}
          setOpen={setOpen}
        />
        <AnalyticsCardList cardData={cardData} />
        <HospitalServiceCards cardData1={cardData1} />
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        <PatientInsightsChart data={patientInsightsData} />
        <StatCardsGrid cards={statCards} />
      </div>
    </div>
  </div>
);

};

export default Dashboard;
