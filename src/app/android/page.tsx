
"use client"

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Smartphone, Copy, Check, ExternalLink, Download, ShieldCheck, Terminal } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function AndroidPage() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)

  const hostsConfig = `5.39.46.38 growtopia1.com
5.39.46.38 growtopia2.com
5.39.46.38 www.growtopia1.com
5.39.46.38 www.growtopia2.com`

  const handleCopy = () => {
    navigator.clipboard.writeText(hostsConfig)
    setCopied(true)
    toast({
      title: "Config Copied!",
      description: "Salin ke PowerTunnel atau Hosts Editor Anda.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <header className="text-center mb-12">
              <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-primary/30">
                <Smartphone className="w-10 h-10 text-primary" />
              </div>
              <h1 className="font-headline font-bold text-4xl md:text-5xl mb-4 uppercase tracking-tight">
                ANDROID <span className="text-primary">CONNECTION</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Cara termudah untuk bergabung ke PaulMaker GTPS melalui perangkat Android Anda.
              </p>
            </header>

            <div className="space-y-8">
              {/* Main Config Card */}
              <Card className="gaming-card p-8 bg-card/80 backdrop-blur-xl border-primary/20">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-headline font-bold text-xl flex items-center gap-2">
                    <Terminal className="text-primary w-5 h-5" />
                    HOSTS CONFIGURATION
                  </h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleCopy}
                    className="flex gap-2 font-bold border-primary/30 hover:bg-primary/10"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    {copied ? "COPIED" : "COPY CONFIG"}
                  </Button>
                </div>

                <div className="bg-black/50 p-6 rounded-xl border border-border font-mono text-sm leading-relaxed text-primary/90 mb-6 overflow-x-auto">
                  <pre>{hostsConfig}</pre>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="/android/hosts" target="_blank" className="w-full">
                    <Button variant="secondary" className="w-full font-bold flex gap-2 h-12">
                      <Download className="w-4 h-4" />
                      OPEN RAW FILE
                    </Button>
                  </a>
                  <a href="https://dash.gtps.cloud/android/2418" target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button className="w-full bg-primary hover:bg-primary/90 font-bold flex gap-2 h-12">
                      <ExternalLink className="w-4 h-4" />
                      GTPS CLOUD DASHBOARD
                    </Button>
                  </a>
                </div>
              </Card>

              {/* Instructions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="gaming-card p-6 border-border">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center mb-4">
                    <span className="font-bold text-primary">01</span>
                  </div>
                  <h4 className="font-bold mb-2 uppercase">Gunakan PowerTunnel</h4>
                  <p className="text-sm text-muted-foreground">
                    Unduh aplikasi PowerTunnel di Play Store. Masuk ke menu Hosts, lalu tambahkan link <strong>paulmaker.site/android/hosts</strong> atau tempel config di atas.
                  </p>
                </Card>

                <Card className="gaming-card p-6 border-border">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center mb-4">
                    <span className="font-bold text-primary">02</span>
                  </div>
                  <h4 className="font-bold mb-2 uppercase">Aktifkan VPN</h4>
                  <p className="text-sm text-muted-foreground">
                    Setelah config terpasang, aktifkan tombol 'Connect' di PowerTunnel. Sekarang Anda bisa membuka Growtopia dan masuk secara otomatis.
                  </p>
                </Card>
              </div>

              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 flex items-start gap-4">
                <ShieldCheck className="w-6 h-6 text-primary shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-sm mb-1">PRO-TIP</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Jika Anda menggunakan <strong>Hosts Editor</strong> (untuk HP Root), Anda bisa langsung menempelkan baris IP di atas ke dalam file /etc/hosts sistem Anda.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
