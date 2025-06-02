"use client";

import TotalPatientsChart, {
  Hospital,
} from "@/components/dashboard/SummaryCardnumber";

import RevenueChart from "@/components/dashboard/RevenueChart";

type DataPoint = { label: string; revenue: number };

const insertSpikes = (data: DataPoint[]) => {
  if (data.length > 3) data[2].revenue += 10000;
  if (data.length > 6) data[6].revenue += 12000;
  return data;
};

const generateDataset = (labels: string[]): DataPoint[] => {
  return insertSpikes(
    labels.map((label) => ({
      label,
      revenue: Math.floor(Math.random() * 8000 + 200),
    }))
  );
};

const hospitalInfoData1 = {
  total: 12890,
  onboarded: 70,
  notOnboarded: 30,
};

const dailyLabels = Array.from({ length: 24 }, (_, i) => `${i + 1} ${i < 11 ? "AM" : "PM"}`);
const weeklyLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthlyLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const yearlyLabels = Array.from({ length: 20 }, (_, i) => `${2005 + i}`);

const datasets = {
  Daily: generateDataset(dailyLabels),
  Weekly: generateDataset(weeklyLabels),
  Monthly: generateDataset(monthlyLabels),
  Yearly: generateDataset(yearlyLabels),
};

const summaryCardData = [
  {
    title: "Average Order Value",
    value: "Rs. 12,345,789",
    percentageChange: "+ 2.0%",
    isPositive: true,
  },
];

const hospitalData1 = {
  total: 12890,
  onboarded: 70,
  notOnboarded: 30,
};

// ✅ Hospital Data
const hospitalData: Hospital[] = [
  {
    name: "Max Super Speciality Hospital",
    earnings: "Rs. 54,967",
    isPositive: true,
    color: "bg-green-500",
  },
  {
    name: "Lorem Ipsum",
    earnings: "Rs. 34,567",
    isPositive: false,
    color: "bg-red-400",
  },
  {
    name: "GTR New Hospital",
    earnings: "Rs. 22,456",
    isPositive: true,
    color: "bg-green-500",
  },
  {
    name: "Medanta City Hospital",
    earnings: "Rs. 11,567",
    isPositive: false,
    color: "bg-red-400",
  },
  {
    name: "Lorem Ipsum",
    earnings: "Rs. 10,567",
    isPositive: false,
    color: "bg-red-400",
  },
];

// ✅ TotalPatientsChart sample data
const patientRevenueChartData = [
  { name: "Jan", patients: 100, revenue: 90 },
  { name: "Feb", patients: 60, revenue: 50 },
  { name: "Mar", patients: 80, revenue: 95 },
  { name: "Apr", patients: 70, revenue: 110 },
  { name: "May", patients: 40, revenue: 60 },
  { name: "Jun", patients: 90, revenue: 50 },
  { name: "Jul", patients: 95, revenue: 100 },
  { name: "Aug", patients: 60, revenue: 50 },
  { name: "Sep", patients: 75, revenue: 90 },
  { name: "Oct", patients: 85, revenue: 110 },
  { name: "Nov", patients: 90, revenue: 50 },
  { name: "Dec", patients: 90, revenue: 50 },
];

const earningsData = {
    yearly: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      thisMonth: [150, 300, 450, 700, 280, 850, 290, 540, 290, 950, 120, 560],
      lastMonth: [420, 10, 330, 900, 1000, 650, 565, 720, 300, 0, 950, 780],
    },
    monthly: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      thisMonth: [210, 380, 300, 450, 700, 620, 510],
      lastMonth: [120, 320, 280, 610, 580, 740, 690],
    },
    daily: {
      labels: ['12 AM', '3 AM', '6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM'],
      thisMonth: [50, 40, 60, 20, 40, 35, 30, 25],
      lastMonth: [30, 45, 55, 18, 37, 30, 28, 22],
    },
  };

export default function Home() {
  return (
    <div className="p-8 bg-gray-100 min-h-screen space-y-10">
      {/* Revenue Chart */}
      <RevenueChart datasets={datasets} />

      {/* Total Patients vs Revenue Chart */}
      {summaryCardData.map((card, index) => (
      <TotalPatientsChart
        data={patientRevenueChartData}
        totalPatients={615}
        totalRevenue="Rs. 1,82,569"
        hospitals={hospitalData} 
        key={index} data1={card}
        data2={hospitalInfoData1}
        data3={earningsData}
      />
      ))}

      {/* Summary Cards */}
      
        
        

    </div>
  );
}
