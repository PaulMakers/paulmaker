"use client"

import AdminLayout from "@/components/admin/AdminLayout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Calendar, Search, Filter, MoreHorizontal, Edit, Trash2, CheckCircle, Clock, XCircle } from "lucide-react"
import { useState, useMemo } from "react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { useCollection, useFirestore } from "@/firebase"
import { collection, query, orderBy, updateDoc, doc, deleteDoc } from "firebase/firestore"

export default function BookingsAdminPage() {
  const db = useFirestore()
  const [searchTerm, setSearchTerm] = useState("")

  const bookingsQuery = useMemo(() => {
    return query(collection(db, "bookings"), orderBy("createdAt", "desc"))
  }, [db])

  const { data: bookings, isLoading } = useCollection(bookingsQuery)

  const filteredBookings = bookings?.filter(b => 
    b.serverName?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pending": return <Badge variant="outline" className="border-yellow-500 text-yellow-500">PENDING</Badge>
      case "Proses": return <Badge variant="outline" className="border-blue-500 text-blue-500">PROSES</Badge>
      case "Done": return <Badge variant="outline" className="border-green-500 text-green-500">DONE</Badge>
      case "Cancelled": return <Badge variant="destructive">CANCELLED</Badge>
      default: return <Badge variant="outline">UNKNOWN</Badge>
    }
  }

  const updateStatus = async (id: string, status: string) => {
    await updateDoc(doc(db, "bookings", id), { status })
  }

  const handleDelete = async (id: string) => {
    if (confirm("Hapus booking ini?")) {
      await deleteDoc(doc(db, "bookings", id))
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by server name..." 
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
                <TableHead className="font-bold">SERVER NAME</TableHead>
                <TableHead className="font-bold">DATE</TableHead>
                <TableHead className="font-bold">TIME SLOT</TableHead>
                <TableHead className="font-bold text-center">DURATION</TableHead>
                <TableHead className="font-bold">STATUS</TableHead>
                <TableHead className="text-right font-bold">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={6} className="text-center py-10">Memuat data...</TableCell></TableRow>
              ) : filteredBookings?.length === 0 ? (
                <TableRow><TableCell colSpan={6} className="text-center py-10 text-muted-foreground">Belum ada pesanan.</TableCell></TableRow>
              ) : filteredBookings?.map((booking) => (
                <TableRow key={booking.id} className="border-border hover:bg-muted/20">
                  <TableCell className="font-bold">{booking.serverName}</TableCell>
                  <TableCell>{booking.date}</TableCell>
                  <TableCell className="flex items-center gap-2">
                    <Clock className="w-3 h-3 text-primary" />
                    {booking.startTime}
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
                        <DropdownMenuItem className="flex gap-2" onClick={() => updateStatus(booking.id, "Done")}>
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          Mark as Done
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex gap-2" onClick={() => updateStatus(booking.id, "Proses")}>
                          <Clock className="w-4 h-4 text-blue-500" />
                          Mark as Processing
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex gap-2" onClick={() => updateStatus(booking.id, "Cancelled")}>
                          <XCircle className="w-4 h-4 text-destructive" />
                          Cancel Booking
                        </DropdownMenuItem>
                        <DropdownMenuItem className="flex gap-2 text-destructive font-bold" onClick={() => handleDelete(booking.id)}>
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
