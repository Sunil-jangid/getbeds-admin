import React from 'react';
import { Button } from '@/components/ui/button';
import { CardNotification } from '@/components/ui/card';

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
    <CardNotification>
      <div className="w-16 h-16 bg-gray-300 rounded-full flex-shrink-0"></div>
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg text-gray-900">{title}</h3>
          <span className="text-sm text-gray-400">{date}</span>
        </div>
        {message && <p className="text-sm text-gray-700 mt-2">{message}</p>}
        <div className="mt-4 flex gap-3">
          <Button variant="customViewMore" size="sm">
            View More
          </Button>

        {showButtons && (
            <Button variant="customManage" size="sm">
            Manage
            </Button>
        )}
        </div>
      </div>
    </CardNotification>
  );
};

export default NotificationCard;
