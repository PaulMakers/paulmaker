
"use client"

import Link from "next/link"
import { Crown, MessageCircle, Gamepad2, Info, MessageSquareText } from "lucide-react"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { useFirestore, useDoc } from "@/firebase"
import { doc } from "firebase/firestore"

export default function Footer() {
  const db = useFirestore()
  const settingsRef = doc(db, "settings", "global")
  const { data: settings } = useDoc(settingsRef)
  
  const logo = PlaceHolderImages.find(img => img.id === "logo")

  const whatsapp = settings?.whatsappNumber || "6282252881812"
  const tiktok = settings?.tiktokUrl || "https://tiktok.com/@paulmaker.official"
  const discord = settings?.discordUrl || "https://discord.gg/ae7h2D5RB2"

  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="relative w-10 h-10 overflow-hidden rounded bg-card border border-border">
                {logo && (
                  <Image 
                    src={logo.imageUrl} 
                    alt="PaulMaker Logo" 
                    fill 
                    className="object-cover"
                    data-ai-hint={logo.imageHint}
                  />
                )}
              </div>
              <span className="font-headline font-bold text-2xl uppercase tracking-tight">PAULMAKER</span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-8">
              Professional GTPS Livestream Promotion Service. Kami membantu server Anda mendapatkan exposure maksimal dengan livestream berkualitas tinggi.
            </p>
            <div className="flex gap-4">
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-secondary rounded-full hover:bg-primary transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href={tiktok.startsWith('http') ? tiktok : `https://${tiktok}`} target="_blank" rel="noopener noreferrer" className="p-2 bg-secondary rounded-full hover:bg-primary transition-colors">
                <Gamepad2 className="w-5 h-5" />
              </a>
              <a href={discord} target="_blank" rel="noopener noreferrer" className="p-2 bg-secondary rounded-full hover:bg-primary transition-colors">
                <MessageSquareText className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-headline font-bold mb-6 flex items-center gap-2 uppercase">
              <Info className="w-4 h-4 text-primary" />
              Quick Links
            </h4>
            <ul className="space-y-4">
              <li><Link href="/schedule" className="text-muted-foreground hover:text-primary transition-colors">Livestream Schedule</Link></li>
              <li><Link href="/testimonials" className="text-muted-foreground hover:text-primary transition-colors">Success Stories</Link></li>
              <li><Link href="/admin/login" className="text-muted-foreground hover:text-primary transition-colors">Admin Access</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold mb-6 flex items-center gap-2 uppercase">
              <MessageCircle className="w-4 h-4 text-primary" />
              Contact
            </h4>
            <ul className="space-y-4 text-muted-foreground">
              <li>WhatsApp: +{whatsapp}</li>
              <li>TikTok: @paulmaker.official</li>
              <li>
                <a href={discord} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Discord Server
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PAULMAKER STREAM. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">Terms of Service</Link>
            <Link href="#" className="hover:text-foreground">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
