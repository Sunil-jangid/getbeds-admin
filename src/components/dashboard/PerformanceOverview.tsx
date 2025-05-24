"use client";

import Image from "next/image";

interface PerformanceItem {
  icon: string;
  label: string;
  value: string;
  change: string;
  bg: string;
}

interface PerformanceOverviewProps {
  data: PerformanceItem[];
}

const PerformanceOverview: React.FC<PerformanceOverviewProps> = ({ data }) => {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold text-[#1C1C45]">Performance Overview</h2>
      <p className="text-sm text-gray-500 mt-1">Today Summary</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {data.map((item, index) => (
          <div
            key={index}
            className={`rounded-2xl p-5 flex justify-between items-center ${item.bg}`}
          >
            <div>
              <p className="text-3xl font-extrabold text-[#1C1C45]">{item.value}</p>
              <p className="text-sm text-[#1C1C45] font-medium mt-1">{item.label}</p>
              <p
                className={`text-xs mt-1 ${
                  item.change.startsWith("-") ? "text-red-500" : "text-green-500"
                }`}
              >
                {item.change} from yesterday
              </p>
            </div>
            <Image src={item.icon} alt={item.label} width={50} height={50} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerformanceOverview;
