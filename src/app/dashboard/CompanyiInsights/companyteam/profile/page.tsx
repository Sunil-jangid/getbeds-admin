'use client';

import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

export default function ProfilePage() {
  const params = useSearchParams();

  const name = params.get("name") || "";
  const role = params.get("role") || "";
  const image = params.get("image") || "";
  const location = params.get("location") || "";
  const teamId = params.get("teamId") || "";
  const compensation = params.get("compensation") || "";
  const contact = params.get("contact") || "";
  const dept = params.get("dept") || "";
  const email = params.get("email") || "";
  const yearOfJoin = params.get("yearOfJoin") || "";
  const CTC = params.get("CTC") || "";

  return (
    <div className="p-10">
      {/* Header */}
      <div className='p-6 rounded-lg shadow'>
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-lg font-semibold">{name}</h2>
          <p className="text-sm text-gray-500">{role}</p>
        </div>
      </div>

      {/* Form Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white ">
        {/* Left Column */}
        <div>
          <label className="block text-sm mb-1">Full Name</label>
          <input value={name} readOnly className="w-full p-2 bg-gray-50 border rounded" />

          <label className="block text-sm mt-4 mb-1">ID</label>
          <input value={teamId} readOnly className="w-full p-2 bg-gray-50 border rounded" />

          <label className="block text-sm mt-4 mb-1">Team Details</label>
          <input value={dept} readOnly className="w-full p-2 bg-gray-50 border rounded" />

          <label className="block text-sm mt-4 mb-1">Year of Joining</label>
          <input value={yearOfJoin} readOnly className="w-full p-2 bg-gray-50 border rounded" />
        </div>

        {/* Right Column */}
        <div>
          <label className="block text-sm mb-1">Contact Details</label>
          <input value={contact} readOnly className="w-full p-2 bg-gray-50 border rounded" />

          <label className="block text-sm mt-4 mb-1">location</label>
          <input value={location} readOnly className="w-full p-2 bg-gray-50 border rounded" />

          <label className="block text-sm mt-4 mb-1">Position of Responsibility</label>
          <input value={role} readOnly className="w-full p-2 bg-gray-50 border rounded" />

          <label className="block text-sm mt-4 mb-1">CTC</label>
          <input value={CTC} readOnly className="w-full p-2 bg-gray-50 border rounded" />

        </div>
      </div>

      {/* Email Section */}
      <div className="mt-6">
        <h3 className="text-sm font-semibold mb-1">My Email Address</h3>
        <div className="flex items-center space-x-3  p-3 rounded">
          <div className="w-8 h-8 bg-black text-black rounded-full flex items-center justify-center">✉️</div>
          <div>
            <p className="text-sm">{email}</p>
          </div>
        </div>
        
      </div></div>
    </div>
  );
}
