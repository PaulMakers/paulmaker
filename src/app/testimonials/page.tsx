"use client"

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Gamepad2, ExternalLink } from "lucide-react"
import Image from "next/image"

export default function TestimonialsPage() {
  const testimonials = [
    { id: 1, server: "MafiaPS", duration: "4 Hours", players: "+150 New Users", image: "https://picsum.photos/seed/gtps1/600/400" },
    { id: 2, server: "DragonPS", duration: "6 Hours", players: "+300 New Users", image: "https://picsum.photos/seed/gtps2/600/400" },
    { id: 3, server: "GalaxyGT", duration: "2 Hours", players: "+80 New Users", image: "https://picsum.photos/seed/gtps3/600/400" },
    { id: 4, server: "RivalGT", duration: "12 Hours", players: "+800 New Users", image: "https://picsum.photos/seed/gtps4/600/400" },
    { id: 5, server: "HeroicPS", duration: "3 Hours", players: "+120 New Users", image: "https://picsum.photos/seed/gtps5/600/400" },
    { id: 6, server: "EliteGrow", duration: "5 Hours", players: "+250 New Users", image: "https://picsum.photos/seed/gtps6/600/400" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <header className="mb-16 text-center">
              <h1 className="font-headline font-bold text-4xl md:text-5xl lg:text-6xl mb-6 uppercase tracking-tight">
                CLIENT <span className="text-primary">RESULTS</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Lihat hasil nyata dari promosi livestream yang kami lakukan. Ribuan pemain baru bergabung ke server partner kami setiap harinya.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((item) => (
                <Card key={item.id} className="gaming-card overflow-hidden group border-border bg-card">
                  <div className="relative aspect-video overflow-hidden">
                    <Image 
                      src={item.image} 
                      alt={item.server}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      data-ai-hint="growtopia screenshot"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60"></div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-primary hover:bg-primary font-bold">{item.players}</Badge>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <Gamepad2 className="w-5 h-5 text-primary" />
                        <h3 className="text-xl font-bold font-headline">{item.server}</h3>
                      </div>
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <Clock className="w-4 h-4" />
                        {item.duration}
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-6">
                      Kampanye promosi livestream intensif yang berhasil meningkatkan jumlah pemain aktif secara signifikan.
                    </p>
                    
                    <button className="flex items-center gap-2 text-primary font-bold text-sm hover:underline">
                      Lihat Detail Promo <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="mt-20 text-center bg-card border border-border rounded-2xl p-12">
              <h3 className="font-headline font-bold text-2xl mb-4">INGIN SERVER ANDA ADA DI SINI?</h3>
              <p className="text-muted-foreground mb-8">Pesan slot streaming Anda sekarang dan rasakan dampaknya.</p>
              <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-8 rounded-lg transition-all">
                BOOK LIVESTREAM NOW
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
