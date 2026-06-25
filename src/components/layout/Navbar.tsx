"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Crown, Calendar, MessageSquare, ShieldCheck, Menu, X, Smartphone } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const logo = PlaceHolderImages.find(img => img.id === "logo")

  const navLinks = [
    { name: "Home", href: "/", icon: Crown },
    { name: "Schedule", href: "/schedule", icon: Calendar },
    { name: "Testimonials", href: "/testimonials", icon: MessageSquare },
    { name: "Android", href: "/android", icon: Smartphone },
  ]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-lg rounded-full group-hover:bg-primary/40 transition-all"></div>
              <div className="relative w-10 h-10 overflow-hidden rounded-lg border border-primary/20 bg-card flex items-center justify-center">
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
            </div>
            <span className="font-headline font-bold text-xl tracking-tight hidden sm:inline-block uppercase">
              PAULMAKER <span className="text-primary">STREAM</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href ? "text-primary" : "text-muted-foreground"
                )}
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="hidden sm:flex gap-2">
                <ShieldCheck className="w-4 h-4" />
                Admin
              </Button>
            </Link>
            <Link href="/schedule#book">
              <Button className="bg-primary hover:bg-primary/90 text-white font-bold">
                BOOK NOW
              </Button>
            </Link>
            
            {/* Mobile Toggle */}
            <button 
              className="md:hidden p-2"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-card border-b border-border p-4 animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg text-lg font-medium transition-all",
                  pathname === link.href ? "bg-primary/10 text-primary border border-primary/20" : "text-foreground hover:bg-muted"
                )}
              >
                <link.icon className="w-5 h-5" />
                {link.name}
              </Link>
            ))}
            <Link href="/admin" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full justify-start gap-3">
                <ShieldCheck className="w-5 h-5" />
                Admin Dashboard
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
