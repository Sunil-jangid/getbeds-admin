// TicketDashboard.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const dummyData = Array.from({ length: 3 }, (_, i) => ({
  id: `#1234${i}`,
  name: 'John Doe',
  phone: '+91-7865432456',
  email: 'xyz@gmail.com',
  title: 'Poor Service and Expensive',
  message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sodales purus lacinia hendrerit dignissim.',
  status: i < 2 ? 'Active Now' : 'Dismissed',
  date: '18th Nov, 2024',
  expiry: i < 2 ? 'Expiry in 5 days' : '',
}));

export default function TicketDashboard() {
  const [search, setSearch] = useState('');
  const [daysFilter, setDaysFilter] = useState('10');
  const [chatMessages, setChatMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const filteredData = dummyData.filter(item => {
    const term = search.toLowerCase();
    return (
      item.name.toLowerCase().includes(term) ||
      item.id.toLowerCase().includes(term) ||
      item.phone.includes(term) ||
      item.email.toLowerCase().includes(term) ||
      item.status.toLowerCase().includes(term)
    );
  });

  const handleSend = () => {
    if (!input.trim()) return;
    setChatMessages([...chatMessages, input]);
    setInput('');
  };

  return (
    <div className="flex w-full h-full p-12 gap-4">
      {/* Left Side */}
      <div className="w-2/3 space-y-4 overflow-visible">
        <div className="flex justify-between items-center gap-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, ID, number, email, or status"
            className="w-full p-2 border rounded-md"
          />
          <select
            value={daysFilter}
            onChange={(e) => setDaysFilter(e.target.value)}
            className="border rounded-md p-2"
          >
            {[10, 30, 50, 100, 'All'].map(d => (
              <option key={d} value={d}>{d === 'All' ? 'All Days' : `Last ${d} days`}</option>
            ))}
          </select>
        </div>
        <div className="w-full overflow-hidden whitespace-nowrap mb-2">
  <p className="animate-marquee text-gray-600 font-semibold text-sm ml-1">
    Here’s how to increase your service and make your customer’s happy (moving animation)
  </p>
</div>

        {filteredData.map((item, idx) => (
          <div key={idx} className="p-4 rounded-lg shadow-md border">
            <div className="flex items-center gap-4">
              <Image src="/pro.png" alt="profile" width={40} height={40} className="rounded-full" />
              <div>
                <p className="font-semibold">{item.name} <span className="text-gray-400">{item.id}</span></p>
                <p className="text-sm text-gray-500">{item.phone}, {item.email}</p>
              </div>
              <div className="ml-auto text-sm text-white px-2 py-1 rounded-md flex items-center gap-1"
                   style={{ background: item.status === 'Active Now' ? 'red' : 'gray' }}>
                {item.status}
              </div>
            </div>
            <p className="mt-2 text-red-600 font-semibold text-sm">{item.title}</p>
            <p className="text-sm text-gray-600 mt-1">{item.message}</p>
            <div className="mt-2 text-sm font-medium">BOOKING ID: <span className="text-black">{item.id}</span></div>
            <div className="flex justify-between items-center mt-3">
              <div className="flex gap-2 items-center">
                <button className="bg-black text-white px-4 py-1 rounded">View Details</button>
                {item.expiry && <div className="text-red-500 text-sm">{item.expiry}</div>}
              </div>
              <div className="text-gray-400 text-sm">{item.date}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Right Side Chat */}
      
    </div>
  );
}
