import { ResponsiveContainer, BarChart, XAxis, Tooltip, Bar } from "recharts";
import { BsThreeDotsVertical } from "react-icons/bs";

interface HospitalServiceCard {
  title: string;
  subtitle: string;
  roomsBooked: number;
  growth: string;
  growthColor: string;
  dateRange: string;
  chartData: {
    day: string;
    last6Days: number;
    lastWeek: number;
  }[];
  vendorId: string;
  vendorName: string;
  hospitalName: string;
  hospitalLocation: string;
}


interface HospitalServiceCardsProps {
  cardData1: HospitalServiceCard[];
}

const HospitalServiceCards: React.FC<HospitalServiceCardsProps> = ({ cardData1 }) => (
  <div className="lg:col-span-4 flex flex-col h-full">
    {cardData1.map((card, index) => (
      <div key={index} className="bg-white rounded-2xl p-4 shadow-md space-y-4 flex flex-col h-full">
        <div className="flex justify-between">
          <div>
            <h3 className="font-semibold text-gray-800">{card.title}</h3>
            <p className="text-sm text-gray-400">{card.subtitle}</p>
          </div>
          <BsThreeDotsVertical className="text-gray-400" />
        </div>
        <div>
          <p className="text-sm text-gray-500 font-medium">Rooms booked</p>
          <h2 className="text-3xl font-bold text-gray-900">Total {card.roomsBooked}</h2>
          <div className="flex items-center space-x-2 mt-1">
            <span className={`text-sm ${card.growthColor}`}>↑ {card.growth}</span>
            <span className="text-xs text-gray-400">vs last week</span>
          </div>
          <p className="text-xs text-gray-400 mt-1">Sales from {card.dateRange}</p>
        </div>
        <div className="h-36 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={card.chartData}>
              <XAxis dataKey="day" axisLine={false} tickLine={false} fontSize={10} />
              <Tooltip />
              <Bar dataKey="last6Days" fill="#74C0FC" radius={[4, 4, 0, 0]} />
              <Bar dataKey="lastWeek" fill="#000000" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="text-sm text-gray-400 flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-[#74C0FC] rounded-full" />
            <span>Last 6 days</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 bg-black rounded-full" />
            <span>Last Week</span>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500">Vendor ID</p>
          <p className="text-md font-bold text-gray-900">{card.vendorId}</p>
          <p className="text-sm text-gray-400 mt-1">{card.vendorName}</p>
          <p className="text-sm font-semibold text-indigo-900">{card.vendorName}</p>
        </div>
        <div className="bg-gray-100 rounded-full p-2 flex items-center gap-2 mt-2">
          <div className="bg-black text-white p-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 15c2.485 0 4.779.682 6.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p className="text-xs text-gray-500">Hospital Name</p>
            <p className="text-sm font-semibold text-gray-800">{card.hospitalName}, {card.hospitalLocation}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);

export default HospitalServiceCards;
