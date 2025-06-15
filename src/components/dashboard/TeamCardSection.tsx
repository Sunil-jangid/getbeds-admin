'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface Member {
  name: string;
  role: string;
  image: string;
}

interface TeamCardSectionProps {
  title: string;
  members: Member[];
}

const TeamCardSection: React.FC<TeamCardSectionProps> = ({ title, members }) => {
  const router = useRouter();

  const handleViewProfile = (member: Member) => {
    const query = new URLSearchParams({
      name: member.name,
      role: member.role,
      image: member.image,
    }).toString();
    router.push(`/dashboard/CompanyiInsights/companyteam/profile?${query}`);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow mb-6">
      <h2 className="font-semibold text-sm mb-6">{title}</h2>
      <div className="flex gap-4 overflow-x-auto">
        {members.map((member, index) => (
          <div
            key={index}
            className="bg-[#F6FBFF] w-48 rounded-xl flex flex-col items-center py-6 relative"
          >
            <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
              <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-sm font-semibold">{member.name}</h3>
            <p className="text-xs text-gray-500">{member.role}</p>
            <button
              className="mt-4 bg-black text-white text-sm px-4 py-2 rounded-lg hover:bg-gray-800 transition"
              onClick={() => handleViewProfile(member)}
            >
              View Profile
            </button>
            <div className="absolute top-3 right-3 cursor-pointer">
              <span className="text-xl">⋮</span>
            </div>
          </div>
        ))}

        {/* Add Member Card */}
        <div
          className="bg-[#F6FBFF] w-48 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-blue-50 transition"
          onClick={() => alert("Add Member clicked")}
        >
          <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-2xl mb-2">+</div>
          <p className="text-sm font-semibold">Add Member</p>
        </div>
      </div>
    </div>
  );
};

export default TeamCardSection;
