'use client'

import { useState } from "react"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

type ApprovalItem = {
  id: string
  name: string
  type: 'hospital' | 'user'
  date: string
  status: 'pending' | 'approved' | 'rejected'
}

const dummyApprovals: ApprovalItem[] = [
  { id: '1', name: 'City Hospital', type: 'hospital', date: '2024-02-20', status: 'pending' },
  { id: '2', name: 'John Doe', type: 'user', date: '2024-02-19', status: 'pending' },
  // Add more dummy data
]

export default function ApprovalsPage() {
  const [approvals, setApprovals] = useState(dummyApprovals)

  const handleApproval = (id: string, newStatus: 'approved' | 'rejected') => {
    setApprovals(approvals.map(item => 
      item.id === id ? { ...item, status: newStatus } : item
    ))
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Approvals Management</h1>
      
      <Tabs defaultValue="pending">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        {['pending', 'approved', 'rejected'].map((status) => (
          <TabsContent key={status} value={status}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {approvals
                  .filter(item => item.status === status)
                  .map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.name}</TableCell>
                      <TableCell className="capitalize">{item.type}</TableCell>
                      <TableCell>{item.date}</TableCell>
                      <TableCell>
                        {status === 'pending' && (
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-green-50 text-green-600 hover:bg-green-100"
                              onClick={() => handleApproval(item.id, 'approved')}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-red-50 text-red-600 hover:bg-red-100"
                              onClick={() => handleApproval(item.id, 'rejected')}
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
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
