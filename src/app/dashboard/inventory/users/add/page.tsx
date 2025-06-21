"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";

type UserData = {
  uid: string;
  name: string;
  location: string;
  serviceId: string;
  paymentAmount: string;
  serviceType: string;
  hospitalVisited: string;
};

export default function AddOrEditUser() {
  const searchParams = useSearchParams();
  const [userData, setUserData] = useState<UserData>({
    uid: "",
    name: "",
    location: "",
    serviceId: "",
    paymentAmount: "",
    serviceType: "",
    hospitalVisited: "",
  });

  const isEditMode = Boolean(userData.name?.trim());

  useEffect(() => {
    const data = searchParams.get("data");
    if (data) {
      try {
        const parsed = JSON.parse(decodeURIComponent(data));
        setUserData({
          uid: parsed.uid || "",
          name: parsed.name || "",
          location: parsed.location || "",
          serviceId: parsed.serviceId || "",
          paymentAmount: parsed.paymentAmount || "",
          serviceType: parsed.serviceType || "",
          hospitalVisited: parsed.hospitalVisited || "",
        });
      } catch (error) {
        console.error("Invalid query data", error);
      }
    }
  }, [searchParams]);

  const handleChange = (field: keyof UserData, value: string) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (isEditMode) {
      console.log("Editing user:", userData);
      // TODO: handle edit submission
    } else {
      console.log("Adding new user:", userData);
      // TODO: handle add submission
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="bg-white p-6 rounded-md">
        <h1 className="text-xl font-semibold mb-6">
          {isEditMode ? userData.name : "Add User"}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm mb-1 font-medium">User ID</label>
            <input
              type="text"
              value={userData.uid}
              onChange={e => handleChange("uid", e.target.value)}
              className="w-full border rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">Full Name</label>
            <input
              type="text"
              value={userData.name}
              onChange={e => handleChange("name", e.target.value)}
              className="w-full border rounded px-4 py-2"
            />
          </div>

          <div className="relative">
            <label className="block text-sm mb-1 font-medium">Address</label>
            <input
              type="text"
              value={userData.location}
              onChange={e => handleChange("location", e.target.value)}
              className="w-full border rounded pl-4 pr-10 py-2"
            />
            <MapPin className="absolute right-3 top-9 h-5 w-5 text-gray-400" />
          </div>

          <div className="relative">
            <label className="block text-sm mb-1 font-medium">Phone No.</label>
            <input
              type="text"
              value={userData.serviceType}
              onChange={e => handleChange("serviceType", e.target.value)}
              className="w-full border rounded pl-4 pr-10 py-2"
            />
            <Phone className="absolute right-3 top-9 h-5 w-5 text-gray-400" />
          </div>

          <div className="relative md:col-span-2">
            <label className="block text-sm mb-1 font-medium">Email</label>
            <input
              type="text"
              value={userData.paymentAmount}
              onChange={e => handleChange("paymentAmount", e.target.value)}
              className="w-full border rounded pl-4 pr-10 py-2"
            />
            <Mail className="absolute right-3 top-9 h-5 w-5 text-gray-400" />
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">Service ID</label>
            <input
              type="text"
              value={userData.serviceId}
              onChange={e => handleChange("serviceId", e.target.value)}
              className="w-full border rounded px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">Hospital Visited</label>
            <input
              type="text"
              value={userData.hospitalVisited}
              onChange={e => handleChange("hospitalVisited", e.target.value)}
              className="w-full border rounded px-4 py-2"
            />
          </div>
        </div>

        <div className="text-right">
          <button
            onClick={handleSubmit}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 transition"
          >
            {isEditMode ? "Edit" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
