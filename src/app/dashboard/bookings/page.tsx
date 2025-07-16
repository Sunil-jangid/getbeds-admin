"use client";

import React, { useEffect, useState } from "react";
import BookingsTable, { Booking } from "@/components/dashboard/BookingsTable";

const BookingPage = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await fetch("https://api.getbeds.in/api/v1/admin/bookings?status=CONFIRMED");
        const response = await res.json();

        const bookingsArray = response.bookings;
        if (!Array.isArray(bookingsArray)) {
          console.error("Expected bookings to be an array");
          return;
        }

        const transformedData: Booking[] = bookingsArray.map((item: any) => {
          const checkin = new Date(item.checkinDate);
          const checkout = item.checkoutDate ? new Date(item.checkoutDate) : null;

          const totalDays =
            checkout && !isNaN(checkout.getTime())
              ? Math.floor((checkout.getTime() - checkin.getTime()) / (1000 * 60 * 60 * 24))
              : 1;

          const price = item.bed?.pricePerDay
            ? parseInt(item.bed.pricePerDay) * totalDays
            : 0;

          return {
            name: item.patient?.fullName ?? "Unknown",
            bookingId: item.UUID,
            admissionDate: item.checkinDate,
            dischargeDate: item.checkoutDate ?? "Not discharged",
            totalDays: `${totalDays} ${totalDays > 1 ? "days" : "day"}`,
            roomPlan: item.bed?.bedNumber ?? "N/A",
            contact: item.patient?.phoneNumber ?? "N/A",
            price: price,
            status: item.checkoutDate ? "Processed" : "Pending", // logic for status
          };
        });

        console.log("Transformed Bookings:", transformedData);
        setBookings(transformedData);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="w-full bg-white text-gray-800">
      <div className="w-full h-full p-4 sm:p-6 md:p-0">
        {loading ? (
          <div className="text-center py-10">Loading bookings...</div>
        ) : (
          <BookingsTable data={bookings} />
        )}
      </div>
    </div>
  );
};

export default BookingPage;
