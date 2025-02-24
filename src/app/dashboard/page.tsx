'use client'

import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { RevenueSummaries } from '@/components/dashboard/revenue-summaries'
import { Statistics } from '@/components/dashboard/statistics'
import { AreaBookings } from '@/components/dashboard/area-bookings'
import { InventoryUtilization } from '@/components/dashboard/inventory-utilization'
import { PerformanceOverview } from '@/components/dashboard/performance-overview'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'
import { TotalRevenue } from '@/components/dashboard/total-revenue'
import { ServiceCard } from '@/components/dashboard/service-card'

export default function DashboardPage() {
  return (
    <div className="container py-6 space-y-6">
      <DashboardHeader 
        name="John"
        location="New Delhi, India"
      />
      
      {/* Total Revenue */}
      <TotalRevenue />

      {/* Services Row */}
      <div className="grid grid-cols-2 gap-6">
        <ServiceCard 
          title="Hospital Service"
          description="Lorem Ipsum"
          metrics={[
            {
              label: "Revenue Booked",
              value: "Total 7852",
              note: "*P.2, R%, + total week $000 from 1st Dec 2014"
            }
          ]}
          additionalInfo="Vendor ID: #1234567-YUISOP"
        />
        <ServiceCard 
          title="Ambulance Service"
          description="Lorem Ipsum"
          metrics={[
            {
              label: "Active Ambulances",
              value: "89",
              note: "(*+16% rise month)"
            },
            {
              label: "Status",
              value: "On Route"
            }
          ]}
        />
      </div>

      {/* Revenue Summary Section */}
      <div className="grid grid-cols-3 gap-6">
        <RevenueSummaries />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-6">
        {/* Left Column - Statistics */}
        <div className="col-span-3">
          <Statistics />
        </div>

        {/* Middle Column - Area Bookings */}
        <div className="col-span-5">
          <AreaBookings />
        </div>

        {/* Right Column - Inventory Utilization */}
        <div className="col-span-4">
          <InventoryUtilization />
        </div>
      </div>


      <div className="grid grid-cols-2 gap-6">
        <PerformanceOverview />
        <div className="flex justify-end items-end">
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
        </div>
      </div>
    </div>
  )
}
