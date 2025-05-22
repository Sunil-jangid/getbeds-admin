import React from 'react';

type NotificationCardProps = {
  title: string;
  message?: string;
  date: string;
  showButtons?: boolean;
};

const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  message,
  date,
  showButtons = false,
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-6 flex items-start space-x-6 w-full min-h-[160px]">
      <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0"></div>
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
          <span className="text-sm text-gray-400">{date}</span>
        </div>
        {message && <p className="text-sm text-gray-700 mt-2">{message}</p>}
        <div className="mt-4 flex gap-3">
          <button className="text-sm bg-gray-200 text-black px-4 py-2 rounded-md hover:bg-gray-300 transition">
            View More
          </button>
          {showButtons && (
            <button className="text-sm bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition">
              Manage
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationCard;
