'use client';
import { Trash2, Pencil } from 'lucide-react';

const permissions = [
  {
    name: 'Management',
    assignedTo: ['ADMINISTRATOR'],
    date: '14 Apr 2021, 8:43 PM',
  },
  {
    name: 'Manage Billing & Roles',
    assignedTo: ['ADMINISTRATOR'],
    date: '16 Sep 2021, 5:20 PM',
  },
  {
    name: 'Add & Remove Users',
    assignedTo: ['ADMINISTRATOR', 'MANAGER'],
    date: '14 Oct 2021, 10:20 AM',
  },
  {
    name: 'Project Planning',
    assignedTo: ['ADMINISTRATOR', 'USERS', 'SUPPORT'],
    date: '14 May 2021, 12:30 PM',
  },
  {
    name: 'Manage Email Sequences',
    assignedTo: ['ADMINISTRATOR', 'USERS', 'SUPPORT'],
    date: '23 Aug 2021, 2:00 PM',
  },
  {
    name: 'Client Communication',
    assignedTo: ['ADMINISTRATOR', 'MANAGER'],
    date: '15 Apr 2021, 11:30 AM',
  },
  {
    name: 'Only View',
    assignedTo: ['ADMINISTRATOR', 'RESTRICTED USER'],
    date: '04 Dec 2021, 8:15 PM',
  },
  {
    name: 'Financial Management',
    assignedTo: ['ADMINISTRATOR', 'MANAGER'],
    date: '25 Feb 2021, 10:30 AM',
  },
  {
    name: 'Manage Others\' Tasks',
    assignedTo: ['ADMINISTRATOR', 'SUPPORT'],
    date: '04 Nov 2021, 11:45 AM',
  },
];

const roleColors: { [key: string]: string } = {
  ADMINISTRATOR: 'bg-black text-white',
  MANAGER: 'bg-green-100 text-green-800',
  USERS: 'bg-orange-100 text-orange-800',
  SUPPORT: 'bg-blue-100 text-blue-800',
  'RESTRICTED USER': 'bg-red-100 text-red-800',
};

export default function PermissionsTable() {
  return (
    <div className="p-10 bg-white min-h-screen">
        <div className="mb-4 bg-white">
  <h1 className="text-lg font-semibold text-black">Permissions List</h1>
  <p className="text-sm text-gray-500 mt-1">
    Each category (Basic, Professional, and Business) includes the four predefined roles shown below.
  </p>
</div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search"
            className="border border-gray-300 rounded px-4 py-2 w-72"
          />
          <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
            Search
          </button>
        </div>
        <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800">
          + Add Permission
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-separate border-spacing-y-4">
          <thead className="text-gray-600 text-sm">
            <tr>
              <th className="px-4 py-2">NAME</th>
              <th className="px-4 py-2">ASSIGNED TO</th>
              <th className="px-4 py-2">CREATED DATE</th>
              <th className="px-4 py-2">ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {permissions.map((perm, index) => (
              <tr key={index} className="bg-gray-50 rounded-lg shadow-sm">
                <td className="px-4 py-4 font-medium">{perm.name}</td>
                <td className="px-4 py-4">
                  <div className="flex flex-wrap gap-2">
                    {perm.assignedTo.map((role, idx) => (
                      <span
                        key={idx}
                        className={`text-xs font-semibold px-3 py-1 rounded ${roleColors[role]}`}
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-gray-600">{perm.date}</td>
                <td className="px-4 py-4 flex items-center gap-3">
                  <Trash2 size={18} className="text-gray-500 cursor-pointer hover:text-red-600" />
                  <Pencil size={18} className="text-gray-500 cursor-pointer hover:text-blue-600" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6 text-sm text-gray-600">
        <p>Showing 1 to 9 of 9 entries</p>
        <div className="flex gap-2">
          <button className="bg-black text-white px-3 py-1 rounded">Previous</button>
          <button className="bg-black text-white px-3 py-1 rounded">1</button>
          <button className="bg-black text-white px-3 py-1 rounded">Next</button>
        </div>
      </div>
    </div>
  );
}
