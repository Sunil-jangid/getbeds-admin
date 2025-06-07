"use client";

import BookingsTable, { Booking } from "@/components/dashboard/BookingsTable";
import "react-circular-progressbar/dist/styles.css";
import "react-datepicker/dist/react-datepicker.css";

const booking = () => {

function generateDummyData(): Booking[] {
  const getRandomDate = (start: Date, end: Date) =>
    new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

  const names = ["Jane Cooper", "Floyd Miles", "Ronald Richards"];
  const roomPlans = ["Standard", "Premium", "Deluxe"];
  const statuses: ("Processed" | "Pending")[] = ["Processed", "Pending"];

  return Array.from({ length: 500 }, () => {
    const admission = getRandomDate(new Date(2020, 5), new Date(2024, 0));
    const discharge = new Date(admission.getTime() + Math.floor(Math.random() * 7 + 1) * 86400000);
    const totalDays = Math.floor((discharge.getTime() - admission.getTime()) / 86400000);

    return {
      name: names[Math.floor(Math.random() * names.length)],
      bookingId: "#" + Math.floor(Math.random() * 1000000),
      admissionDate: admission.toISOString().split("T")[0],
      dischargeDate: discharge.toISOString().split("T")[0],
      totalDays: `${totalDays} ${totalDays > 1 ? "days" : "day"}`,
      roomPlan: `${
        roomPlans[Math.floor(Math.random() * roomPlans.length)]
      }`,
      contact: "+91-" + Math.floor(1000000000 + Math.random() * 9000000000),
      price: Math.floor(Math.random() * 30000 + 5000),
      status: statuses[Math.floor(Math.random() * statuses.length)],
    };
  });
}

  const bookings = generateDummyData();

  return (
    <div className="min-h-screen flex justify-center px-4">
      <div className="w-full max-w-7xl space-y-6">

    <div className="min-h-screen bg-white p-6">
      <BookingsTable data={bookings} />
    </div>
      </div>
    </div>
  );
};

export default booking;
