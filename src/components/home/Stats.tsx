import { Card } from "@/components/ui/card"
import { BarChart3, Clock, MessageSquare, Gamepad2 } from "lucide-react"

export default function Stats() {
  const stats = [
    { label: "Servers Promoted", value: "84", icon: Gamepad2, color: "text-blue-500" },
    { label: "Live Hours", value: "4,320", icon: Clock, color: "text-red-500" },
    { label: "Real Testimonials", value: "128", icon: MessageSquare, color: "text-green-500" },
    { label: "Total Reach", value: "250K+", icon: BarChart3, color: "text-purple-500" },
  ]

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <Card key={i} className="gaming-card p-8 flex items-center gap-6 group">
              <div className={`p-4 rounded-xl bg-background border border-border group-hover:border-primary/50 transition-colors`}>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
              <div>
                <div className="text-3xl font-headline font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
