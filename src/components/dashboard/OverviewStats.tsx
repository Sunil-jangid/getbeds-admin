// components/dashboard/OverviewStats.tsx
"use client";

import Image from "next/image";

interface OverviewItem {
  icon: string;
  title: string;
  count: string;
  change: number;
}

interface OverviewStatsProps {
  data: OverviewItem[];
}

const OverviewStats = ({ data }: OverviewStatsProps) => {
  return (
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
  );
};

export default OverviewStats;
