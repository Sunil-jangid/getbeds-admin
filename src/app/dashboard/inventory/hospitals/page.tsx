"use client";

import React, { useState } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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

  const cities = ["All", ...Array.from(new Set(hospitals.map((h) => h.city)))];

  const filteredData = hospitals.filter((hospital) => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === "All" || hospital.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const currentHospitals = filteredData.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

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
    setHospitals((prev) => {
      const updated = [...prev];
      updated[globalIndex] = {
        ...updated[globalIndex],
        isBlocked: !updated[globalIndex].isBlocked,
      };
      return updated;
    });
  };

  return (
    <div className="w-full min-h-screen bg-white px-2 py-3">
      {/* Header Controls */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-4 w-full">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row flex-grow gap-2 w-full max-w-3xl">
          <div className="flex items-center border rounded-md px-3 py-1.5 flex-grow bg-white shadow-sm">
            <FaSearch className="text-gray-400" />
            <input
              type="text"
              placeholder="Search hospitals..."
              className="ml-3 outline-none flex-grow text-sm bg-transparent"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
          <button
            className="bg-black text-white text-sm px-3 py-1.5 rounded shadow hover:bg-gray-900"
            onClick={() => setCurrentPage(1)}
          >
            Search
          </button>
        </div>

        {/* Filters & Add */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            className="border text-sm rounded px-2 py-1.5 shadow bg-white"
            value={selectedCity}
            onChange={(e) => {
              setSelectedCity(e.target.value);
              setCurrentPage(1);
            }}
          >
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>

          <Link href="/dashboard/details" passHref>
            <button className="bg-black text-white text-sm px-3 py-1.5 rounded shadow flex items-center gap-2 hover:bg-gray-900">
              <FaPlus className="text-xs" />
              Add Hospital
            </button>
          </Link>
        </div>
      </div>

      {/* Hospital Cards */}
      <div className="space-y-3">
        {currentHospitals.map((hospital, index) => (
          <div
            key={index}
            className="w-full bg-white p-3 rounded-md border border-gray-300 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
          >
            <div className="flex gap-3 w-full sm:w-auto">
              <img
                src={hospital.imageUrl}
                alt={hospital.name}
                className="w-24 h-24 rounded object-cover bg-gray-100 border border-gray-200"
              />
              <div className="text-sm">
                <h2 className="font-semibold">{hospital.name}</h2>
                <p className="text-xs text-gray-500">{hospital.address}</p>
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <button className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200">View</button>
              <button className="text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200">Edit</button>
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
      </div>

      {/* Pagination Summary */}
      <p className="text-center text-xs text-gray-400 mt-4">
        Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
        {Math.min(currentPage * ITEMS_PER_PAGE, filteredData.length)} of {filteredData.length} entries
      </p>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center flex-wrap gap-1 mt-3">
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
