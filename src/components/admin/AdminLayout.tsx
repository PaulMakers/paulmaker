"use client"

import { SidebarProvider, Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar"
import { LayoutDashboard, Calendar, MessageSquare, Settings, LogOut, ShieldCheck, User, Loader2 } from "lucide-react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import { useUser, useAuth } from "@/firebase"
import { useEffect } from "react"
import { signOut } from "firebase/auth"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  const auth = useAuth()
  const { user, isLoading } = useUser()
  const logo = PlaceHolderImages.find(img => img.id === "logo")

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/admin/login")
    }
  }, [user, isLoading, router])

  const handleLogout = async () => {
    await signOut(auth)
    router.push("/admin/login")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    )
  }

  if (!user) return null

  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { name: "Bookings", icon: Calendar, href: "/admin/bookings" },
    { name: "Testimonials", icon: MessageSquare, href: "/admin/testimonials" },
    { name: "Settings", icon: Settings, href: "/admin/settings" },
  ]

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background text-foreground">
        <Sidebar className="border-r border-border bg-card">
          <SidebarHeader className="p-6">
            <Link href="/" className="flex items-center gap-3">
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
              <span className="font-headline font-bold text-lg tracking-tight uppercase">PAULMAKER</span>
            </Link>
          </SidebarHeader>
          
          <SidebarContent className="px-4 py-2">
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href}
                    className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                      pathname === item.href 
                      ? "bg-primary text-white hover:bg-primary" 
                      : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <Link href={item.href}>
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          
          <SidebarFooter className="p-4 border-t border-border">
            <div className="flex items-center gap-3 p-2 mb-4 bg-muted/30 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/20">
                <User className="w-5 h-5" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-bold truncate">Admin</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 w-full p-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Logout Session
            </button>
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          <header className="h-20 border-b border-border bg-card flex items-center justify-between px-8 shrink-0">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-primary w-5 h-5" />
              <h2 className="font-headline font-bold text-xl uppercase">
                {menuItems.find(item => item.href === pathname)?.name || "Panel"}
              </h2>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold">Administrator</p>
                <div className="flex items-center justify-end gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-muted-foreground uppercase">System Online</span>
                </div>
              </div>
            </div>
          </header>
          
          <div className="flex-1 overflow-y-auto p-8">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}