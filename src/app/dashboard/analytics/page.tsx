"use client";

import React, { useState, useMemo } from "react";

type ViewType = "Monthly" | "Daily" | "Yearly";

const ChartSection: React.FC = () => {
  const [view, setView] = useState<ViewType>("Monthly");
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const labels = useMemo(() => {
    switch (view) {
      case "Monthly":
        return [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
      case "Daily":
        return Array.from({ length: 31 }, (_, i) => (i + 1).toString());
      case "Yearly":
        return Array.from({ length: 8 }, (_, i) => (2020 + i).toString());
      default:
        return [];
    }
  }, [view]);

  const data = useMemo(() => {
    return labels.map(() => Math.floor(Math.random() * 200) + 10);
  }, [labels]);

  return (
    <div className="bg-white rounded-2xl shadow p-6 w-1/3 mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Lorem Ipsum</h2>
        <select
          value={view}
          onChange={(e) => setView(e.target.value as ViewType)}
          className="border rounded-full px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 cursor-pointer"
        >
          <option value="Monthly">Monthly</option>
          <option value="Daily">Daily</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>

      <div className="flex items-end justify-center h-56 gap-2 overflow-x-auto scrollbar-hide">
        {labels.map((label, i) => (
          <div
            key={label}
            className="flex flex-col items-center group"
            onMouseEnter={() => setHoverIndex(i)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <div
              className={`w-4 rounded-t-lg transition-all duration-300 ${
                hoverIndex === i ? "bg-blue-400" : "bg-black"
              }`}
              style={{ height: `${data[i]}px` }}
            ></div>
            <span className="text-xs mt-2">{label}</span>
          </div>
        ))}
      </div>
      
    </div>
    
  );
};

export default ChartSection;
