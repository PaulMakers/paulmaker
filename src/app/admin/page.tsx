"use client"

import AdminLayout from "@/components/admin/AdminLayout"
import { Card } from "@/components/ui/card"
import { Calendar, Clock, MessageSquare, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area 
} from 'recharts'

export default function AdminDashboard() {
  const stats = [
    { label: "Total Bookings", value: "254", icon: Calendar, color: "text-blue-500", trend: "+12%" },
    { label: "Pending Booking", value: "12", icon: AlertCircle, color: "text-yellow-500", trend: "-2%" },
    { label: "Done Booking", value: "230", icon: CheckCircle2, color: "text-green-500", trend: "+5%" },
    { label: "Stream Hours", value: "1,240", icon: Clock, color: "text-red-500", trend: "+18%" },
  ]

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

          {/* Quick Actions / Recent Activity */}
          <Card className="gaming-card p-8 bg-card">
            <h3 className="font-headline font-bold text-xl uppercase mb-8">Quick Actions</h3>
            <div className="space-y-4">
              <button className="w-full h-12 flex items-center justify-between px-4 rounded-lg bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-white transition-all group font-bold">
                <span>NEW BOOKING</span>
                <Calendar className="w-5 h-5" />
              </button>
              <button className="w-full h-12 flex items-center justify-between px-4 rounded-lg bg-secondary border border-border text-foreground hover:border-primary transition-all group font-bold">
                <span>UPLOAD TESTIMONIAL</span>
                <MessageSquare className="w-5 h-5" />
              </button>
              <button className="w-full h-12 flex items-center justify-between px-4 rounded-lg bg-secondary border border-border text-foreground hover:border-primary transition-all group font-bold">
                <span>GENERATE AI PROMO</span>
                <TrendingUp className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-12">
              <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-6">Recent Activity</h4>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
                  <div>
                    <p className="text-sm font-bold">New Booking: MafiaPS</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                  <div>
                    <p className="text-sm font-bold">Status Updated: DragonPS</p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
