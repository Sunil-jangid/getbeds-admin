'use client';

import { useSearchParams } from "next/navigation";

export default function ProfilePage() {
  const params = useSearchParams();
  const name = params.get("name");
  const role = params.get("role");
  const image = params.get("image");

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Profile Details</h1>
      <div className="bg-white shadow p-6 rounded-lg w-64">
        <img src={image || ""} alt={name || ""} className="w-24 h-24 rounded-full object-cover mb-4" />
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-gray-500">{role}</p>
      </div>
    </div>
  );
}
