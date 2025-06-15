'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Pencil, Trash2 } from 'lucide-react';
import TeamCardSection from '../../../../components/dashboard/TeamCardSection';

// All team data
const techMembers = [
  { name: "Kyle Jenner", role: "Manager", image: "/pro1.png" },
  { name: "Robert Kale", role: "Technical Head", image: "/pro.png" },
  { name: "Kristin Watson", role: "Senior Developer", image: "/pro1.png" },
  { name: "Jerome Bell", role: "Senior Developer", image: "/pro2.png" },
  { name: "Dianne Russell", role: "Junior Developer", image: "/pro3.png" },
];

const companyheads = [
  { name: "Jerome Bell", role: "CEO", image: "/pro1.png" },
  { name: "Dianne Russell", role: "CTO", image: "/pro2.png" },
  { name: "Robert Kale", role: "Technical Head", image: "/pro3.png" },
];

const operationsteam = [
  { name: "Jerome Bell", role: "Network", image: "/pro.png" },
  { name: "Dianne Russell", role: "Manager", image: "/pro3.png" },
];

const salesmarketingteam = [
  { name: "Jerome Bell", role: "Sales", image: "/pro2.png" },
  { name: "Dianne Russell", role: "Marketing", image: "/pro.png" },
  { name: "Robert Kale", role: "Technical Head", image: "/pro1.png" },
];

const recruitmenthrteam = [
  { name: "Jerome Bell", role: "HR", image: "/pro1.png" },
  { name: "Dianne Russell", role: "HR", image: "/pro2.png" },
];

// Employee compensation data (mapped to roles if available)
const employeeData1 = [
  {
    id: 112, name: 'Mithilesh Kumar Singh', location: 'Kritipur, Kathmandu',
    teamId: '1235BG', compensation: '1235BG', contact: '987569326', position: 'Manager'
  },
  {
    id: 113, name: 'Suron Maharjan', location: 'Natole, Lalitpur',
    teamId: '86523B', compensation: '86523B', contact: '987569326', position: 'Manager'
  },
  {
    id: 114, name: 'Sandesh Bajracharya', location: 'Bhinchebahal, Lalitpur',
    teamId: '78365D', compensation: '78365D', contact: '987569326', position: 'Developer'
  },
  {
    id: 115, name: 'Subin Sedhai', location: 'Baneshwor, Kathmandu',
    teamId: '863265F', compensation: '863265F', contact: '987569326', position: 'CTO'
  },
  {
    id: 116, name: 'Wonjala Joshi', location: 'Bhalespatil, Lalitpur',
    teamId: '1235BG', compensation: '459872B', contact: '987569326', position: 'Junior Developer'
  },
  {
    id: 117, name: 'Numa Limbu', location: 'Sampang Chowk, Dharan',
    teamId: '86523B', compensation: '742652A', contact: '987569326', position: 'Developer'
  },
  {
    id: 118, name: 'Nimesh Sthapit', location: 'Newroad, Pokhara',
    teamId: '78365D', compensation: '74123B', contact: '987569326', position: 'HR'
  },
  {
    id: 119, name: 'Samikshya Basnet', location: 'Nakhipot, Lalitpur',
    teamId: '863265F', compensation: '741369P', contact: '987569326', position: 'Marketing'
  },
  {
    id: 120, name: 'Sushant Kushwar', location: 'Sinamangal, Kathmandu',
    teamId: '1235BG', compensation: '75962K', contact: '987569326', position: 'Sales'
  },
  {
    id: 121, name: 'Hrishav Gajurel', location: 'Khumaltar, Lalitpur',
    teamId: '86523B', compensation: '459632IA', contact: '987569326', position: 'Network'
  }
];

const employeeData = Array.from({ length: 10 }, (_, i) =>
  employeeData1.map((emp, idx) => ({
    ...emp,
    id: emp.id + i * employeeData1.length + idx, // Ensure unique IDs
  }))
).flat();

const ITEMS_PER_PAGE = 10;
const TeamSection = () => {
  const [selectedSection, setSelectedSection] = useState('Team Details');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sections = ['Team Details', 'Employees Compensation'];

  const totalItems = employeeData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const currentData = employeeData.slice(startIndex, endIndex);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="bg-gray-50 p-8 min-h-screen">
      {/* Dropdown */}
      <div ref={dropdownRef} className="relative w-full mb-6">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="w-full p-3 text-sm bg-white rounded-md shadow border border-gray-300 flex justify-between items-center"
        >
          {selectedSection}
          <ChevronDown className="w-4 h-4 ml-2" />
        </button>
        {dropdownOpen && (
          <ul className="absolute left-0 z-10 mt-1 w-full bg-white border border-gray-200 rounded-md shadow">
            {sections.map((section) => (
              <li
                key={section}
                onClick={() => {
                  setSelectedSection(section);
                  setDropdownOpen(false);
                  setCurrentPage(1); // Reset page
                }}
                className={`p-3 text-sm cursor-pointer hover:bg-sky-100 ${selectedSection === section ? "bg-blue-50 font-medium" : ""}`}
              >
                {section}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Content */}
      {selectedSection === 'Team Details' ? (
        <>
          <TeamCardSection title="Company Heads" members={companyheads} />
          <TeamCardSection title="Technical Team" members={techMembers} />
          <TeamCardSection title="Operations Team" members={operationsteam} />
          <TeamCardSection title="Sales Marketing Team" members={salesmarketingteam} />
          <TeamCardSection title="Recruitment /HR Team" members={recruitmenthrteam} />
        </>
      ) : (
        <div className="bg-white p-6 rounded-xl shadow overflow-auto">
          <h2 className="text-lg font-semibold mb-4">Employees Compensation Details</h2>
          <table className="min-w-full text-sm text-left text-gray-700">
            <thead className="text-xs text-gray-500 uppercase border-b">
              <tr>
                <th className="px-4 py-2">Employee ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Team ID</th>
                <th className="px-4 py-2">Compensation</th>
                <th className="px-4 py-2">Contact</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((emp) => (
                <tr key={emp.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{emp.id}</td>
                  <td className="px-4 py-3">{emp.name}</td>
                  <td className="px-4 py-3">{emp.location}</td>
                  <td className="px-4 py-3">{emp.teamId}</td>
                  <td className="px-4 py-3">{emp.compensation}</td>
                  <td className="px-4 py-3">{emp.contact}</td>
                  <td className="px-4 py-3">{emp.position}</td>
                  <td className="px-4 py-3 flex space-x-3">
                    <button className="text-blue-500 hover:text-blue-700">
                      <Pencil size={16} />
                    </button>
                    <button className="text-red-500 hover:text-red-700">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination summary and controls */}
          <div className="flex flex-col sm:flex-row justify-between items-center mt-4 text-sm text-gray-600">
            <div className="mb-2 sm:mb-0">
              Showing {startIndex + 1} to {endIndex} of {totalItems} entries
            </div>
            <div className="flex flex-wrap gap-1">
  <button
    className={`px-3 py-1 rounded border ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
  >
    &lt;
  </button>

  {Array.from({ length: totalPages }, (_, i) => i + 1)
    .slice(Math.max(0, currentPage - 3), currentPage + 2)
    .map((page) => (
      <button
        key={page}
        onClick={() => handlePageChange(page)}
        className={`px-3 py-1 rounded ${page === currentPage ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'}`}
      >
        {page}
      </button>
    ))}

  <button
    className={`px-3 py-1 rounded border ${currentPage === totalPages ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
    onClick={() => handlePageChange(currentPage + 1)}
    disabled={currentPage === totalPages}
  >
    &gt;
  </button>
</div>

          </div>
        </div>
      )}
    </div>
  );
};

export default TeamSection;