"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { useState, useTransition } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { addTask } from "@/actions/task_actions"
import { Loader2, Plus, Clock } from "lucide-react"

export default function CalendarClient({ initialTasks }: { initialTasks: any[] }) {
    const [isPending, startTransition] = useTransition()
    const [title, setTitle] = useState("")
    const [hours, setHours] = useState("1")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!title.trim() || isNaN(Number(hours))) return

        startTransition(async () => {
            await addTask(title, Number(hours))
            setTitle("")
            setHours("1")
        })
    }

    return (
        <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Time Blocking</h1>
                <p className="text-muted-foreground mt-2">Manage your schedule and study sessions.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="flex flex-col gap-6 md:col-span-1">
                    <Card className="bg-background/50 backdrop-blur-xl border-border/50 shadow-sm border-hidden lg:border-solid">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium">Select Date</CardTitle>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                            <Calendar
                                mode="single"
                                selected={new Date()}
                                className="rounded-xl border shadow-sm"
                            />
                        </CardContent>
                    </Card>

                    <Card className="bg-card shadow-sm border-border/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Clock className="w-4 h-4" /> Add Task</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <Input
                                    placeholder="Task title..."
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                                <div className="flex gap-2 items-center">
                                    <Input
                                        type="number"
                                        step="0.5"
                                        min="0.5"
                                        placeholder="Hours"
                                        value={hours}
                                        onChange={(e) => setHours(e.target.value)}
                                        required
                                        className="w-24"
                                    />
                                    <span className="text-sm text-muted-foreground font-medium">hours</span>
                                </div>
                                <Button type="submit" disabled={isPending} className="w-full mt-2">
                                    {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
                                    Schedule
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                <Card className="bg-background/50 backdrop-blur-xl border-border/50 shadow-sm md:col-span-2">
                    <CardHeader>
                        <CardTitle>Daily Blocks</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4 overflow-y-auto h-[600px] pr-2">
                        {initialTasks.length === 0 ? (
                            <div className="flex items-center justify-center text-muted-foreground h-full border-t border-dashed mt-4">
                                No blocks planned. Chat with AI or add manually!
                            </div>
                        ) : (
                            initialTasks.map((task: any) => (
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
