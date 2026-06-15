import Link from "next/link"
import { Crown, MessageCircle, Gamepad2, Info, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="bg-primary p-2 rounded text-white font-bold">PM</div>
              <span className="font-headline font-bold text-2xl">PAULMAKER</span>
            </Link>
            <p className="text-muted-foreground max-w-sm mb-8">
              Professional GTPS Livestream Promotion Service. Kami membantu server Anda mendapatkan exposure maksimal dengan livestream berkualitas tinggi.
            </p>
            <div className="flex gap-4">
              <a href="https://whatsapp.com/channel/0029VbCIGLo8qIzzpS3UQf37" target="_blank" rel="noopener noreferrer" className="p-2 bg-secondary rounded-full hover:bg-primary transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="https://tiktok.com/@paulmaker.official" target="_blank" rel="noopener noreferrer" className="p-2 bg-secondary rounded-full hover:bg-primary transition-colors">
                <Gamepad2 className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-headline font-bold mb-6 flex items-center gap-2">
              <Info className="w-4 h-4 text-primary" />
              QUICK LINKS
            </h4>
            <ul className="space-y-4">
              <li><Link href="/schedule" className="text-muted-foreground hover:text-primary transition-colors">Livestream Schedule</Link></li>
              <li><Link href="/testimonials" className="text-muted-foreground hover:text-primary transition-colors">Success Stories</Link></li>
              <li><Link href="/admin/login" className="text-muted-foreground hover:text-primary transition-colors">Admin Access</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold mb-6 flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-primary" />
              CONTACT
            </h4>
            <ul className="space-y-4 text-muted-foreground">
              <li>WhatsApp: +62 822 5288 1812</li>
              <li>TikTok: @paulmaker.official</li>
              <li>Discord: SOON</li>
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
