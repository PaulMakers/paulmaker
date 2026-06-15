import Navbar from "@/components/layout/Navbar"
import Hero from "@/components/home/Hero"
import Stats from "@/components/home/Stats"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CheckCircle2, ShieldCheck, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-grid">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Stats />
        
        {/* Why Us Section */}
        <section className="py-24 container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-headline font-bold text-4xl md:text-5xl mb-6">
                PROMOTING YOUR <span className="text-primary">GTPS</span> <br />
                WITH EXPERTISE
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Kami memahami ekosistem Growtopia Private Server. Dengan ribuan jam pengalaman streaming, kami tahu cara menarik pemain baru ke server Anda.
              </p>
              
              <ul className="space-y-6 mb-10">
                {[
                  "High Quality 1080p 60fps Stream Quality",
                  "Professional Interaction with Viewers",
                  "Automated Promotion across TikTok & WhatsApp",
                  "Transparent Schedule & Affordable Pricing"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <div className="bg-primary/20 p-1 rounded-full">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link href="/schedule">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold">
                  CHECK AVAILABLE TIME <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="gaming-card p-8 rounded-2xl bg-card border border-border">
                <Zap className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-headline font-bold text-xl mb-2">Fast Boost</h3>
                <p className="text-muted-foreground text-sm">Lihat lonjakan pemain hanya dalam hitungan menit setelah stream dimulai.</p>
              </div>
              <div className="gaming-card p-8 rounded-2xl bg-card border border-border mt-8">
                <ShieldCheck className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-headline font-bold text-xl mb-2">Safe & Reliable</h3>
                <p className="text-muted-foreground text-sm">Tanpa resiko, promosi organik murni dari audiens setia kami.</p>
              </div>
              <div className="gaming-card p-8 rounded-2xl bg-card border border-border">
                <Users className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-headline font-bold text-xl mb-2">Targeted Ads</h3>
                <p className="text-muted-foreground text-sm">Target audiens khusus pemain GTPS aktif di seluruh Indonesia.</p>
              </div>
              <div className="gaming-card p-8 rounded-2xl bg-card border border-border mt-8">
                <Crown className="w-10 h-10 text-primary mb-4" />
                <h3 className="font-headline font-bold text-xl mb-2">Elite Content</h3>
                <p className="text-muted-foreground text-sm">Kualitas stream gaming professional setara organisasi Esports.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary opacity-5"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="bg-card border border-border rounded-3xl p-12 text-center max-w-4xl mx-auto shadow-2xl">
              <h2 className="font-headline font-bold text-4xl mb-6 uppercase">SIAP MENINGKATKAN SERVER ANDA?</h2>
              <p className="text-xl text-muted-foreground mb-10">Hanya Rp10.000 per jam. Booking sekarang sebelum jadwal penuh!</p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <Link href="/schedule#book">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-14 px-10 text-lg w-full sm:w-auto">
                    BOOK LIVESTREAM NOW
                  </Button>
                </Link>
                <a href="https://whatsapp.com/channel/0029VbCIGLo8qIzzpS3UQf37" target="_blank" rel="noopener noreferrer">
                  <Button size="lg" variant="outline" className="h-14 px-10 text-lg w-full sm:w-auto">
                    JOIN WA CHANNEL
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

import { Crown, Users } from "lucide-react"
