
"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { format } from "date-fns"
import { CalendarIcon, Clock, Gamepad2 } from "lucide-react"
import { useFirestore, useDoc } from "@/firebase"
import { doc } from "firebase/firestore"

interface BookingFormProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  initialDate?: string
}

export default function BookingForm({ isOpen, onOpenChange, initialDate }: BookingFormProps) {
  const db = useFirestore()
  const settingsRef = doc(db, "settings", "global")
  const { data: settings } = useDoc(settingsRef)
  
  const whatsapp = settings?.whatsappNumber || "6282252881812"

  const [formData, setFormData] = useState({
    serverName: "",
    date: format(new Date(), "yyyy-MM-dd"),
    startTime: "08:00",
    duration: "2",
    notes: ""
  })

  // Update date when initialDate changes or when dialog opens
  useEffect(() => {
    if (isOpen && initialDate) {
      setFormData(prev => ({ ...prev, date: initialDate }))
    }
  }, [isOpen, initialDate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const message = `Halo PaulMaker,

Saya ingin booking livestream.

Nama Server: ${formData.serverName}
Tanggal: ${formData.date}
Jam: ${formData.startTime}
Durasi: ${formData.duration} Jam
Catatan: ${formData.notes || "-"}

Mohon informasi ketersediaannya.

Terima kasih.`

    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${whatsapp}?text=${encodedMessage}`, "_blank")
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] bg-card border-border p-0 overflow-hidden">
        <div className="bg-primary/10 p-8 border-b border-border">
          <DialogTitle className="text-2xl font-headline font-bold mb-2">BOOK LIVESTREAM</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Lengkapi form di bawah untuk memesan slot promosi server GTPS Anda.
          </DialogDescription>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="serverName" className="flex items-center gap-2">
                <Gamepad2 className="w-4 h-4 text-primary" />
                Nama Server
              </Label>
              <Input 
                id="serverName" 
                placeholder="Contoh: GTPS" 
                required 
                value={formData.serverName}
                onChange={(e) => setFormData({...formData, serverName: e.target.value})}
                className="bg-background"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date" className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-primary" />
                  Tanggal
                </Label>
                <Input 
                  id="date" 
                  type="date" 
                  required 
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="bg-background"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="startTime" className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  Jam Mulai
                </Label>
                <Input 
                  id="startTime" 
                  type="time" 
                  required 
                  value={formData.startTime}
                  onChange={(e) => setFormData({...formData, startTime: e.target.value})}
                  className="bg-background"
                />
              </div>
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="duration" className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary" />
                Durasi (Jam)
              </Label>
              <Input 
                id="duration" 
                type="number" 
                min="1" 
                max="12" 
                required 
                value={formData.duration}
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
                className="bg-background"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="notes" className="flex items-center gap-2">
                Catatan (Opsional)
              </Label>
              <Textarea 
                id="notes" 
                placeholder="Informasi tambahan atau fitur unik server..." 
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                className="bg-background min-h-[100px]"
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-primary hover:bg-primary/90 font-bold h-12">
            KIRIM BOOKING KE WHATSAPP
          </Button>
          
          <p className="text-center text-xs text-muted-foreground">
            Anda akan diarahkan ke WhatsApp untuk konfirmasi dan pembayaran.
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
