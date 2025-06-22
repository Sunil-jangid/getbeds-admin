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
    <section className="w-full py-2 ">
      <div className="flex flex-wrap justify-center sm:justify-between items-center gap-4 bg-white rounded-lg shadow-md p-5 w-full">
        {data.map((item, index) => (
  <div
    key={index}
    className="flex items-start gap-3 w-full sm:basis-[calc(50%-1rem)] lg:basis-[calc(33.33%-1rem)] xl:basis-[calc(25%-1rem)]"
  >
    <div className="bg-black rounded-full p-2 sm:p-3 flex-shrink-0">
      <Image
        src={item.icon}
        alt="icon"
        width={36}
        height={36}
        className="object-contain"
      />
    </div>
    <div className="flex flex-col">
      <h4 className="text-xs font-medium text-gray-500">{item.title}</h4>
      <p className="text-lg font-bold text-gray-900">{item.count}</p>
      <p
        className={`text-xs mt-0.5 ${
          item.change >= 0 ? "text-green-600" : "text-red-600"
        }`}
      >
        {item.change >= 0 ? "↑" : "↓"} {Math.abs(item.change)}%
        <span className="text-gray-500"> this month</span>
      </p>
    </div>
  </div>
))}

      </div>
    </section>
  );
};

export default OverviewStats;
