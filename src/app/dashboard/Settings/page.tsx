'use client';

import { useState } from "react";

const navItems = [
  "Manage Admin Accounts",
  "Manage About Us",
  "Manage Terms & Conditions",
  "Manage Policies",
  "Payment Gateway Settings",
  "Audit Logs",
] as const;

type NavKey = typeof navItems[number];

type Field = { label: string; value: string };

const initialContent: Record<NavKey, Field[]> = {
  "Manage Admin Accounts": [
    { label: "Full Name", value: "John Doe" },
    { label: "Email Address", value: "john.doe@example.com" },
    { label: "Phone Number", value: "+91 9876543210" },
    { label: "Account Status", value: "Active" },
  ],
  "Manage About Us": [
    { label: "Bio", value: "Tech enthusiast with a passion for learning." },
    { label: "Age", value: "28" },
    { label: "Gender", value: "Male" },
    { label: "Location", value: "Bangalore, India" },
    { label: "Preferred Language", value: "English" },
  ],
  "Manage Terms & Conditions": [
    { label: "Accepted Terms", value: "Yes" },
    { label: "Accepted Date", value: "2024-05-18" },
    { label: "Document Version", value: "v1.4" },
    { label: "Consent Type", value: "Digital Signature" },
    { label: "Privacy Consent", value: "Yes" },
  ],
  "Manage Policies": [
    { label: "Notification Preference", value: "Email" },
    { label: "Two-Factor Auth", value: "Enabled" },
    { label: "Recovery Email", value: "alt.doe@example.com" },
    { label: "Password Reset Allowed", value: "Yes" },
    { label: "Account Lock Status", value: "Not Locked" },
  ],
  "Payment Gateway Settings": [
    { label: "Card Holder Name", value: "John Doe" },
    { label: "Card Type", value: "Visa" },
    { label: "Last 4 Digits", value: "1234" },
    { label: "Billing Address", value: "221B Baker Street" },
    { label: "Country", value: "India" },
  ],
  "Audit Logs": [
    { label: "Last Login", value: "2025-06-12 11:30 AM" },
    { label: "Last Password Change", value: "2025-05-01" },
    { label: "Login IP", value: "192.168.1.45" },
    { label: "Device", value: "Chrome on Windows" },
    { label: "Failed Logins", value: "0" },
  ],
};

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<NavKey>("Manage Admin Accounts");

  // Store editable state for two tabs only
  const [editableData, setEditableData] = useState({
    "Manage Admin Accounts": [...initialContent["Manage Admin Accounts"]],
    "Manage About Us": [...initialContent["Manage About Us"]],
  });

  const isEditable = activeTab === "Manage Admin Accounts" || activeTab === "Manage About Us";

  const handleChange = (index: number, value: string) => {
    if (!isEditable) return;
    const updated = [...editableData[activeTab]];
    updated[index].value = value;
    setEditableData((prev) => ({
      ...prev,
      [activeTab]: updated,
    }));
  };

  const handleReset = () => {
    if (!isEditable) return;
    setEditableData((prev) => ({
      ...prev,
      [activeTab]: [...initialContent[activeTab]],
    }));
  };

  const handleUpdate = () => {
    if (!isEditable) return;
    console.log("Updated values for", activeTab, editableData[activeTab]);
    // Add API call or toast here
  };

  return (
    <div className="min-h-screen bg-white p-10">
      {/* Nav Tabs */}
      <div className="flex flex-wrap space-x-4 border-b border-gray-200 pb-2">
        {navItems.map((item) => (
          <button
            key={item}
            onClick={() => setActiveTab(item)}
            className={`pb-2 text-sm font-medium ${
              activeTab === item
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-600"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Form Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {(isEditable ? editableData[activeTab] : initialContent[activeTab]).map(
          (field, index) => (
            <div key={index} className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              <input
                type="text"
                value={field.value}
                onChange={(e) => handleChange(index, e.target.value)}
                readOnly={!isEditable}
                className={`w-full rounded-md border px-4 py-2 text-sm ${
                  isEditable
                    ? "border-gray-300 bg-white"
                    : "border-gray-200 bg-gray-100"
                }`}
              />
            </div>
          )
        )}
      </div>

      {/* Buttons */}
      {isEditable && (
        <div className="mt-10 flex space-x-4">
          <button
            className="bg-black text-white px-6 py-2 rounded-full text-sm"
            onClick={handleUpdate}
          >
            Update Settings
          </button>
          <button
            className="text-gray-500 text-sm"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
}
