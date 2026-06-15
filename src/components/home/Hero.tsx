import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, ArrowRight, Star, Gamepad2, Users } from "lucide-react"

export default function Hero() {
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
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
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
