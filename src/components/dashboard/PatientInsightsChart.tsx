import React from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface PatientData {
  month: string;
  loyal: number;
  new: number;
  unique: number;
}

interface Props {
  data: PatientData[];
}

const PatientInsightsChart: React.FC<Props> = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Patient Insights</h2>
        <div className="text-xl cursor-pointer">•••</div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="loyal" stroke="#A020F0" name="Loyal Patients" />
          <Line type="monotone" dataKey="new" stroke="#FF4C61" name="New Patients" />
          <Line type="monotone" dataKey="unique" stroke="#32CD32" name="Unique Patients" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PatientInsightsChart;
