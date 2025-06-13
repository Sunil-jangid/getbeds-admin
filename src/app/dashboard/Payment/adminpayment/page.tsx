'use client';

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const sections = [
  { title: "Bank Details" },
  { title: "PAN Details" },
  { title: "GST Details and Taxes" },
  { title: "TAN Details" },
];

export default function FinancialBankDetails() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Bank details state
  const [bankDetails, setBankDetails] = useState({
    holderName: "BAPPI LAL PHULKE",
    accountNumber: "63290123893",
    ifsc: "DBIN0016688",
    bankType: "Saving DISTRICT BANK OF INDIA",
    bankName: "",
    accountType: "",
  });

  // Temp state for editable form
  const [editForm, setEditForm] = useState({
    bankName: "",
    accountNumber: "",
    accountType: "",
  });

  const toggleSection = (title: string) => {
    setActiveSection((prev) => (prev === title ? null : title));
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setBankDetails((prev) => ({
      ...prev,
      bankName: editForm.bankName,
      accountNumber: editForm.accountNumber,
      accountType: editForm.accountType,
    }));
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="max-w-6xl mx-auto w-full flex-1 p-8">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold">John Doe</h1>
          <p className="text-sm text-gray-500">Admin</p>
        </div>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Financial and Bank Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {sections.map((section) => (
              <div key={section.title} className="bg-white rounded-lg shadow p-7 flex-1">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection(section.title)}
                >
                  <h3 className="font-semibold text-xl text-[#2d1e5f]">{section.title}</h3>
                  <ChevronDown
                    className={`transition-transform duration-200 ${
                      activeSection === section.title ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {/* BANK DETAILS */}
                {activeSection === section.title && section.title === "Bank Details" && (
                  <div className="mt-4 text-sm text-gray-700">
                    {isEditing ? (
                      <>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="text-gray-500 font-medium">Bank Name</label>
                            <input
                              type="text"
                              name="bankName"
                              value={editForm.bankName}
                              onChange={handleEditChange}
                              className="w-full mt-1 border rounded-md p-2 bg-gray-50"
                            />
                          </div>
                          <div>
                            <label className="text-gray-500 font-medium">Account Number</label>
                            <input
                              type="text"
                              name="accountNumber"
                              value={editForm.accountNumber}
                              onChange={handleEditChange}
                              className="w-full mt-1 border rounded-md p-2 bg-gray-50"
                            />
                          </div>
                          <div>
                            <label className="text-gray-500 font-medium">Account Type</label>
                            <input
                              type="text"
                              name="accountType"
                              value={editForm.accountType}
                              onChange={handleEditChange}
                              className="w-full mt-1 border rounded-md p-2 bg-gray-50"
                            />
                          </div>
                        </div>
                        <div className="flex justify-between text-sky-500 font-medium text-sm underline cursor-pointer">
                          <button onClick={handleSave}>Save</button>
                          <button onClick={() => setIsEditing(false)}>Cancel</button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between flex-wrap">
                          <div>
                            <p className="mb-1 font-semibold">
                              Account Holder Name:{" "}
                              <span className="font-normal">{bankDetails.holderName}</span>
                            </p>
                            <p>
                              Account Number: {bankDetails.accountNumber} | IFSC Code: {bankDetails.ifsc}
                            </p>
                          </div>
                          <div className="text-right text-sm text-gray-500">
                            {bankDetails.bankType}
                          </div>
                        </div>
                        <div className="mt-4 flex justify-between flex-wrap text-sm font-medium text-sky-500 underline cursor-pointer">
                          <button onClick={() => setIsEditing(true)}>CHANGE BANK DETAILS</button>
                          <p>REQUEST TO STOP PAYMENT</p>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* OTHER SECTIONS */}
                {activeSection === section.title && section.title !== "Bank Details" && (
                  <div className="mt-4 text-sm text-gray-600 grid grid-cols-2 gap-2">
                    <div className="bg-gray-100 p-2 rounded">Demo 1</div>
                    <div className="bg-gray-100 p-2 rounded">Demo 2</div>
                    <div className="bg-gray-100 p-2 rounded">Demo 3</div>
                    <div className="bg-gray-100 p-2 rounded">Demo 4</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6 max-h-[10px]">
            <div className="bg-white rounded-lg shadow p-4 flex-1">
              <p className="font-semibold">Address :</p>
              <p className="text-sm text-gray-500">Noida, India</p>
            </div>
            <div className="bg-white rounded-lg shadow p-4 flex-1 space-y-2">
              <p className="font-semibold">Agreement & Other Documents</p>
              <p className="text-sm text-gray-500">Domestic Hospital Agreements</p>
              <p className="font-semibold text-sm">History of updated mode</p>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mb-10 mt-[-30px] max-w-5xl mx-auto w-full">
        <button className="bg-black text-white px-6 py-2 rounded-md">Save</button>
      </div>
    </div>
  );
}
