import React from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

// Props for each stat card
interface StatCardProps {
  title: string;
  value: number;
  percentage: string;
  positive: boolean;
}

// Individual stat card component
const StatCard: React.FC<StatCardProps> = ({ title, value, percentage, positive }) => {
  return (
    <div className="bg-white px-4 py-3 rounded-xl shadow flex flex-col justify-between h-full">
      <div>
        <p className="text-xs text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold">{value}</h3>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className={`flex items-center text-xs font-semibold ${positive ? "text-green-500" : "text-red-500"}`}>
          {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {percentage}
        </div>
        <button className="bg-violet-100 text-violet-600 text-xs px-2 py-1 rounded-md hover:bg-violet-200 transition">
          View More
        </button>
      </div>
    </div>
  );
};

// Props for the grid of stat cards
interface StatCardsGridProps {
  cards: StatCardProps[];
}

// Stat card grid wrapper
const StatCardsGrid: React.FC<StatCardsGridProps> = ({ cards }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {cards.map((card, index) => (
        <StatCard key={index} {...card} />
      ))}
    </div>
  );
};

export default StatCardsGrid;
