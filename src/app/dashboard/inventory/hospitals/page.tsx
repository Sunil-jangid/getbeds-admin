'use client'

import React, { useState } from "react";
import { FaSearch, FaFilter, FaPlus } from "react-icons/fa";
import { Button } from '@/components/ui/button';

type Hospital = {
  name: string;
  address: string;
  city: string;
  imageUrl: string;
  isBlocked: boolean;
};

const initialHospitalData: Hospital[] = Array.from({ length: 500 }, (_, i) => ({
  name: i % 3 === 0 ? "Max Super Speciality Hospital" : "Lorem Ipsum",
  address:
    i % 3 === 0
      ? "Uttar Pradesh, India, 2010XX"
      : i % 2 === 0
      ? "54 Ramani colony, 3rd street sular"
      : "32/ Venkatasamy layout, 3rd street sular",
  city: i % 2 === 0 ? "Delhi" : "Chennai",
  imageUrl: "/host.png",
  isBlocked: false,
}));

const ITEMS_PER_PAGE = 10;
const MAX_VISIBLE_PAGES = 5;

const ManageHospitals: React.FC = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>(initialHospitalData);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCity, setSelectedCity] = useState("All");

  const cities = ["All", ...Array.from(new Set(hospitals.map(h => h.city)))];

  const filteredData = hospitals.filter((hospital) => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === "All" || hospital.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const currentHospitals = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const getVisiblePageNumbers = () => {
    const start = Math.max(1, currentPage - Math.floor(MAX_VISIBLE_PAGES / 2));
    const end = Math.min(totalPages, start + MAX_VISIBLE_PAGES - 1);
    const actualStart = Math.max(1, end - MAX_VISIBLE_PAGES + 1);
    return Array.from({ length: end - actualStart + 1 }, (_, i) => actualStart + i);
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const toggleBlockHospital = (index: number) => {
    const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + index;
    setHospitals(prev => {
      const updated = [...prev];
      updated[globalIndex] = {
        ...updated[globalIndex],
        isBlocked: !updated[globalIndex].isBlocked,
      };
      return updated;
    });
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-4">
      <div className="flex justify-between items-center flex-wrap gap-4 mb-6">
        <div className="flex items-center space-x-2 flex-grow max-w-xl">
          <div className="flex items-center border rounded-md px-3 h-9 flex-grow bg-white shadow">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="ml-3 outline-none flex-grow text-sm"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <button
            className="bg-black text-white text-sm px-4 py-2 rounded shadow hover:bg-gray-900"
            onClick={() => setCurrentPage(1)}
          >
            Search
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <select
            className="border text-sm rounded px-3 py-2 shadow"
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value);
              setCurrentPage(1);
            }}
          >
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>

          <button className="bg-black text-white text-sm px-4 py-2 rounded shadow flex items-center gap-1 hover:bg-gray-900">
            <FaPlus className="text-xs" /> Add Hospital Details
          </button>
        </div>
      </div>

      {currentHospitals.map((hospital, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-md border border-gray-300 shadow-md flex items-center justify-between mb-4"
        >
          <div className="flex items-start gap-4">
            <img
              src={hospital.imageUrl}
              alt={hospital.name}
              className="w-25 h-24 rounded object-cover bg-gray-100 border border-gray-200"
            />
            <div>
              <h2 className="font-semibold text-sm">{hospital.name}</h2>
              <p className="text-xs text-gray-500">{hospital.address}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200">
              View
            </button>
            <button className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200">
              Edit
            </button>
            <button
              className={`text-sm px-3 py-1 rounded ${
                hospital.isBlocked
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
              onClick={() => toggleBlockHospital(index)}
            >
              {hospital.isBlocked ? "Unblock" : "Block"}
            </button>
          </div>
        </div>
      ))}

      <p className="text-center text-xs text-gray-400 mt-6">
        Showing {((currentPage - 1) * ITEMS_PER_PAGE) + 1} to{" "}
        {Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)} of {filteredData.length} entries
      </p>

      <div className="flex justify-center items-center space-x-1 mt-4 flex-wrap">
        <Button
          onClick={() => goToPage(currentPage - 1)}
          variant="Managehospitalsnavi"
          disabled={currentPage === 1}
          size="sm"
        >
          ‹
        </Button>

        {getVisiblePageNumbers().map((num) => (
          <Button
            key={num}
            onClick={() => goToPage(num)}
            variant="Managehospitalsnavinumber"
            size="sm"
          >
            {num}
          </Button>
        ))}

        <Button
          onClick={() => goToPage(currentPage + 1)}
          variant="Managehospitalsnavi"
          disabled={currentPage === totalPages}
          size="sm"
        >
          ›
        </Button>
      </div>
    </div>
  );
};

export default ManageHospitals;
