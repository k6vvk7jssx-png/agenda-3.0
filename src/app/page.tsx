import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, Target, CheckCircle2, Coins } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground mt-2">Here is a summary of your day and progress.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Progressi Studio */}
        <Card className="bg-background/50 backdrop-blur-xl border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Plan</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2/5 Hours</div>
            <p className="text-xs text-muted-foreground border-t pt-2 mt-4">
              <span className="text-primary font-medium">Next:</span> Physics Chap 3
            </p>
          </CardContent>
        </Card>

        {/* Task Completati */}
        <Card className="bg-background/50 backdrop-blur-xl border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Tasks</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3/8</div>
            <p className="text-xs text-muted-foreground border-t pt-2 mt-4">
              You are 35% complete today
            </p>
          </CardContent>
        </Card>

        {/* Bilancio Odierno */}
        <Card className="bg-background/50 backdrop-blur-xl border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Balance</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">-$14.50</div>
            <p className="text-xs text-muted-foreground border-t pt-2 mt-4">
              Includes 2 expense records
            </p>
          </CardContent>
        </Card>

        {/* Prossima Attività (Card Larga) */}
        <Card className="bg-background/50 backdrop-blur-xl border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Up Next</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold mt-1">Gym Workout</div>
            <p className="text-sm text-muted-foreground">17:00 - 18:30</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-4">
        {/* Lista Task */}
        <Card className="bg-background/50 backdrop-blur-xl border-border/50 shadow-sm h-[400px]">
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center text-muted-foreground h-64 border-t border-dashed">
            [Schedule List Placeholder]
          </CardContent>
        </Card>

        {/* Insight AI */}
        <Card className="bg-primary/5 backdrop-blur-xl border-primary/20 shadow-sm h-[400px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-xl">✨</span> AI Weekly Insight
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed text-muted-foreground h-64 border-t border-primary/10 pt-4">
            <p>"Based on your past 7 days, you perform 20% better in your study sessions when you work out in the morning. Consider moving your gym schedule earlier!"</p>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
