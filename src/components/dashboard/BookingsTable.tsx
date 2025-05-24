import React, { useState, useMemo } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export type Booking = {
  name: string;
  bookingId: string;
  admissionDate: string;
  dischargeDate: string;
  totalDays: string;
  roomPlan: string;
  contact: string;
  price: number;
  status: "Processed" | "Pending";
};

type BookingsTableProps = {
  data: Booking[];
};

const ITEMS_PER_PAGE = 7;

const BookingsTable: React.FC<BookingsTableProps> = ({ data }) => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [startDate, setStartDate] = useState<Date | null>(new Date("2020-06-01"));
  const [endDate, setEndDate] = useState<Date | null>(new Date("2024-01-01"));
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const filteredData = useMemo(() => {
  return data.filter((booking) => {
    const searchMatch =
      booking.name.toLowerCase().includes(search.toLowerCase()) ||
      booking.bookingId.toLowerCase().includes(search.toLowerCase()) ||
      booking.status.toLowerCase().includes(search.toLowerCase());

    const admission = new Date(booking.admissionDate);
    const discharge = new Date(booking.dischargeDate);

    // Start and end boundaries of the filter range in terms of month/year
    const start = startDate ? new Date(startDate.getFullYear(), startDate.getMonth(), 1) : null;
    const end = endDate ? new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0) : null; // end of month

    // Both admission and discharge must be within the selected range
    const dateMatch =
      (!start || admission >= start) &&
      (!end || admission <= end) &&
      (!start || discharge >= start) &&
      (!end || discharge <= end);

    return searchMatch && dateMatch;
  });
}, [data, search, startDate, endDate]);


  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const pageNumbersToShow = 5;
  const startPage = Math.floor((currentPage - 1) / pageNumbersToShow) * pageNumbersToShow + 1;
  const endPage = Math.min(startPage + pageNumbersToShow - 1, totalPages);

  return (
    <div className="p-4 relative">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <div className="flex flex-col">
          <h2 className="font-bold text-xl">All Bookings</h2>
          <div className="text-sm text-gray-600 flex items-center gap-2">
            Bookings from
            <div className="relative">
              <button
                onClick={() => setShowStartPicker(!showStartPicker)}
                className="text-blue-600 underline"
              >
                {startDate?.toLocaleString("default", {
                  month: "short",
                  year: "numeric",
                })}
              </button>
              {showStartPicker && (
                <div className="absolute z-50">
                  <DatePicker
                    selected={startDate}
                    onChange={(date) => {
                      setStartDate(date);
                      setShowStartPicker(false);
                      setCurrentPage(1);
                    }}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    inline
                  />
                </div>
              )}
            </div>
            -
            <div className="relative">
              <button
                onClick={() => setShowEndPicker(!showEndPicker)}
                className="text-blue-600 underline"
              >
                {endDate?.toLocaleString("default", {
                  month: "short",
                  year: "numeric",
                })}
              </button>
              {showEndPicker && (
                <div className="absolute z-50">
                  <DatePicker
                    selected={endDate}
                    onChange={(date) => {
                      setEndDate(date);
                      setShowEndPicker(false);
                      setCurrentPage(1);
                    }}
                    dateFormat="MM/yyyy"
                    showMonthYearPicker
                    inline
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search"
          className="border px-2 py-1 rounded"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <table className="w-full border rounded text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Patients Name</th>
            <th className="p-2">Booking ID</th>
            <th className="p-2">Admission Date</th>
            <th className="p-2">Discharge Date</th>
            <th className="p-2">Total Days</th>
            <th className="p-2">Room Plan</th>
            <th className="p-2">Contact</th>
            <th className="p-2">Price</th>
            <th className="p-2">Status</th>
            <th className="p-2">Print Invoice</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, idx) => (
            <tr key={idx} className="border-t hover:bg-gray-50">
              <td className="p-2">{item.name}</td>
              <td className="p-2">{item.bookingId}</td>
              <td className="p-2">{item.admissionDate}</td>
              <td className="p-2">{item.dischargeDate}</td>
              <td className="p-2">{item.totalDays}</td>
              <td className="p-2">{item.roomPlan}</td>
              <td className="p-2">{item.contact}</td>
              <td className="p-2">Rs. {item.price.toLocaleString()}</td>
              <td className="p-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    item.status === "Processed"
                      ? "text-green-600 border border-green-400"
                      : "text-red-600 border border-red-400"
                  }`}
                >
                  {item.status}
                </span>
              </td>
              <td className="p-2">
                <button className="text-purple-600 border border-purple-300 px-2 py-1 text-xs rounded">
                  Print Invoice
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-600">
          Showing {paginatedData.length} of {filteredData.length} entries
        </span>

        <div className="flex gap-1 items-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-2 py-1 text-sm border rounded disabled:opacity-50"
          >
            «
          </button>

          {[...Array(endPage - startPage + 1)].map((_, idx) => {
            const pageNum = startPage + idx;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-1 text-sm border rounded ${
                  currentPage === pageNum ? "bg-black text-white" : "bg-white"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-2 py-1 text-sm border rounded disabled:opacity-50"
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingsTable;
