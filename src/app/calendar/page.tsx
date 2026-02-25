import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"

export default function CalendarPage() {
    return (
        <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Time Blocking</h1>
                <p className="text-muted-foreground mt-2">Manage your schedule and study sessions.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="bg-background/50 backdrop-blur-xl border-border/50 shadow-sm md:col-span-1 border-hidden lg:border-solid">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Select Date</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <Calendar
                            mode="single"
                            className="rounded-xl border"
                        />
                    </CardContent>
                </Card>

                {/* Placeholder Blocks */}
                <Card className="bg-background/50 backdrop-blur-xl border-border/50 shadow-sm md:col-span-2">
                    <CardHeader>
                        <CardTitle>Daily Blocks</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center text-muted-foreground h-[350px] border-t border-dashed">
                        [Time Blocks Interface Placeholder]
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
