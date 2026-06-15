"use client"

import AdminLayout from "@/components/admin/AdminLayout"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Save, Globe, MessageCircle, Gamepad2, Info } from "lucide-react"

export default function SettingsAdminPage() {
  const [loading, setLoading] = useState(false)

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
                <Label>Brand Name</Label>
                <Input defaultValue="PAULMAKER STREAMING SERVICE" className="bg-background border-border" />
              </div>
              <div className="grid gap-2">
                <Label>Tagline</Label>
                <Input defaultValue="Professional GTPS Livestream Promotion Service" className="bg-background border-border" />
              </div>
              <div className="grid gap-2">
                <Label>Price Per Hour (Rp)</Label>
                <Input type="number" defaultValue="10000" className="bg-background border-border" />
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
                <Input defaultValue="6282252881812" className="bg-background border-border" />
              </div>
              <div className="grid gap-2">
                <Label>TikTok URL</Label>
                <Input defaultValue="tiktok.com/@paulmaker.official" className="bg-background border-border" />
              </div>
              <div className="grid gap-2">
                <Label>WhatsApp Channel URL</Label>
                <Input defaultValue="https://whatsapp.com/channel/0029VbCIGLo8qIzzpS3UQf37" className="bg-background border-border" />
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
                <Input defaultValue="PaulMaker Stream | GTPS Livestream Promotion" className="bg-background border-border" />
              </div>
              <div className="grid gap-2">
                <Label>Meta Keywords</Label>
                <Input defaultValue="GTPS, Growtopia, Livestream, Promo" className="bg-background border-border" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label>Meta Description</Label>
                <Textarea 
                  defaultValue="Professional GTPS Livestream Promotion Service. Boost your server visibility for only Rp10.000/Hour." 
                  className="bg-background border-border min-h-[100px]" 
                />
              </div>
            </div>
          </div>
        </Card>

        <div className="flex justify-end pt-4">
          <Button 
            className="bg-primary hover:bg-primary/90 font-bold h-12 px-10 text-lg flex gap-2"
            onClick={() => setLoading(true)}
            disabled={loading}
          >
            <Save className="w-5 h-5" />
            {loading ? "SAVING..." : "SAVE CHANGES"}
          </Button>
        </div>
      </div>
    </AdminLayout>
  )
}
