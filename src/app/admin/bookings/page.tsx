"use client"

import AdminLayout from "@/components/admin/AdminLayout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Calendar, Search, Filter, MoreHorizontal, Edit, Trash2, CheckCircle, Clock, XCircle } from "lucide-react"
import { useState } from "react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"

export default function BookingsAdminPage() {
  const [searchTerm, setSearchTerm] = useState("")
  
  const bookings = [
    { id: "BK-001", server: "MafiaPS", date: "2024-06-17", time: "08:00 - 12:00", duration: 4, status: "Done" },
    { id: "BK-002", server: "DragonPS", date: "2024-06-17", time: "13:00 - 17:00", duration: 4, status: "Pending" },
    { id: "BK-003", server: "GalaxyGT", date: "2024-06-18", time: "08:00 - 10:00", duration: 2, status: "Proses" },
    { id: "BK-004", server: "RivalGT", date: "2024-06-19", time: "18:00 - 22:00", duration: 4, status: "Cancelled" },
    { id: "BK-005", server: "HeroicPS", date: "2024-06-20", time: "09:00 - 12:00", duration: 3, status: "Pending" },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending": return <Badge variant="outline" className="border-yellow-500 text-yellow-500">PENDING</Badge>
      case "Proses": return <Badge variant="outline" className="border-blue-500 text-blue-500">PROSES</Badge>
      case "Done": return <Badge variant="outline" className="border-green-500 text-green-500">DONE</Badge>
      case "Cancelled": return <Badge variant="destructive">CANCELLED</Badge>
      default: return <Badge variant="outline">UNKNOWN</Badge>
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by server name or ID..." 
              className="pl-10 bg-card border-border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="bg-card border-border flex gap-2">
              <Filter className="w-4 h-4" />
              Filter Status
            </Button>
            <Button className="bg-primary hover:bg-primary/90 flex gap-2 font-bold">
              <Calendar className="w-4 h-4" />
              ADD BOOKING
            </Button>
          </div>
        </div>

        <Card className="gaming-card overflow-hidden border-border">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="font-bold">ID</TableHead>
                <TableHead className="font-bold">SERVER NAME</TableHead>
                <TableHead className="font-bold">DATE</TableHead>
                <TableHead className="font-bold">TIME SLOT</TableHead>
                <TableHead className="font-bold text-center">DURATION</TableHead>
                <TableHead className="font-bold">STATUS</TableHead>
                <TableHead className="text-right font-bold">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking.id} className="border-border hover:bg-muted/20">
                  <TableCell className="font-mono text-xs text-muted-foreground">{booking.id}</TableCell>
                  <TableCell className="font-bold">{booking.server}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-primary" />
                    {booking.time}
                  </TableCell>
                  <TableCell className="text-center">{booking.duration}h</TableCell>
                  <TableCell>{getStatusBadge(booking.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-card border-border">
                        <DropdownMenuItem className="flex gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Mark as Done
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex gap-2">
                          <Edit className="w-4 h-4" />
                          Edit Booking
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex gap-2 text-destructive">
                          <XCircle className="w-4 h-4" />
                          Cancel Booking
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex gap-2 text-destructive font-bold">
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AdminLayout>
  )
}
