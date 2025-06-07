import React, { useState, useMemo, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export type Booking = {
  name: string;
  bookingId: string;
  admissionDate: string; // Assuming "YYYY-MM-DD" format
  dischargeDate: string; // Assuming "YYYY-MM-DD" format
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
  const [startDate, setStartDate] = useState<Date | null>(new Date(2020, 5, 1)); // June 2020
  const [endDate, setEndDate] = useState<Date | null>(new Date(2024, 0, 1)); // January 2024
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  const startPickerRef = useRef<HTMLDivElement>(null);
  const endPickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (showStartPicker && startPickerRef.current && !startPickerRef.current.contains(event.target as Node)) {
        setShowStartPicker(false);
      }
      if (showEndPicker && endPickerRef.current && !endPickerRef.current.contains(event.target as Node)) {
        setShowEndPicker(false);
      }
    };

    if (showStartPicker || showEndPicker) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showStartPicker, showEndPicker]);

  const filteredData = useMemo(() => {
    return data.filter((booking) => {
      const searchMatch =
        booking.name.toLowerCase().includes(search.toLowerCase()) ||
        booking.bookingId.toLowerCase().includes(search.toLowerCase()) ||
        booking.status.toLowerCase().includes(search.toLowerCase());

      const admission = new Date(booking.admissionDate);
      const discharge = new Date(booking.dischargeDate);

      const startFilter = startDate
        ? new Date(startDate.getFullYear(), startDate.getMonth(), 1)
        : null;
      const endFilter = endDate
        ? new Date(endDate.getFullYear(), endDate.getMonth() + 1, 0, 23, 59, 59, 999)
        : null;

      const dateMatch =
        (!startFilter || discharge >= startFilter) &&
        (!endFilter || admission <= endFilter);

      return searchMatch && dateMatch;
    });
  }, [data, search, startDate, endDate]);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const pageNumbersToShow = 5;
  const startPage =
    Math.floor((currentPage - 1) / pageNumbersToShow) * pageNumbersToShow + 1;
  const endPage = Math.min(startPage + pageNumbersToShow - 1, totalPages);

  return (
    <div className="p-4 relative">
      <div className="flex justify-between items-center mb-4 flex-wrap gap-4">
        <div className="flex flex-col">
          <h2 className="font-bold text-xl">All Bookings</h2>
          <div className="text-sm text-gray-600 flex items-center gap-2 mt-5">
            Bookings from
            <div className="relative" ref={startPickerRef}>
              <button
                onClick={() => {
                  setShowStartPicker(!showStartPicker);
                  setShowEndPicker(false);
                }}
                className="bg-black text-white px-3 py-1 rounded-md text-xs font-semibold hover:bg-gray-800 transition-colors"
              >
                {startDate?.toLocaleString("default", {
                  month: "short",
                  year: "numeric",
                })}
              </button>
              {showStartPicker && (
                <div className="absolute z-50 mt-2 p-2 bg-white border border-gray-300 rounded-lg shadow-lg">
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
            <div className="relative" ref={endPickerRef}>
              <button
                onClick={() => {
                  setShowEndPicker(!showEndPicker);
                  setShowStartPicker(false);
                }}
                className="bg-black text-white px-3 py-1 rounded-md text-xs font-semibold hover:bg-gray-800 transition-colors"
              >
                {endDate?.toLocaleString("default", {
                  month: "short",
                  year: "numeric",
                })}
              </button>
              {showEndPicker && (
                <div className="absolute z-50 mt-2 p-2 bg-white border border-gray-300 rounded-lg shadow-lg">
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
  placeholder="Search by name, ID, or status..."
  className="border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all w-full md:w-80 lg:w-66"
  value={search}
  onChange={(e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  }}
/>
      </div>

      <table className="w-full border rounded-lg overflow-hidden text-sm">
        <thead className="bg-gray-100">
          <tr className="text-left text-gray-700">
            <th className="p-3 font-semibold">Patients Name</th>
            <th className="p-3 font-semibold">Booking ID</th>
            <th className="p-3 font-semibold">Admission Date</th>
            <th className="p-3 font-semibold">Discharge Date</th>
            <th className="p-3 font-semibold">Total Days</th>
            <th className="p-3 font-semibold">Room Plan</th>
            <th className="p-3 font-semibold">Contact</th>
            <th className="p-3 font-semibold">Price</th>
            <th className="p-3 font-semibold">Status</th>
            <th className="p-3 font-semibold">Print Invoice</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.length === 0 ? (
            <tr>
              <td colSpan={10} className="text-center p-6 text-gray-500">
                No bookings found for the selected criteria.
              </td>
            </tr>
          ) : (
            paginatedData.map((item) => (
              <tr key={item.bookingId} className="border-t hover:bg-gray-50 transition-colors">
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.bookingId}</td>
                <td className="p-3">{item.admissionDate}</td>
                <td className="p-3">{item.dischargeDate}</td>
                <td className="p-3">{item.totalDays}</td>
                <td className="p-3">{item.roomPlan}</td>
                <td className="p-3">{item.contact}</td>
                <td className="p-3 font-medium">Rs. {item.price.toLocaleString()}</td>
                <td className="p-3">
                  <span
                    className={`
                      px-3 py-1 text-xs font-medium
                      rounded-md inline-flex items-center justify-center min-w-[85px] text-center
                      ${
                        item.status === "Processed"
                          ? "text-green-700 bg-green-100 border border-green-300"
                          : "text-red-700 bg-red-100 border border-red-300"
                      }
                    `}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-3">
                  <button className="text-purple-700 bg-purple-100 border border-purple-300 px-3 py-1 text-xs rounded-md hover:bg-purple-200 transition-colors">
                    Print Invoice
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="mt-6 flex justify-between items-center flex-wrap gap-3">
        <span className="text-sm text-gray-600">
          Showing {paginatedData.length} of {filteredData.length} entries
        </span>

        <div className="flex gap-1 items-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
            aria-label="Previous page"
          >
            «
          </button>

          {Array.from({ length: endPage - startPage + 1 }, (_, idx) => {
            const pageNum = startPage + idx;
            return (
              <button
                key={pageNum}
                onClick={() => setCurrentPage(pageNum)}
                className={`px-3 py-1 text-sm border border-gray-300 rounded-md ${
                  currentPage === pageNum
                    ? "bg-black text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                } transition-colors`}
                aria-label={`Page ${pageNum}`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm border border-gray-300 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 transition-colors"
            aria-label="Next page"
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingsTable;