import React from 'react';
import NotificationCard from '../../../components/dashboard/NotificationCard';

const notificationData = [
  {
    title: 'Lorem ipsum dolor sit amet?',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sodales purus lacinia hendrerit dignissim. Ut sodales lacus vel velit posuere ultrices. Curabitur efficitur congue porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sodales purus lacinia hendrerit dignissim. Ut sodales lacus vel velit posuere ',
    date: 'Today',
    showButtons: true,
  },
  {
    title: 'Only title with View More button',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sodales purus lacinia hendrerit dignissim. Ut sodales lacus vel velit posuere ultrices. Curabitur efficitur congue porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sodales purus lacinia hendrerit dignissim. Ut sodales lacus vel velit posuere ',
    date: 'Today',
    showButtons: false,
  },
  {
    title: 'Message but no Manage button',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sodales purus lacinia hendrerit dignissim. Ut sodales lacus vel velit posuere ultrices. Curabitur efficitur congue porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sodales purus lacinia hendrerit dignissim. Ut sodales lacus vel velit posuere ',
    date: 'Today',
    showButtons: false,
  },
  {
    title: 'Both buttons, no message',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sodales purus lacinia hendrerit dignissim. Ut sodales lacus vel velit posuere ultrices. Curabitur efficitur congue porttitor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sodales purus lacinia hendrerit dignissim. Ut sodales lacus vel velit posuere ',
    date: 'Today',
    showButtons: true,
  },
];

const NotificationList: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 px-6">
      {notificationData.map((notif, index) => (
        <NotificationCard
          key={index}
          title={notif.title}
          message={notif.message}
          date={notif.date}
          showButtons={notif.showButtons}
        />
      ))}
    </div>
  );
};

export default NotificationList;