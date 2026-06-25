"use client"

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Apple, Copy, Check, ExternalLink, Download, Terminal, Link as LinkIcon, Info } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function IosPage() {
  const { toast } = useToast()
  const [copied, setCopied] = useState(false)
  const [linkCopied, setLinkCopied] = useState(false)

  const iosConfig = `[General]
bypass-system = true

[Rule]
FINAL,DIRECT

[Host]
growtopia1.com = 5.39.46.38
growtopia2.com = 5.39.46.38
www.growtopia1.com = 5.39.46.38
www.growtopia2.com = 5.39.46.38`

  const appLink = "paulmaker.site/ios/config"

  const handleCopyConfig = () => {
    navigator.clipboard.writeText(iosConfig)
    setCopied(true)
    toast({
      title: "Config Copied!",
      description: "Salin teks ini untuk aplikasi Surge atau Shadowrocket.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://${appLink}`)
    setLinkCopied(true)
    toast({
      title: "Link Copied!",
      description: "Masukkan link ini ke kolom 'Download from URL' di aplikasi Anda.",
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
                <Apple className="w-10 h-10 text-primary" />
              </div>
              <h1 className="font-headline font-bold text-4xl md:text-5xl mb-4 uppercase tracking-tight">
                iOS <span className="text-primary">CONNECTION</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Panduan menghubungkan perangkat iOS ke server kami menggunakan Surge atau Shadowrocket.
              </p>
            </header>

            <div className="space-y-8">
              {/* Surge/Shadowrocket Link Card */}
              <Card className="gaming-card p-8 border-primary bg-primary/5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-headline font-bold text-lg flex items-center gap-2">
                    <LinkIcon className="text-primary w-5 h-5" />
                    LINK DOWNLOAD CONFIG
                  </h3>
                  <Badge className="bg-primary">iOS RECOMMENDED</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">Masukkan link ini ke dalam kolom <strong>External Config</strong> atau <strong>Download from URL</strong>:</p>
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
                    MANUAL CONFIG (INI)
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
                  <pre>{iosConfig}</pre>
                </div>

                <div className="flex justify-center">
                  <a href="/ios/config" target="_blank" className="w-full">
                    <Button variant="secondary" className="w-full font-bold flex gap-2 h-12">
                      <Download className="w-4 h-4" />
                      VIEW RAW CONFIG
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
                    Di aplikasi Shadowrocket, pilih <strong>Add Configuration</strong> > <strong>Download from URL</strong>, lalu tempel link <strong>paulmaker.site/ios/config</strong>.
                  </p>
                </Card>

                <Card className="gaming-card p-6 border-border">
                  <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center mb-4">
                    <span className="font-bold text-primary">02</span>
                  </div>
                  <h4 className="font-bold mb-2 uppercase text-sm">Use Config</h4>
                  <p className="text-xs text-muted-foreground">
                    Setelah terdownload, klik file config tersebut dan pilih <strong>Use Config</strong>. Terakhir, aktifkan VPN di menu utama aplikasi.
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
