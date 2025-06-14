'use client';
import { useState } from "react";
import Image from "next/image";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
} from 'recharts';
import { Bed, Ambulance, Microscope, Stethoscope, PlusCircle ,Users, CreditCard, UserPlus2} from "lucide-react";
import { ChevronDown } from "lucide-react";
// Services data
const activityData = [
  { project: "Bender project", user1: "Johnson", user2: "Johnson", user3: "Johnson", user4: "Johnson", status: "Inprogress", date: "06 Jan 2024" },
  { project: "Bender project", user1: "Johnson", user2: "Johnson", user3: "Johnson", user4: "Johnson", status: "Onboarding", date: "06 Jan 2024" },
  { project: "Bender project", user1: "Johnson", user2: "Johnson", user3: "Johnson", user4: "Johnson", status: "Completed", date: "06 Jan 2024" },
];

const statusColors: { [key: string]: string } = {
  Inprogress: "bg-black text-white",
  Onboarding: "bg-black text-white",
  Completed: "bg-black text-white",
};
const services = [
  {
    name: "Hospital Bed Booking",
    icon: <Bed className="text-white" size={24} />,
    users: ["/pro.png", "/pro1.png", "+4"],
  },
  {
    name: "Ambulance Service",
    icon: <Ambulance className="text-white" size={24} />,
    users: ["/pro1.png", "/pro.png", "+2"],
  },
  {
    name: "Diagnostic Centres",
    icon: <Microscope className="text-white" size={24} />,
    users: ["/pro.png", "/pro1.png", "+5"],
  },
  {
    name: "Home Service",
    icon: <Stethoscope className="text-white" size={24} />,
    users: ["/pro1.png", "/pro.png", "+2"],
  },
];
const investors = [
  { name: "Mathew Engine", amount: "12.2K" },
  { name: "John Parker", amount: "13.78K" },
  { name: "Salman Khan", amount: "23.8K" },
  { name: "Shivendra Pratap", amount: "54.89K" },
];

const chartData = [
  { date: "Sept 2", revenue: 10, investment: 15 },
  { date: "Sept 5", revenue: 30, investment: 20 },
  { date: "Sept 7", revenue: 15, investment: 30 },
  { date: "Sept 10", revenue: 45, investment: 40 },
  { date: "Sept 12", revenue: 35, investment: 25 },
  { date: "Sept 15", revenue: 30, investment: 35 },
  { date: "Sept 17", revenue: 38, investment: 30 },
  { date: "Sept 20", revenue: 25, investment: 25 },
  { date: "Sept 22", revenue: 35, investment: 28 },
  { date: "Sept 25", revenue: 40, investment: 33 },
  { date: "Sept 27", revenue: 45, investment: 38 },
  { date: "Sept 30", revenue: 20, investment: 25 },
  { date: "Oct 2", revenue: 35, investment: 30 },
];
// Top performers data
const topPerformers = [
  { name: "Kyle Jenner", role: "Employee", image: "/pro1.png" },
  { name: "Robert Kale", role: "Employee", image: "/pro.png" },
  { name: "Tyler John", role: "Employee", image: "/pro1.png" },
  { name: "Tyler John", role: "Employee", image: "/pro.png" },
  { name: "Tyler John", role: "Employee", image: "/pro1.png" },
];
const revenueData = [
  { month: "Jan", revenue: 23000 },
  { month: "Feb", revenue: 12000 },
  { month: "Mar", revenue: 32000 },
  { month: "Apr", revenue: 16000 },
  { month: "May", revenue: 30000 },
  { month: "Jun", revenue: 20000 },
  { month: "Jul", revenue: 33000 },
  { month: "Aug", revenue: 17000 },
  { month: "Sep", revenue: 12000 },
  { month: "Oct", revenue: 22000 },
];

const stats = [
  { label: "Total Investment", value: "12.2 M" },
  { label: "Product Value", value: "13B" },
  { label: "Claimed Investment", value: "520"},
  { label: "Total Hospital Partners", value: "154" },
  { label: "Total Ambulance Partners", value: "2.5M" },
];

export default function DashboardChart() {
    const summaryCards = [
    {
      title: "TOTAL EMPLOYEES",
      value: "8,874",
      description: "Active Workforce in getBeds",
      icon: <Users size={32} />,
    },
    {
      title: "WORKFORCE INVESTMENT",
      value: "Rs. 13.K",
      description: "Total Workforce Compensation",
      icon: <CreditCard size={32} />,
    },
    {
      title: "TOTAL EMPLOYEE TEAMS",
      value: "20",
      description: "Total No. of Teams",
      icon: <UserPlus2 size={32} />,
    },
  ];
  const [selected, setSelected] = useState("Last 30 days");
  const [isOpen, setIsOpen] = useState(false);

  const options = ["Last 30 days", "Last 50 days", "Last 100 days"];

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    // You can trigger chart data update here if needed
  };
  const [currentPage, setCurrentPage] = useState(1);
  const pageCount = 10;
  return (
    <div className="p-10 bg-white rounded-xl shadow">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow p-4 flex items-center space-x-3">
            <div>
              <div className="text-lg font-bold">{stat.value}</div>
              <div className="text-sm text-black">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-md font-semibold">Revenue</h2>
          <span className="text-sm text-gray-400">Year 2020</span>
        </div>

        <ResponsiveContainer width="100%" height={200}>
  <LineChart data={revenueData}>
    <defs>
      <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
        <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.1} />
      </linearGradient>
    </defs>
    <CartesianGrid strokeDasharray="3 3" vertical={false} />
    <XAxis dataKey="month" />
    <YAxis />
    <Tooltip />
    <Line
      type="monotone"
      dataKey="revenue"
      stroke="#3b82f6"
      strokeWidth={2.5}
      fill="url(#lineGradient)"
      dot={{ r: 4, stroke: '#3b82f6', strokeWidth: 2, fill: '#fff' }}
      activeDot={{ r: 6 }}
      isAnimationActive={true}
    />
  </LineChart>
</ResponsiveContainer>


      </div>
      <div className="flex flex-col md:flex-row gap-6 mt-8">
      {/* Left: Services Section (2/3) */}
      <div className="md:w-2/3 w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {summaryCards.map((card, index) => (
        <div
          key={index}
          className="bg-black text-white rounded-xl p-6 flex flex-col items-start justify-between space-y-4 shadow-lg"
        >
          <p className="text-sm text-gray-300 tracking-wide">{card.title}</p>
          <div className="flex items-center gap-4">
            <div className="text-white">{card.icon}</div>
            <div className="text-3xl font-bold">{card.value}</div>
          </div>
          <p className="text-xs text-gray-400">{card.description}</p>
        </div>
      ))}
    </div>



    <div className="bg-white p-6 rounded-xl shadow mt-7">
        <h2 className="text-lg font-semibold mb-4">Services</h2>
        <div className="flex gap-4 flex-wrap">
          {services.map((service, idx) => (
            <div
              key={idx}
              className="bg-gray-100 rounded-xl p-4 max-w-36 flex flex-col items-start space-y-3"
            >
              <div className="bg-black p-2 rounded-full">{service.icon}</div>
              <p className="text-sm font-semibold">{service.name}</p>
              <div className="flex items-center gap-1 mt-auto">
                {service.users.slice(0, 2).map((img, index) => (
                  <Image
                    key={index}
                    src={img}
                    alt="User"
                    width={24}
                    height={24}
                    className="rounded-full border border-white"
                  />
                ))}
                <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full text-black font-medium">
                  {service.users[2]}
                </span>
                <div className="ml-auto bg-gray-300 w-6 h-6 rounded-full flex items-center justify-center text-sm text-black font-bold cursor-pointer">
                  +
                </div>
              </div>
            </div>
          ))}
          {/* Add Service Card */}
          
        </div>
      </div>
          </div>
      {/* Right: Top Performers Section (1/3) */}
      <div className="md:w-1/3 w-full bg-white p-6 rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-md font-semibold">Top Performers</h2>
          <button className="text-sm font-medium text-gray-500 hover:underline">
            View Team (15)
          </button>
        </div>
        <div className="space-y-4">
          {topPerformers.map((person, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src={person.image}
                  alt={person.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium text-sm">{person.name}</p>
                  <p className="text-xs text-gray-400">{person.role}</p>
                </div>
              </div>
              <button className="bg-black text-white px-4 py-1.5 rounded-md text-sm hover:bg-gray-900">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="flex flex-col lg:flex-row gap-4 mt-8   p-6 ">
      {/* Left: Investors List */}
      <div className="bg-white rounded-xl p-5 shadow w-full max-w-xs">
      <h3 className="text-sm font-semibold mb-4 border-b pb-2">Investors</h3>
      <ul className="space-y-3 text-sm">
        {investors.map((inv, index) => (
          <li key={index} className="flex justify-between text-gray-800">
            <span>{inv.name}</span>
            <span className="text-gray-500">{inv.amount}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4 text-sm text-center">
        <button className="text-blue-500 hover:underline">View All (15)</button>
      </div>
    </div>

      {/* Right: Chart Section */}
      <div className="w-full lg:w-3/4 pl-4 bg-white shadow rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Revenue v/s Investment</h3>
          <div className="relative">
      <div
        className="flex items-center text-sm text-gray-600 cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected}
        <ChevronDown className="w-4 h-4 ml-1" />
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-md z-10">
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleSelect(option)}
              className={`px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer ${
                selected === option ? "text-blue-500 font-medium" : "text-gray-700"
              }`}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
        </div>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="revenue" stroke="#000000" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="investment" stroke="#60A5FA" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Stats Summary */}
        <div className="flex justify-between items-center text-sm text-gray-700 mt-6 border-t pt-4">
          <div>
            <p className="font-medium flex items-center">
              <span className="w-2 h-2 rounded-full bg-black mr-2"></span>
              Total Revenue
            </p>
            <p className="text-base font-bold">Rs. 12.2 M</p>
          </div>
          <div>
            <p className="font-medium flex items-center">
              <span className="w-2 h-2 rounded-full bg-blue-400 mr-2"></span>
              Total Investment
            </p>
            <p className="text-base font-bold">Rs. 34.6 M</p>
          </div>
          <div>
            <p className="font-medium">Average Revenue Per day</p>
            <p className="text-base font-bold">Rs. 12.8 K</p>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="px-4 py-3 font-medium">Users</th>
              <th className="px-4 py-3 font-medium">Lorem Ipsum</th>
              <th className="px-4 py-3 font-medium">Lorem Ipsum</th>
              <th className="px-4 py-3 font-medium">Lorem Ipsum</th>
              <th className="px-4 py-3 font-medium">Lorem Ipsum</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {activityData.map((item, index) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-3">{item.project}</td>
                <td className="px-4 py-3">{item.user1}</td>
                <td className="px-4 py-3">{item.user2}</td>
                <td className="px-4 py-3">{item.user3}</td>
                <td className="px-4 py-3">{item.user4}</td>
                <td className="px-4 py-3">
                  <span className={`px-3 py-1 rounded-lg text-xs font-medium ${statusColors[item.status]}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-3">{item.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
        <span>Showing data 1 to 8 of 255K entries</span>
        <div className="flex space-x-1">
          {[1, 2, 3, 4].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded border text-sm ${
                currentPage === page
                  ? "bg-black text-white"
                  : "text-gray-700 bg-white border-gray-300"
              }`}
            >
              {page}
            </button>
          ))}
          <span className="px-2">...</span>
          <button className="w-8 h-8 border border-gray-300 rounded text-gray-700">{pageCount}</button>
          <button className="w-8 h-8 border border-gray-300 rounded text-gray-700">{">"}</button>
        </div>
      </div>
    </div>
    </div>
  );
}
