
"use client"

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Plus, Info, AlertTriangle, CheckCircle2 } from "lucide-react"
import { useState, useMemo } from "react"
import BookingForm from "@/components/booking/BookingForm"
import { format, addDays, startOfDay } from "date-fns"
import { id } from "date-fns/locale"
import { useCollection, useFirestore } from "@/firebase"
import { collection, query, orderBy, where } from "firebase/firestore"

export default function SchedulePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const db = useFirestore()
  
  // Generate next 7 days dates
  const dates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => addDays(startOfDay(new Date()), i))
  }, [])

  // Fetch all bookings for the next 7 days to calculate density
  const startDateStr = format(dates[0], "yyyy-MM-dd")
  const endDateStr = format(dates[6], "yyyy-MM-dd")

  const bookingsQuery = useMemo(() => {
    return query(
      collection(db, "bookings"),
      where("date", ">=", startDateStr),
      where("date", "<=", endDateStr),
      orderBy("date", "asc")
    )
  }, [db, startDateStr, endDateStr])

  const { data: allBookings, isLoading } = useCollection(bookingsQuery)

  // Fetch today's bookings specifically for the sidebar
  const todayStr = format(new Date(), "yyyy-MM-dd")
  const todayBookings = allBookings?.filter(b => b.date === todayStr) || []

  const nextSevenDays = useMemo(() => {
    return dates.map(date => {
      const dateStr = format(date, "yyyy-MM-dd")
      const dayBookings = allBookings?.filter(b => b.date === dateStr) || []
      
      // Calculate total duration for this day
      const bookedHours = dayBookings.reduce((sum, b) => sum + (Number(b.duration) || 0), 0)
      
      return {
        date,
        bookedHours,
        isFull: bookedHours >= 12,
        isWarning: bookedHours >= 9 && bookedHours < 12
      }
    })
  }, [dates, allBookings])

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <main className="flex-grow pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <header className="mb-12 text-center md:text-left">
              <h1 className="font-headline font-bold text-4xl md:text-5xl mb-4 uppercase tracking-tight">
                LIVESTREAM <span className="text-primary">SCHEDULE</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                Lihat ketersediaan waktu dan pesan slot promosi server Anda secara real-time.
              </p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: 7 Day Grid */}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {nextSevenDays.map((day, idx) => (
                    <Card key={idx} className={`gaming-card p-6 border-l-4 transition-all ${
                      day.isFull ? 'border-l-destructive' : 
                      day.isWarning ? 'border-l-yellow-500' : 'border-l-green-500'
                    }`}>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                            {format(day.date, "EEEE", { locale: id })}
                          </p>
                          <h3 className="text-xl font-bold">{format(day.date, "d MMMM yyyy", { locale: id })}</h3>
                        </div>
                        <Badge 
                          variant={day.isFull ? "destructive" : day.isWarning ? "secondary" : "default"} 
                          className={day.isWarning ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                        >
                          {isLoading ? "LOADING..." : day.isFull ? "FULL" : day.isWarning ? "HAMPIR PENUH" : "AVAILABLE"}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Booking Density</span>
                          <span className="font-bold">{day.bookedHours} / 12 Hours</span>
                        </div>
                        <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-1000 ${
                              day.isFull ? 'bg-destructive' : 
                              day.isWarning ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min((day.bookedHours / 12) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                      
                      <Button 
                        disabled={day.isFull || isLoading}
                        onClick={() => setIsBookingOpen(true)}
                        variant={day.isFull ? "ghost" : "outline"} 
                        className="w-full mt-6 group font-bold"
                      >
                        {day.isFull ? "SUDAH PENUH" : "BOOK THIS DAY"}
                        {!day.isFull && <Plus className="ml-2 w-4 h-4 group-hover:rotate-90 transition-transform" />}
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Right Column: Public Bookings & Rules */}
              <div className="space-y-8">
                <Card id="book" className="gaming-card p-8 bg-card/50 backdrop-blur-sm">
                  <h3 className="font-headline font-bold text-xl mb-6 flex items-center gap-2">
                    <Clock className="text-primary w-5 h-5" />
                    TODAY'S BOOKINGS
                  </h3>
                  
                  <div className="space-y-4">
                    {isLoading ? (
                      <p className="text-sm text-center text-muted-foreground">Memuat jadwal...</p>
                    ) : todayBookings.length === 0 ? (
                      <div className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border opacity-50 border-dashed">
                        <div className="w-2 h-10 bg-green-500/50 rounded-full" />
                        <div>
                          <p className="text-xs text-muted-foreground">All Slots Available</p>
                          <p className="font-bold italic text-sm">Belum ada pesanan hari ini.</p>
                        </div>
                      </div>
                    ) : (
                      todayBookings.map((booking: any) => (
                        <div key={booking.id} className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border">
                          <div className="w-2 h-10 bg-primary rounded-full" />
                          <div>
                            <p className="text-xs text-muted-foreground">{booking.startTime} ({booking.duration}h)</p>
                            <p className="font-bold">{booking.serverName}</p>
                          </div>
                          {booking.status === "Done" && (
                             <Badge variant="outline" className="ml-auto border-green-500 text-green-500 text-[10px]">DONE</Badge>
                          )}
                        </div>
                      ))
                    )}
                  </div>

                  <Button 
                    onClick={() => setIsBookingOpen(true)}
                    className="w-full mt-8 bg-primary hover:bg-primary/90 font-bold h-12 shadow-lg shadow-primary/20"
                  >
                    BOOK NOW
                  </Button>
                </Card>

                <Card className="gaming-card p-8 border-primary/20 bg-primary/5">
                  <h3 className="font-headline font-bold text-xl mb-6 flex items-center gap-2">
                    <Info className="text-primary w-5 h-5" />
                    BOOKING RULES
                  </h3>
                  <ul className="space-y-4 text-sm">
                    <li className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span>Maksimal 12 jam livestream per hari.</span>
                    </li>
                    <li className="flex gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span>Satu slot minimal 1 jam durasi.</span>
                    </li>
                    <li className="flex gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
                      <span>Pembayaran dilakukan di awal melalui WhatsApp.</span>
                    </li>
                    <li className="flex gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0" />
                      <span>Pastikan server online saat jadwal dimulai.</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <BookingForm isOpen={isBookingOpen} onOpenChange={setIsBookingOpen} />
      
      <Footer />
    </div>
  )
}
