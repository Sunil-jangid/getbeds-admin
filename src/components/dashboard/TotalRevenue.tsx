import { ResponsiveContainer, BarChart, XAxis, YAxis, Tooltip, Legend, Bar } from "recharts";

import { Dispatch, SetStateAction } from 'react';

interface RevenueDataItem {
  day: string;
  online: number;
  offline: number;
}

interface TotalRevenueProps {
  revenueData: RevenueDataItem[];
  selectedTimeframe: string;
  setSelectedTimeframe: Dispatch<SetStateAction<string>>;
  timeframes: string[];
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const TotalRevenue: React.FC<TotalRevenueProps> = ({
  revenueData,
  selectedTimeframe,
  setSelectedTimeframe,
  timeframes,
  open,
  setOpen,
}) => {
  return (
    <div className="lg:col-span-5 flex flex-col h-full">
      <div className="bg-white rounded-2xl shadow-md p-4 md:p-6 w-full relative flex flex-col h-full">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Total Revenue</h2>
            <p className="text-sm text-gray-400">Lorem Ipsum</p>
          </div>
          <div className="relative">
            <button
              className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm"
              onClick={() => setOpen((prev) => !prev)}
            >
              {selectedTimeframe} <span className="ml-1">▾</span>
            </button>
            {open && (
              <ul className="absolute right-0 mt-1 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                {timeframes.map((frame) => (
                  <li
                    key={frame}
                    onClick={() => {
                      setSelectedTimeframe(frame);
                      setOpen(false);
                    }}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    {frame}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData} barSize={20}>
            <XAxis dataKey="day" tickLine={false} axisLine={false} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(val) => `${val / 1000}k`}
            />
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
            <Bar dataKey="online" fill="#a5d8ff" name="Online Bookings" radius={[4, 4, 0, 0]} />
            <Bar dataKey="offline" fill="#000000" name="Offline Bookings" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TotalRevenue;
