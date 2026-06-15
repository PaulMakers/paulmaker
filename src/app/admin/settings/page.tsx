
"use client"

import AdminLayout from "@/components/admin/AdminLayout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { Save, Globe, MessageCircle, Info, MessageSquareText } from "lucide-react"
import { useFirestore, useDoc } from "@/firebase"
import { doc, setDoc } from "firebase/firestore"
import { useToast } from "@/hooks/use-toast"

export default function SettingsAdminPage() {
  const db = useFirestore()
  const { toast } = useToast()
  const settingsRef = doc(db, "settings", "global")
  const { data: initialSettings, isLoading } = useDoc(settingsRef)
  
  const [formData, setFormData] = useState({
    pricePerHour: 10000,
    whatsappNumber: "6282252881812",
    tiktokUrl: "tiktok.com/@paulmaker.official",
    discordUrl: "https://discord.gg/ae7h2D5RB2",
    metaTitle: "PaulMaker Stream | GTPS Livestream Promotion Service",
    metaDescription: "Professional GTPS Livestream Promotion Service."
  })

  useEffect(() => {
    if (initialSettings) {
      setFormData(prev => ({ ...prev, ...initialSettings }))
    }
  }, [initialSettings])

  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      await setDoc(settingsRef, formData, { merge: true })
      toast({
        title: "Pengaturan disimpan",
        description: "Data konfigurasi global telah diperbarui.",
      })
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Gagal menyimpan",
        description: "Terjadi kesalahan saat menyimpan data.",
      })
    } finally {
      setSaving(false)
    }
  }

  if (isLoading) return <AdminLayout><div className="p-8">Memuat pengaturan...</div></AdminLayout>

  return (
    <AdminLayout>
      <div className="max-w-4xl space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand Info */}
          <Card className="gaming-card p-8 space-y-6">
            <h3 className="font-headline font-bold text-xl flex items-center gap-2">
              <Globe className="text-primary w-5 h-5" />
              SITE BRANDING
            </h3>
            
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label>Price Per Hour (Rp)</Label>
                <Input 
                  type="number" 
                  value={formData.pricePerHour} 
                  onChange={e => setFormData({...formData, pricePerHour: Number(e.target.value)})}
                  className="bg-background border-border" 
                />
              </div>
            </div>
          </Card>

          {/* Social Links */}
          <Card className="gaming-card p-8 space-y-6">
            <h3 className="font-headline font-bold text-xl flex items-center gap-2">
              <MessageCircle className="text-primary w-5 h-5" />
              SOCIAL & CONTACTS
            </h3>
            
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label>WhatsApp Number</Label>
                <Input 
                  value={formData.whatsappNumber} 
                  onChange={e => setFormData({...formData, whatsappNumber: e.target.value})}
                  className="bg-background border-border" 
                />
              </div>
              <div className="grid gap-2">
                <Label>TikTok URL</Label>
                <Input 
                  value={formData.tiktokUrl} 
                  onChange={e => setFormData({...formData, tiktokUrl: e.target.value})}
                  className="bg-background border-border" 
                />
              </div>
              <div className="grid gap-2">
                <Label>Discord Invite URL</Label>
                <Input 
                  value={formData.discordUrl} 
                  onChange={e => setFormData({...formData, discordUrl: e.target.value})}
                  className="bg-background border-border" 
                />
              </div>
            </div>
          </Card>
        </div>

        {/* SEO & Other */}
        <Card className="gaming-card p-8 space-y-6">
          <h3 className="font-headline font-bold text-xl flex items-center gap-2">
            <Info className="text-primary w-5 h-5" />
            SEO CONFIGURATION
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label>Meta Title</Label>
                <Input 
                  value={formData.metaTitle} 
                  onChange={e => setFormData({...formData, metaTitle: e.target.value})}
                  className="bg-background border-border" 
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label>Meta Description</Label>
                <Textarea 
                  value={formData.metaDescription} 
                  onChange={e => setFormData({...formData, metaDescription: e.target.value})}
                  className="bg-background border-border min-h-[100px]" 
                />
              </div>
            </div>
          </div>
        </Card>

        <div className="flex justify-end pt-4">
          <Button 
            className="bg-primary hover:bg-primary/90 font-bold h-12 px-10 text-lg flex gap-2"
            onClick={handleSave}
            disabled={saving}
          >
            <Save className="w-5 h-5" />
            {saving ? "SAVING..." : "SAVE CHANGES"}
          </Button>
        </div>
      </div>
    </AdminLayout>
  )
}
