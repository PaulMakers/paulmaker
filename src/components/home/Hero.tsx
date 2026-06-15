
"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, ArrowRight, Star, MessageCircle, MessageSquareText } from "lucide-react"
import { useFirestore, useDoc } from "@/firebase"
import { doc } from "firebase/firestore"

export default function Hero() {
  const db = useFirestore()
  const settingsRef = doc(db, "settings", "global")
  const { data: settings } = useDoc(settingsRef)

  const whatsapp = settings?.whatsappNumber || "6282252881812"
  const discord = settings?.discordUrl || "https://discord.gg/ae7h2D5RB2"

  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 blur-[120px] rounded-full animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 blur-[100px] rounded-full animate-pulse-slow"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Star className="w-3 h-3 fill-primary" />
            #1 GTPS PROMOTION SERVICE
          </div>
          
          <h1 className="font-headline font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight mb-6 leading-tight animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            PAULMAKER <br />
            <span className="text-primary glow-red">STREAMING</span> SERVICE
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Professional GTPS Livestream Promotion Service. <br />
            <span className="text-foreground font-semibold">Rp10.000 / Hour</span> to boost your server visibility.
          </p>
          
          <div className="flex flex-col items-center gap-6 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/schedule">
                <Button size="lg" className="h-14 px-8 bg-primary hover:bg-primary/90 text-white font-bold text-lg group">
                  VIEW SCHEDULE
                  <Calendar className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
                </Button>
              </Link>
              <Link href="/schedule#book">
                <Button size="lg" variant="outline" className="h-14 px-8 border-primary/30 hover:bg-primary/10 font-bold text-lg">
                  BOOK NOW
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="flex gap-4">
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold text-green-500 hover:text-green-400 transition-colors">
                <MessageCircle className="w-4 h-4" />
                WhatsApp Channel
              </a>
              <span className="text-muted-foreground/30">|</span>
              <a href={discord} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold text-blue-500 hover:text-blue-400 transition-colors">
                <MessageSquareText className="w-4 h-4" />
                Discord Server
              </a>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-12 border-t border-border animate-in fade-in slide-in-from-bottom-8 duration-700 delay-400">
            <div className="text-center">
              <div className="text-3xl font-headline font-bold text-primary mb-1">50+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Servers Promoted</div>
            </div>
            <div className="text-center border-l border-border">
              <div className="text-3xl font-headline font-bold text-primary mb-1">1,200+</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Stream Hours</div>
            </div>
            <div className="text-center border-l border-border hidden md:block">
              <div className="text-3xl font-headline font-bold text-primary mb-1">100%</div>
              <div className="text-sm text-muted-foreground uppercase tracking-wider">Client Satisfied</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
