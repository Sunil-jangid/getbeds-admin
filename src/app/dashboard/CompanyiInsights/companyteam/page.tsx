'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Pencil, Trash2 } from 'lucide-react';
import TeamCardSection from '../../../../components/dashboard/TeamCardSection';
import { useRouter } from 'next/navigation';

interface Member {
  name: string;
  role: string;
  image: string;
  id: number;
  location: string;
  teamId: string; 
  compensation: string;
  contact: string;
  dept:string;
  email: string,
  yearOfJoin: number,
  CTC: string 
}

interface TeamCardSectionProps {
  title: string;
  members: Member[];
}


// Employee compensation data (mapped to roles if available)
const employeeData1 = [
  { id: 100, name: "Aarav Mehta", role: "HR", image: "/pro3.png", location: 'Lalitpur, Kathmandu', teamId: '7612AB', compensation: '7612AB', contact: '9812345671', dept:'recruitmenthrteam', email: 'aarav.mehta100@company.com', yearOfJoin: 2021, CTC: '5.9 LPA' },
  { id: 101, name: "Rohan Khadka", role: "HR", image: "/pro2.png", location: 'Dhulikhel, Bhaktapur', teamId: '9123BC', compensation: '9123BC', contact: '9812345672', dept:'recruitmenthrteam', email: 'rohan.khadka101@company.com', yearOfJoin: 2020, CTC: '6.1 LPA' },
  { id: 102, name: "Vihaan Sharma", role: "Sales", image: "/pro2.png", location: 'Birgunj, Nepal', teamId: '1192CD', compensation: '1192CD', contact: '9812345673', dept:'salesmarketingteam', email: 'vihaan.sharma102@company.com', yearOfJoin: 2022, CTC: '6.0 LPA' },
  { id: 103, name: "Aryan Joshi", role: "Marketing", image: "/pro.png", location: 'Butwal, Nepal', teamId: '2378DE', compensation: '2378DE', contact: '9812345674', dept:'salesmarketingteam', email: 'aryan.joshi103@company.com', yearOfJoin: 2021, CTC: '6.6 LPA' },
  { id: 104, name: "Ishaan Thapa", role: "Sales", image: "/pro2.png", location: 'Bhaktapur, Kathmandu', teamId: '3245EF', compensation: '3245EF', contact: '9812345675', dept:'salesmarketingteam', email: 'ishaan.thapa104@company.com', yearOfJoin: 2017, CTC: '9.2 LPA' },
  { id: 105, name: "Devansh Rana", role: "Network", image: "/pro.png", location: 'Hetauda, Nepal', teamId: '5489FG', compensation: '5489FG', contact: '9812345676', dept:'operationsteam', email: 'devansh.rana105@company.com', yearOfJoin: 2020, CTC: '6.3 LPA' },
  { id: 106, name: "Kabir Basnet", role: "Manager", image: "/pro3.png", location: 'Pokhara, Nepal', teamId: '6571GH', compensation: '6571GH', contact: '9812345677', dept:'operationsteam', email: 'kabir.basnet106@company.com', yearOfJoin: 2023, CTC: '7.0 LPA' },
  { id: 107, name: "Arjun Mishra", role: "CEO", image: "/pro3.png", location: 'Dharan, Nepal', teamId: '8643HI', compensation: '8643HI', contact: '9812345678', dept:'companyheads', email: 'arjun.mishra107@company.com', yearOfJoin: 2014, CTC: '31.0 LPA' },
  { id: 108, name: "Yug Koirala", role: "CTO", image: "/pro2.png", location: 'Itahari, Nepal', teamId: '7812IJ', compensation: '7812IJ', contact: '9812345679', dept:'companyheads', email: 'yug.koirala108@company.com', yearOfJoin: 2016, CTC: '28.5 LPA' },
  { id: 109, name: "Aditya Giri", role: "Technical Head", image: "/pro3.png", location: 'Nepalgunj, Nepal', teamId: '9931JK', compensation: '9931JK', contact: '9812345680', dept:'companyheads', email: 'aditya.giri109@company.com', yearOfJoin: 2018, CTC: '20.0 LPA' },
  { id: 110, name: "Ayaan Joshi", role: "Manager", image: "/pro3.png", location: 'Janakpur, Nepal', teamId: '1236KL', compensation: '1236KL', contact: '9812345681', dept:'techMembers', email: 'ayaan.joshi110@company.com', yearOfJoin: 2022, CTC: '7.6 LPA' },
  { id: 111, name: "Reyansh Shrestha", role: "Technical Head", image: "/pro.png", location: 'Lahan, Nepal', teamId: '1597LM', compensation: '1597LM', contact: '9812345682', dept:'techMembers', email: 'reyansh.shrestha111@company.com', yearOfJoin: 2021, CTC: '9.9 LPA' },
  { id: 112, name: "Aarush Mahat", role: "Senior Developer", image: "/pro.png", location: 'Gorkha, Nepal', teamId: '6248MN', compensation: '6248MN', contact: '9812345683', dept:'techMembers', email: 'aarush.mahat112@company.com', yearOfJoin: 2019, CTC: '8.1 LPA' },
  { id: 113, name: "Vivaan Bista", role: "Senior Developer", image: "/pro2.png", location: 'Tulsipur, Nepal', teamId: '4312NO', compensation: '4312NO', contact: '9812345684', dept:'techMembers', email: 'vivaan.bista113@company.com', yearOfJoin: 2020, CTC: '8.3 LPA' },
  { id: 114, name: "Neil Kharel", role: "Junior Developer", image: "/pro3.png", location: 'Kirtipur, Nepal', teamId: '7852OP', compensation: '7852OP', contact: '9812345685', dept:'techMembers', email: 'neil.kharel114@company.com', yearOfJoin: 2023, CTC: '5.1 LPA' },
];



// All team data
// Define the type for employee objects
type Employee = {
  id: number;
  name: string;
  role: string;
  image: string;
  location: string;
  teamId: string;
  compensation: string;
  contact: string;
  dept: string;
  email: string,
  yearOfJoin: number,
  CTC: string 
};

// Declare the arrays with the correct type
const techMembers: Employee[] = [];
const companyheads: Employee[] = [];
const operationsteam: Employee[] = [];
const salesmarketingteam: Employee[] = [];
const recruitmenthrteam: Employee[] = [];

// Distribute employees to the correct team array
employeeData1.forEach((employee) => {
  if (employee.dept === 'techMembers') {
    techMembers.push(employee);
  } else if (employee.dept === 'companyheads') {
    companyheads.push(employee);
  } else if (employee.dept === 'operationsteam') {
    operationsteam.push(employee);
  } else if (employee.dept === 'salesmarketingteam') {
    salesmarketingteam.push(employee);
  } else if (employee.dept === 'recruitmenthrteam') {
    recruitmenthrteam.push(employee);
  }
});



const employeeData = Array.from({ length: 10 }, (_, i) =>
  employeeData1.map((emp, idx) => ({
    ...emp,
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
  const router = useRouter();
  
    const handleViewProfile = (member: Member) => {
      const query = new URLSearchParams({
        name: member.name,
        role: member.role,
        image: member.image,
        id: String(member.id), 
        location: member.location,
        teamId: member.teamId, 
        compensation: member.compensation, 
        contact: member.contact, 
        dept:member.dept,
        email: member.email,
        yearOfJoin: String(member.yearOfJoin),
        CTC: member.CTC, 
      }).toString();
      router.push(`/dashboard/CompanyiInsights/companyteam/profile?${query}`);
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
  <td className="px-4 py-3">{emp.role}</td>
  <td className="px-4 py-3 flex space-x-3">
    <button
      onClick={() => handleViewProfile(emp)}
      className="text-blue-500 hover:text-blue-700"
    >
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
  {/* Previous button */}
  <button
    className={`px-3 py-1 rounded border ${currentPage === 1 ? 'text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
    onClick={() => handlePageChange(currentPage - 1)}
    disabled={currentPage === 1}
  >
    &lt;
  </button>

  {/* Page numbers */}
  {Array.from({ length: 5 }, (_, i) => {
    let start = Math.max(1, currentPage - 2);
    if (currentPage > totalPages - 2) start = Math.max(1, totalPages - 4);
    const page = start + i;
    return (
      page <= totalPages && (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 rounded border ${
            page === currentPage ? 'bg-gray-200 font-semibold' : 'hover:bg-gray-100'
          }`}
        >
          {page}
        </button>
      )
    );
  })}

  {/* Next button */}
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