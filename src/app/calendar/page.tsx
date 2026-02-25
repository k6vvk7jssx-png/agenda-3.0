import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { fetchTasks } from "@/actions/task_actions"

export default async function CalendarPage() {
    const tasks = await fetchTasks() || []

    return (
        <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Time Blocking</h1>
                <p className="text-muted-foreground mt-2">Manage your schedule and study sessions.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <Card className="bg-background/50 backdrop-blur-xl border-border/50 shadow-sm md:col-span-1 border-hidden lg:border-solid h-fit">
                    <CardHeader>
                        <CardTitle className="text-sm font-medium">Select Date</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                        <Calendar
                            mode="single"
                            className="rounded-xl border shadow-sm"
                        />
                    </CardContent>
                </Card>

                <Card className="bg-background/50 backdrop-blur-xl border-border/50 shadow-sm md:col-span-2">
                    <CardHeader>
                        <CardTitle>Daily Blocks</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4 overflow-y-auto h-[450px]">
                        {tasks.length === 0 ? (
                            <div className="flex items-center justify-center text-muted-foreground h-full border-t border-dashed mt-4">
                                No blocks planned. Chat with AI to add some!
                            </div>
                        ) : (
                            tasks.map((task: any) => (
                                <div key={task.id} className="relative pl-6 py-4 border-l-2 border-primary/30 hover:border-primary transition-colors">
                                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-6" />
                                    <h3 className={`font-semibold text-lg ${task.is_completed ? 'line-through text-muted-foreground' : ''}`}>{task.title}</h3>
                                    <p className="text-muted-foreground text-sm flex gap-2">
                                        <span>{new Date(task.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                        <span>-</span>
                                        <span>{new Date(task.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </p>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
