import { CircularProgressbarWithChildren, buildStyles } from "react-circular-progressbar";
import { BsThreeDots } from "react-icons/bs";

interface AnalyticsCard {
  title: string;
  subtitle: string;
  showProgress?: boolean;
  percentValue?: number;
  amount?: string;
  count?: number;
  percentage: string;
  status?: string;
}

interface AnalyticsCardListProps {
  cardData: AnalyticsCard[];
}

const AnalyticsCardList: React.FC<AnalyticsCardListProps> = ({ cardData }) => (
  <div className="lg:col-span-3 flex flex-col gap-4 h-full">
    {cardData.map((card, idx) => (
      <div key={idx} className="flex-1">
        <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between h-full">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-sm font-medium text-gray-600">{card.title}</h3>
              <p className="text-xs text-gray-400">{card.subtitle}</p>
            </div>
            <button className="text-gray-400 text-xl">
              <BsThreeDots />
            </button>
          </div>
          {card.showProgress ? (
            <div className="w-24 mx-auto my-4">
              <CircularProgressbarWithChildren
                value={card.percentValue || 0}
                strokeWidth={10}
                styles={buildStyles({ pathColor: '#74C0FC', trailColor: '#e6e6e6' })}
              >
                <div className="text-center text-sm font-semibold text-gray-800">{card.amount}</div>
              </CircularProgressbarWithChildren>
            </div>
          ) : (
            <div className="text-center my-6 text-4xl font-bold text-black">{card.count}</div>
          )}
          <div className="text-center text-sm text-green-600 font-medium mb-2">
            ↑ {card.percentage} <span className="text-gray-500">this month</span>
          </div>
          {card.status && (
            <div className="flex items-center justify-center mt-auto">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2 ring-2 ring-green-200" />
              <span className="text-sm text-gray-700">{card.status}</span>
            </div>
          )}
        </div>
      </div>
    ))}
  </div>
);

export default AnalyticsCardList;
