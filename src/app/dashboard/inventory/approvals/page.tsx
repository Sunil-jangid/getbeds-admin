'use client'

import { useState } from "react"
import { ArrowUpDown, Search } from "lucide-react"
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
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')
  const [sortConfig, setSortConfig] = useState<{ key: keyof ApprovalItem; direction: 'asc' | 'desc' } | null>(null)

  const handleSort = (key: keyof ApprovalItem) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const filteredApprovals = approvals
    .filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase()) &&
      (typeFilter === 'all' || item.type === typeFilter)
    )
    .sort((a, b) => {
      if (!sortConfig) return 0
      const { key, direction } = sortConfig
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1
      return 0
    })

  const handleApproval = (id: string, newStatus: 'approved' | 'rejected') => {
    setApprovals(currentApprovals => 
      currentApprovals.map(item =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Approvals Management</h1>
      
      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>

        {/* Filters */}
        <div className="flex gap-4 items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="hospital">Hospitals</SelectItem>
              <SelectItem value="user">Users</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {['pending', 'approved', 'rejected'].map((status) => (
          <TabsContent key={status} value={status}>
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow className="hover:bg-transparent border-none">
                  <TableHead className="hover:cursor-pointer" onClick={() => handleSort('name')}>
                    Name <ArrowUpDown className="inline h-4 w-4 ml-1" />
                  </TableHead>
                  <TableHead className="hover:cursor-pointer" onClick={() => handleSort('type')}>
                    Type <ArrowUpDown className="inline h-4 w-4 ml-1" />
                  </TableHead>
                  <TableHead className="hover:cursor-pointer" onClick={() => handleSort('date')}>
                    Date <ArrowUpDown className="inline h-4 w-4 ml-1" />
                  </TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredApprovals
                  .filter(item => item.status === status)
                  .map((item) => (
                    <TableRow key={item.id} className="border-none hover:bg-muted/50">
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
