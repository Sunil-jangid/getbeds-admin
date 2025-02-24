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

type User = {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
}

const dummyUsers: User[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', role: 'Doctor', status: 'active' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', role: 'Admin', status: 'pending' },
]

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>(dummyUsers)

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-6">Manage Users</h1>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <span className={cn(
                  "px-2 py-1 rounded-full text-xs",
                  {
                    "bg-green-100 text-green-800": user.status === 'active',
                    "bg-yellow-100 text-yellow-800": user.status === 'pending',
                    "bg-red-100 text-red-800": user.status === 'inactive',
                  }
                )}>
                  {user.status}
                </span>
              </TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-primary/10 text-primary hover:bg-primary/20"
                >
                  Manage
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
