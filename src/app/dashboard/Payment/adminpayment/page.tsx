'use client';

import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

const sections = [
  { title: 'Bank Details' },
  { title: 'PAN Details' },
  { title: 'GST Details and Taxes' },
  { title: 'TAN Details' },
];

export default function FinancialBankDetails() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isEditingBank, setIsEditingBank] = useState(false);
  const [isEditingPan, setIsEditingPan] = useState(false);
  const [isEditingGst, setIsEditingGst] = useState(false);
  const [hasTanNumber, setHasTanNumber] = useState<null | boolean>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const [bankDetails, setBankDetails] = useState({
    holderName: 'BAPPI LAL PHULKE',
    accountNumber: '63290123893',
    ifsc: 'DBIN0016688',
    bankType: 'Saving DISTRICT BANK OF INDIA',
    bankName: '',
    accountType: '',
  });

  const [panDetails, setPanDetails] = useState({
    holderName: 'BAPPI LAL PHULKE',
    panNumber: 'PPABP4203D',
  });

  const [editBankForm, setEditBankForm] = useState({
    bankName: '',
    accountNumber: '',
    accountType: '',
  });

  const [editPanForm, setEditPanForm] = useState({
    holderName: '',
    panNumber: '',
  });

  const [editGstForm, setEditGstForm] = useState({
    gstNumber: '',
    state: '',
    gstEntityName: '',
  });

  const toggleSection = (title: string) => {
    setActiveSection((prev) => (prev === title ? null : title));
    setIsEditingBank(false);
    setIsEditingPan(false);
    setIsEditingGst(false);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      setActiveSection(null);
      setIsEditingBank(false);
      setIsEditingPan(false);
      setIsEditingGst(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" ref={containerRef}>
      <div className="max-w-6xl mx-auto w-full flex-1 p-8">
        <div>
          <h1 className="text-xl font-bold">John Doe</h1>
          <p className="text-sm text-gray-500">Admin</p>
        </div>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Financial and Bank Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      activeSection === section.title ? 'rotate-180' : ''
                    }`}
                  />
                </div>

                {activeSection === section.title && section.title === 'Bank Details' && (
                  <div className="mt-4 text-sm text-gray-700">
                    {isEditingBank ? (
                      <>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="text-gray-500 font-medium">Bank Name</label>
                            <input
                              type="text"
                              name="bankName"
                              value={editBankForm.bankName}
                              onChange={(e) =>
                                setEditBankForm({ ...editBankForm, bankName: e.target.value })
                              }
                              className="w-full mt-1 border rounded-md p-2 bg-gray-50"
                            />
                          </div>
                          <div>
                            <label className="text-gray-500 font-medium">Account Number</label>
                            <input
                              type="text"
                              name="accountNumber"
                              value={editBankForm.accountNumber}
                              onChange={(e) =>
                                setEditBankForm({ ...editBankForm, accountNumber: e.target.value })
                              }
                              className="w-full mt-1 border rounded-md p-2 bg-gray-50"
                            />
                          </div>
                          <div>
                            <label className="text-gray-500 font-medium">Account Type</label>
                            <input
                              type="text"
                              name="accountType"
                              value={editBankForm.accountType}
                              onChange={(e) =>
                                setEditBankForm({ ...editBankForm, accountType: e.target.value })
                              }
                              className="w-full mt-1 border rounded-md p-2 bg-gray-50"
                            />
                          </div>
                        </div>
                        <div className="flex justify-between text-sky-500 font-medium text-sm underline cursor-pointer">
                          <button
                            onClick={() => {
                              setBankDetails((prev) => ({
                                ...prev,
                                ...editBankForm,
                              }));
                              setIsEditingBank(false);
                            }}
                          >
                            Save
                          </button>
                          <button onClick={() => setIsEditingBank(false)}>Cancel</button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex justify-between flex-wrap">
                          <div>
                            <p className="mb-1 font-semibold">
                              Account Holder Name:{' '}
                              <span className="font-normal">{bankDetails.holderName}</span>
                            </p>
                            <p>
                              Account Number: {bankDetails.accountNumber} | IFSC Code: {bankDetails.ifsc}
                            </p>
                          </div>
                          <div className="text-right text-sm text-gray-500">{bankDetails.bankType}</div>
                        </div>
                        <div className="mt-4 flex justify-between flex-wrap text-sm font-medium text-sky-500 cursor-pointer">
                          <button onClick={() => setIsEditingBank(true)}>CHANGE BANK DETAILS</button>
                          <p>REQUEST TO STOP PAYMENT</p>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {activeSection === section.title && section.title === 'PAN Details' && (
                  <div className="mt-4 text-sm text-gray-700">
                    {isEditingPan ? (
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <label className="text-gray-500 font-medium">PAN Holder Name</label>
                          <input
                            type="text"
                            value={editPanForm.holderName}
                            onChange={(e) =>
                              setEditPanForm({ ...editPanForm, holderName: e.target.value })
                            }
                            className="w-full mt-1 border rounded-md p-2 bg-gray-50"
                          />
                        </div>
                        <div>
                          <label className="text-gray-500 font-medium">PAN Number</label>
                          <input
                            type="text"
                            value={editPanForm.panNumber}
                            onChange={(e) =>
                              setEditPanForm({ ...editPanForm, panNumber: e.target.value })
                            }
                            className="w-full mt-1 border rounded-md p-2 bg-gray-50"
                          />
                        </div>
                        <div className="flex justify-between col-span-2 text-sky-500 font-medium text-sm underline cursor-pointer">
                          <button
                            onClick={() => {
                              setPanDetails(editPanForm);
                              setIsEditingPan(false);
                            }}
                          >
                            Save
                          </button>
                          <button onClick={() => setIsEditingPan(false)}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="mb-1">PAN Holder Name: {panDetails.holderName}</p>
                        <p>Hospital's PAN: {panDetails.panNumber}</p>
                        <div className="mt-4 text-sm font-medium text-sky-500 underline cursor-pointer">
                          <button onClick={() => setIsEditingPan(true)}>CHANGE PAN DETAILS</button>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {activeSection === section.title && section.title === 'GST Details and Taxes' && (
                  <div className="mt-4 text-sm text-gray-700">
                    {isEditingGst ? (
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-gray-500 font-medium">GST Number</label>
                            <input
                              type="text"
                              className="w-full mt-1 border rounded-md p-2 bg-gray-50"
                              value={editGstForm.gstNumber}
                              onChange={(e) => setEditGstForm({ ...editGstForm, gstNumber: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="text-gray-500 font-medium">State</label>
                            <input
                              type="text"
                              className="w-full mt-1 border rounded-md p-2 bg-gray-50"
                              placeholder="Select State"
                              value={editGstForm.state}
                              onChange={(e) => setEditGstForm({ ...editGstForm, state: e.target.value })}
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-gray-500 font-medium">GST Entity Name</label>
                          <input
                            type="text"
                            className="w-full mt-1 border rounded-md p-2 bg-gray-50"
                            value={editGstForm.gstEntityName}
                            onChange={(e) => setEditGstForm({ ...editGstForm, gstEntityName: e.target.value })}
                          />
                        </div>
                        <div className="flex justify-between text-sky-500 font-medium text-sm underline cursor-pointer">
                          <button onClick={() => setIsEditingGst(false)}>Save</button>
                          <button onClick={() => setIsEditingGst(false)}>Cancel</button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="mb-1">Hospital’s GST: 09ABRPJ2035Q1Z1 | State: Uttar Pradesh</p>
                        <p className="mb-4">GST Entity Name: N/A</p>
                        <div className="text-sky-500 font-medium text-sm cursor-pointer">
                          <button onClick={() => setIsEditingGst(true)}>CHANGE GST DETAILS</button>
                          <p className="text-sky-500 ml-4 text-gray-500">- Advance Settings</p>
                          <p className="text-sky-500 ml-4 text-gray-500">- View GST Slabs</p>
                        </div>
                        <p className="mt-4 text-gray-700">
                          These tax slabs are applicable from 18th July 2025 as per Government of India notification
                        </p>
                        <ul className="mt-2 list-disc ml-5 text-gray-700">
                          <li>Less than or equal to 1000: 12%</li>
                          <li>Greater than 1000 and less than or equal to 7500: 12%</li>
                          <li>Greater than 7500: 18%</li>
                        </ul>
                      </>
                    )}
                  </div>
                )}

                {activeSection === section.title && section.title === 'TAN Details' && (
                  <div className="mt-4 text-sm text-gray-700">
                    <p className="mb-4 font-medium">Do you have a TAN number?</p>
                    <div className="flex gap-6">
                      <button
                        onClick={() => setHasTanNumber(false)}
                        className={`font-semibold ${hasTanNumber === false ? 'text-sky-500' : 'text-gray-500'}`}
                      >
                        NO
                      </button>
                      <button
                        onClick={() => setHasTanNumber(true)}
                        className={`font-semibold ${hasTanNumber === true ? 'text-sky-500' : 'text-gray-500'}`}
                      >
                        YES
                      </button>
                    </div>
                  </div>
                )}

                {activeSection === section.title &&
                  !['Bank Details', 'PAN Details', 'GST Details and Taxes', 'TAN Details'].includes(section.title) && (
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

      <div className="flex justify-end mb-10 mt-[-30px] max-w-5xl mx-auto w-full">
        <button className="bg-black text-white px-6 py-2 rounded-md">Save</button>
      </div>
    </div>
  );
}
