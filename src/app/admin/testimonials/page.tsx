"use client"

import AdminLayout from "@/components/admin/AdminLayout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Search, Plus, Trash2, Image as ImageIcon, ExternalLink } from "lucide-react"
import { useState, useMemo } from "react"
import { useCollection, useFirestore } from "@/firebase"
import { collection, deleteDoc, doc, query, orderBy } from "firebase/firestore"
import Image from "next/image"

export default function AdminTestimonialsPage() {
  const db = useFirestore()
  const [searchTerm, setSearchTerm] = useState("")

  const testimonialsQuery = useMemo(() => {
    return query(collection(db, "testimonials"), orderBy("createdAt", "desc"))
  }, [db])

  const { data: testimonials, isLoading } = useCollection(testimonialsQuery)

  const filteredTestimonials = testimonials?.filter(t => 
    t.serverName?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus testimoni ini?")) {
      await deleteDoc(doc(db, "testimonials", id))
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Cari berdasarkan nama server..." 
              className="pl-10 bg-card border-border"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Button className="bg-primary hover:bg-primary/90 flex gap-2 font-bold">
            <Plus className="w-4 h-4" />
            TAMBAH TESTIMONI
          </Button>
        </div>

        <Card className="gaming-card overflow-hidden border-border">
          <Table>
            <TableHeader className="bg-muted/30">
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="font-bold">PREVIEW</TableHead>
                <TableHead className="font-bold">SERVER NAME</TableHead>
                <TableHead className="font-bold">DURATION</TableHead>
                <TableHead className="font-bold">REACH</TableHead>
                <TableHead className="text-right font-bold">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow><TableCell colSpan={5} className="text-center py-10">Memuat data...</TableCell></TableRow>
              ) : filteredTestimonials?.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-center py-10 text-muted-foreground">Belum ada testimoni.</TableCell></TableRow>
              ) : filteredTestimonials?.map((item) => (
                <TableRow key={item.id} className="border-border hover:bg-muted/20">
                  <TableCell>
                    <div className="relative w-16 h-10 rounded overflow-hidden bg-muted">
                      {item.imageUrl ? (
                        <Image src={item.imageUrl} alt={item.serverName} fill className="object-cover" />
                      ) : (
                        <ImageIcon className="w-4 h-4 m-auto mt-3 text-muted-foreground" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-bold">{item.serverName}</TableCell>
                  <TableCell>{item.duration}</TableCell>
                  <TableCell className="text-primary font-bold">{item.playersReached}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
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
