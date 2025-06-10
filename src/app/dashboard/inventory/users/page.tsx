"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Trash2 } from "lucide-react";

type User = {
  uid: number;
  name: string;
  location: string;
  serviceId: string;
  paymentAmount: string;
  serviceType: string;
  hospitalVisited: string;
};

const generateUsers = (): User[] => {
  const names = ["Mithilesh Kumar Singh", "Suron Maharjan", "Sandesh Bajracharya"];
  const locations = ["Kathmandu", "Lalitpur", "Pokhara", "Dharan", "Bhaktapur"];
  return Array.from({ length: 500 }, (_, i) => ({
    uid: 112 + i,
    name: names[Math.floor(Math.random() * names.length)],
    location: `${locations[Math.floor(Math.random() * locations.length)]}, Nepal`,
    serviceId: `${Math.floor(Math.random() * 900000) + 100000}A`,
    paymentAmount: `${Math.floor(Math.random() * 900000) + 100000}`,
    serviceType: "987659326",
    hospitalVisited: "Lorem Ipsum",
  }));
};

export default function UsersPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [data] = useState<User[]>(generateUsers());

  const pageSize = 15;
  const totalPages = Math.ceil(data.length / pageSize);

  const filteredData = useMemo(() => {
  return data.filter(user => {
    const search = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(search) ||
      user.uid.toString().includes(search) ||
      user.serviceId.toLowerCase().includes(search)
    );
  });
}, [searchTerm, data]);


  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [currentPage, filteredData]);

  const handleEdit = (user: User) => {
    const encoded = encodeURIComponent(JSON.stringify(user));
    router.push(`/dashboard/inventory/users/add?data=${encoded}`);
  };

  const handleDelete = (uid: number) => {
    alert(`Delete user with UID: ${uid}`);
  };

  const getPaginationRange = () => {
    const total = Math.ceil(filteredData.length / pageSize);
    const maxPageButtons = 5;
    let start = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let end = start + maxPageButtons - 1;

    if (end > total) {
      end = total;
      start = Math.max(1, end - maxPageButtons + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="p-14">
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2">
          <input
            type="text"
            className="border px-3 py-2 rounded w-72"
            placeholder="Search"
            value={searchTerm}
            onChange={e => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          <button className="bg-black text-white px-4 py-2 rounded">Search</button>
        </div>
        <button
          onClick={() => router.push("/dashboard/inventory/users/add")}
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add User Details
        </button>
      </div>

      {/* Table */}
      

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm">
        <span>
          Showing {Math.min((currentPage - 1) * pageSize + 1, filteredData.length)} to{" "}
          {Math.min(currentPage * pageSize, filteredData.length)} of {filteredData.length} entries
        </span>
        <div className="flex space-x-1 items-center">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            «
          </button>
          {getPaginationRange().map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded ${
                page === currentPage ? "bg-black text-white" : ""
              }`}
            >
              {page}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
