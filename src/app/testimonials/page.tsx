
"use client"

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Gamepad2, ExternalLink, ImageIcon, RefreshCw } from "lucide-react"
import Image from "next/image"
import { useFirestore, useDoc, useCollection } from "@/firebase"
import { collection, query, orderBy, doc } from "firebase/firestore"
import { useMemo, useState, useEffect } from "react"

interface TestimonialData {
  id: string
  serverName: string
  duration: string
  playersReached: string
  imageUrl: string
}

export default function TestimonialsPage() {
  const db = useFirestore()
  const settingsRef = doc(db, "settings", "global")
  const { data: settings } = useDoc(settingsRef)
  
  const [sheetData, setSheetData] = useState<TestimonialData[]>([])
  const [isSheetLoading, setIsSheetLoading] = useState(false)

  // Fallback to Firestore
  const testimonialsQuery = useMemo(() => {
    return query(collection(db, "testimonials"), orderBy("createdAt", "desc"))
  }, [db])
  const { data: firestoreTestimonials, isLoading: isFirestoreLoading } = useCollection(testimonialsQuery)

  // Fetch from Google Sheets if URL exists
  useEffect(() => {
    const fetchSheetData = async () => {
      if (!settings?.googleSheetTestimonialsUrl) return
      
      setIsSheetLoading(true)
      try {
        const response = await fetch(settings.googleSheetTestimonialsUrl)
        const text = await response.text()
        
        // Simple CSV parsing (assuming: Nama, Durasi, Reach, ImageURL)
        const rows = text.split("\n").slice(1) // Skip header
        const parsed: TestimonialData[] = rows
          .filter(row => row.trim().length > 0)
          .map((row, index) => {
            const [serverName, duration, playersReached, imageUrl] = row.split(",").map(cell => cell.trim())
            return {
              id: `sheet-${index}`,
              serverName: serverName || "Unknown Server",
              duration: duration || "-",
              playersReached: playersReached || "0",
              imageUrl: imageUrl || ""
            }
          })
        setSheetData(parsed)
      } catch (error) {
        console.error("Failed to fetch Google Sheets data:", error)
      } finally {
        setIsSheetLoading(false)
      }
    }

    fetchSheetData()
  }, [settings?.googleSheetTestimonialsUrl])

  const displayTestimonials = settings?.googleSheetTestimonialsUrl ? sheetData : firestoreTestimonials
  const isLoading = settings?.googleSheetTestimonialsUrl ? isSheetLoading : isFirestoreLoading

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <header className="mb-16 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold mb-4 uppercase tracking-widest">
                <RefreshCw className="w-3 h-3" />
                Real-time Data Sync Enabled
              </div>
              <h1 className="font-headline font-bold text-4xl md:text-5xl lg:text-6xl mb-6 uppercase tracking-tight">
                CLIENT <span className="text-primary">RESULTS</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Lihat hasil nyata dari promosi livestream yang kami lakukan. Ribuan pemain baru bergabung ke server partner kami setiap harinya.
              </p>
            </header>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3].map(i => (
                  <Card key={i} className="gaming-card h-[400px] animate-pulse bg-card/50" />
                ))}
              </div>
            ) : displayTestimonials?.length === 0 ? (
              <div className="text-center py-20 bg-card border border-border rounded-2xl">
                <p className="text-muted-foreground">Belum ada testimoni yang ditampilkan.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayTestimonials.map((item) => (
                  <Card key={item.id} className="gaming-card overflow-hidden group border-border bg-card">
                    <div className="relative aspect-video overflow-hidden bg-muted">
                      {item.imageUrl ? (
                        <Image 
                          src={item.imageUrl} 
                          alt={item.serverName}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          unoptimized // Google Sheets images might need this if from random hosts
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <ImageIcon className="w-10 h-10 text-muted-foreground/20" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-60"></div>
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-primary hover:bg-primary font-bold">
                          +{item.playersReached} PLAYERS
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                          <Gamepad2 className="w-5 h-5 text-primary" />
                          <h3 className="text-xl font-bold font-headline truncate max-w-[150px]">{item.serverName}</h3>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground text-sm">
                          <Clock className="w-4 h-4" />
                          {item.duration}
                        </div>
                      </div>
                      
                      <p className="text-muted-foreground text-sm mb-6">
                        Kampanye promosi livestream intensif yang berhasil meningkatkan jumlah pemain aktif secara signifikan di {item.serverName}.
                      </p>
                      
                      <button className="flex items-center gap-2 text-primary font-bold text-sm hover:underline">
                        Lihat Detail Promo <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            
            <div className="mt-20 text-center bg-card border border-border rounded-2xl p-12">
              <h3 className="font-headline font-bold text-2xl mb-4">INGIN SERVER ANDA ADA DI SINI?</h3>
              <p className="text-muted-foreground mb-8">Pesan slot streaming Anda sekarang dan rasakan dampaknya.</p>
              <a href="/schedule#book">
                <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-all">
                  BOOK LIVESTREAM NOW
                </button>
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
