
"use client"

import AdminLayout from "@/components/admin/AdminLayout"
import { Card } from "@/components/ui/card"
import { Calendar, Clock, MessageSquare, TrendingUp, AlertCircle, CheckCircle2, MessageCircle, MessageSquareText, ExternalLink, Users } from "lucide-react"
import { 
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip 
} from 'recharts'
import { useFirestore, useDoc, useCollection } from "@/firebase"
import { doc, collection, query, orderBy } from "firebase/firestore"
import { useMemo } from "react"
import Link from "next/link"

export default function AdminDashboard() {
  const db = useFirestore()
  const settingsRef = doc(db, "settings", "global")
  const { data: settings } = useDoc(settingsRef)
  
  const bookingsQuery = useMemo(() => query(collection(db, "bookings")), [db])
  const { data: bookings } = useCollection(bookingsQuery)

  const stats = useMemo(() => {
    if (!bookings) return []
    
    const total = bookings.length
    const pending = bookings.filter(b => b.status === "Pending").length
    const done = bookings.filter(b => b.status === "Done").length
    const totalHours = bookings.reduce((sum, b) => sum + (Number(b.duration) || 0), 0)

    return [
      { label: "Total Bookings", value: total.toString(), icon: Calendar, color: "text-blue-500", trend: "+100%" },
      { label: "Pending Booking", value: pending.toString(), icon: AlertCircle, color: "text-yellow-500", trend: "Live" },
      { label: "Done Booking", value: done.toString(), icon: CheckCircle2, color: "text-green-500", trend: "Updated" },
      { label: "Total Stream Hours", value: `${totalHours}h`, icon: Clock, color: "text-red-500", trend: "Accumulated" },
    ]
  }, [bookings])

  const chartData = [
    { name: 'Mon', hours: 4 },
    { name: 'Tue', hours: 8 },
    { name: 'Wed', hours: 12 },
    { name: 'Thu', hours: 6 },
    { name: 'Fri', hours: 10 },
    { name: 'Sat', hours: 12 },
    { name: 'Sun', hours: 12 },
  ]

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <Card key={i} className="gaming-card p-6 bg-card">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-lg bg-background border border-border`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="flex items-center gap-1 text-xs font-bold text-green-500">
                  <TrendingUp className="w-3 h-3" />
                  {stat.trend}
                </div>
              </div>
              <div className="text-3xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Chart */}
          <Card className="lg:col-span-2 gaming-card p-8 bg-card">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-headline font-bold text-xl uppercase">Booking Density (Current Week)</h3>
              <div className="text-sm text-muted-foreground">Hours / Day</div>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D90429" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#D90429" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2A2A2A" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#BDBDBD'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#BDBDBD'}} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#141414', borderColor: '#2A2A2A', borderRadius: '8px' }}
                    itemStyle={{ color: '#D90429' }}
                  />
                  <Area type="monotone" dataKey="hours" stroke="#D90429" strokeWidth={3} fillOpacity={1} fill="url(#colorHours)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Quick Actions & Social Presence */}
          <div className="space-y-6">
            <Card className="gaming-card p-8 bg-card">
              <h3 className="font-headline font-bold text-xl uppercase mb-8">Quick Actions</h3>
              <div className="space-y-4">
                <Link href="/admin/bookings">
                  <button className="w-full h-12 flex items-center justify-between px-4 rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-white transition-all group font-bold mb-4">
                    <span>MANAGE BOOKINGS</span>
                    <Calendar className="w-5 h-5" />
                  </button>
                </Link>
                <Link href="/admin/testimonials">
                  <button className="w-full h-12 flex items-center justify-between px-4 rounded-lg bg-secondary border border-border text-foreground hover:border-primary transition-all group font-bold">
                    <span>UPLOAD TESTIMONIAL</span>
                    <MessageSquare className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </Card>

            <Card className="gaming-card p-8 bg-card border-primary/20">
              <h3 className="font-headline font-bold text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                Social Presence
              </h3>
              <div className="space-y-4">
                <a 
                  href={`https://wa.me/${settings?.whatsappNumber || "6282252881812"}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border hover:border-green-500 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-bold">WhatsApp Channel</span>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a 
                  href={settings?.discordUrl || "https://discord.gg/ae7h2D5RB2"} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border hover:border-blue-500 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <MessageSquareText className="w-5 h-5 text-blue-500" />
                    <span className="text-sm font-bold">Discord Server</span>
                  </div>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
