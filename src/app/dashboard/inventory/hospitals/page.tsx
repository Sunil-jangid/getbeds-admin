'use client'

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type Hospital = {
  id: string
  name: string
  location: string
  beds: number
  status: 'pending' | 'approved' | 'rejected'
}

const dummyHospitals: Hospital[] = [
  { id: '1', name: 'City Hospital', location: 'New Delhi', beds: 100, status: 'pending' },
  { id: '2', name: 'Metro Care', location: 'Mumbai', beds: 150, status: 'approved' },
  // Add more dummy data as needed
]

export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState<Hospital[]>(dummyHospitals)

  const handleApproval = (id: string, newStatus: 'approved' | 'rejected') => {
    setHospitals(hospitals.map(hospital => 
      hospital.id === id ? { ...hospital, status: newStatus } : hospital
    ))
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Manage Hospitals</h1>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Hospital Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Beds</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hospitals.map((hospital) => (
            <TableRow key={hospital.id}>
              <TableCell>{hospital.name}</TableCell>
              <TableCell>{hospital.location}</TableCell>
              <TableCell>{hospital.beds}</TableCell>
              <TableCell>
                <span className={cn(
                  "px-2 py-1 rounded-full text-xs",
                  {
                    "bg-yellow-100 text-yellow-800": hospital.status === 'pending',
                    "bg-green-100 text-green-800": hospital.status === 'approved',
                    "bg-red-100 text-red-800": hospital.status === 'rejected',
                  }
                )}>
                  {hospital.status}
                </span>
              </TableCell>
              <TableCell>
                {hospital.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-green-50 text-green-600 hover:bg-green-100"
                      onClick={() => handleApproval(hospital.id, 'approved')}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-red-50 text-red-600 hover:bg-red-100"
                      onClick={() => handleApproval(hospital.id, 'rejected')}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
