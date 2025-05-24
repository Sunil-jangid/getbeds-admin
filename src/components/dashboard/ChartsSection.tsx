// components/dashboard/ChartsSection.tsx

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

type PieEntry = {
  name: string;
  value: number;
  color: string;
};

type BarEntry = {
  name: string;
  actual: number;
  expected: number;
};

type Props = {
  pieData: PieEntry[];
  barData: BarEntry[];
};

const ChartsSection = ({ pieData, barData }: Props) => {
  return (
    <div className="grid lg:grid-cols-3 gap-6 mt-6">
      {/* Pie Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Area Wise Bookings</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-4 flex flex-col gap-2">
          {pieData.map((entry, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              ></div>
              <span className="text-sm text-gray-700">{entry.name}</span>
              <span className="ml-auto font-semibold text-gray-900">{entry.value} Bookings</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md col-span-2">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Inventory v/s Utilization</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData} barSize={30}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="actual" fill="#93c5fd" name="Actual" />
            <Bar dataKey="expected" fill="#000000" name="Expected" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartsSection;
