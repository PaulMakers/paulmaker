"use client"

import AdminLayout from "@/components/admin/AdminLayout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Search, Plus, Trash2, Image as ImageIcon, ExternalLink, Loader2 } from "lucide-react"
import { useState, useMemo } from "react"
import { useCollection, useFirestore } from "@/firebase"
import { collection, deleteDoc, doc, query, orderBy, addDoc, serverTimestamp } from "firebase/firestore"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function AdminTestimonialsPage() {
  const db = useFirestore()
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const [formData, setFormData] = useState({
    serverName: "",
    duration: "",
    playersReached: "",
    imageUrl: ""
  })

  const testimonialsQuery = useMemo(() => {
    return query(collection(db, "testimonials"), orderBy("createdAt", "desc"))
  }, [db])

  const { data: testimonials, isLoading } = useCollection(testimonialsQuery)

  const filteredTestimonials = testimonials?.filter(t => 
    t.serverName?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = async (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus testimoni ini?")) {
      try {
        await deleteDoc(doc(db, "testimonials", id))
        toast({ title: "Terhapus", description: "Testimoni telah dihapus." })
      } catch (e) {
        toast({ variant: "destructive", title: "Gagal", description: "Terjadi kesalahan saat menghapus." })
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await addDoc(collection(db, "testimonials"), {
        ...formData,
        createdAt: serverTimestamp()
      })
      toast({ title: "Berhasil", description: "Testimoni baru telah ditambahkan." })
      setIsModalOpen(false)
      setFormData({ serverName: "", duration: "", playersReached: "", imageUrl: "" })
    } catch (e) {
      toast({ variant: "destructive", title: "Gagal", description: "Gagal menambahkan testimoni." })
    } finally {
      setIsSubmitting(false)
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
          
          <Button 
            className="bg-primary hover:bg-primary/90 flex gap-2 font-bold"
            onClick={() => setIsModalOpen(true)}
          >
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
                    <div className="relative w-16 h-10 rounded overflow-hidden bg-muted border border-border">
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

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle>TAMBAH TESTIMONI BARU</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="grid gap-2">
              <Label>Nama Server</Label>
              <Input 
                required 
                value={formData.serverName} 
                onChange={e => setFormData({...formData, serverName: e.target.value})}
                placeholder="Contoh: GTPS Private"
                className="bg-background"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Durasi Stream (Teks)</Label>
                <Input 
                  required 
                  value={formData.duration} 
                  onChange={e => setFormData({...formData, duration: e.target.value})}
                  placeholder="2 Jam"
                  className="bg-background"
                />
              </div>
              <div className="grid gap-2">
                <Label>Total Player Reach</Label>
                <Input 
                  required 
                  value={formData.playersReached} 
                  onChange={e => setFormData({...formData, playersReached: e.target.value})}
                  placeholder="500+"
                  className="bg-background"
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Image URL (Bukti Jernih)</Label>
              <Input 
                required 
                value={formData.imageUrl} 
                onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                placeholder="https://i.ibb.co/..."
                className="bg-background"
              />
            </div>
            <DialogFooter className="pt-6">
              <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>BATAL</Button>
              <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90 font-bold">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                SIMPAN TESTIMONI
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  )
}