"use client"

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Smartphone, Copy, Check, ExternalLink, Download, ShieldCheck, Terminal, Link as LinkIcon } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function AndroidPage() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)

  const hostsConfig = `5.39.46.38 growtopia1.com
5.39.46.38 growtopia2.com
5.39.46.38 www.growtopia1.com
5.39.46.38 www.growtopia2.com`

  const appLink = "paulmaker.site/android/hosts"

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(hostsConfig)
    setCopied(true)
    toast({
      title: "Config Copied!",
      description: "Salin teks ini jika Anda menggunakan manual paste.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${appLink}`)
    setLinkCopied(true)
    toast({
      title: "Link Copied!",
      description: "Masukkan link ini ke kolom 'Download from URL' di PowerTunnel.",
    })
    setTimeout(() => setLinkCopied(false), 2000)
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
                Gunakan link di bawah untuk menghubungkan PowerTunnel ke server kami secara otomatis.
              </p>
            </header>

            <div className="space-y-8">
              {/* PowerTunnel Link Card */}
              <Card className="gaming-card p-8 border-primary bg-primary/5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-headline font-bold text-lg flex items-center gap-2">
                    <LinkIcon className="text-primary w-5 h-5" />
                    LINK UNTUK POWERTUNNEL
                  </h3>
                  <Badge className="bg-primary">RECOMMENDED</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Masukkan link ini ke dalam PowerTunnel agar otomatis terupdate:</p>
                <div className="flex items-center gap-2 bg-black/50 p-4 rounded-xl border border-primary/20 mb-6">
                  <code className="flex-1 text-primary font-bold">{appLink}</code>
                  <Button size="sm" variant="ghost" onClick={handleCopyLink} className="hover:bg-primary/20">
                    {linkCopied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </Card>

              {/* Manual Config Card */}
              <Card className="gaming-card p-8 bg-card/80 backdrop-blur-xl border-border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-headline font-bold text-xl flex items-center gap-2">
                    <Terminal className="text-primary w-5 h-5" />
                    MANUAL CONFIG
                  </h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleCopyConfig}
                    className="flex gap-2 font-bold border-border hover:bg-primary/10"
                  >
                    {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                    {copied ? "COPIED" : "COPY TEXT"}
                  </Button>
                </div>

                <div className="bg-black/50 p-6 rounded-xl border border-border font-mono text-xs leading-relaxed text-muted-foreground mb-6 overflow-x-auto">
                  <pre>{hostsConfig}</pre>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a href="/android/hosts" target="_blank" className="w-full">
                    <Button variant="secondary" className="w-full font-bold flex gap-2 h-12">
                      <Download className="w-4 h-4" />
                      VIEW RAW TEXT
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
                  <h4 className="font-bold mb-2 uppercase text-sm">Download URL</h4>
                  <p className="text-xs text-muted-foreground">
                    Di PowerTunnel, masuk ke <strong>Hosts</strong> {">"} <strong>Download from URL</strong>, lalu tempel link <strong>paulmaker.site/android/hosts</strong>.
                  </p>
                </Card>

                <Card className="gaming-card p-6 border-border">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center mb-4">
                    <span className="font-bold text-primary">02</span>
                  </div>
                  <h4 className="font-bold mb-2 uppercase text-sm">Aktifkan Proxy</h4>
                  <p className="text-xs text-muted-foreground">
                    Kembali ke menu utama, tekan tombol <strong>Connect</strong>. Jika sudah biru/aktif, silakan buka Growtopia Anda.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
