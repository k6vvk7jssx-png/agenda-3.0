"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { toggleTaskCompletion } from "@/actions/task_actions"
import { useTransition } from "react"
import { Loader2 } from "lucide-react"

export function TaskItem({ task }: { task: any }) {
    const [isPending, startTransition] = useTransition()

    const handleToggle = () => {
        startTransition(async () => {
            await toggleTaskCompletion(task.id, task.is_completed)
        })
    }

    return (
        <div className={`flex items-center justify-between p-3 border rounded-lg transition-colors ${task.is_completed ? 'bg-card/30' : 'bg-card/80 hover:bg-card'}`}>
            <div className="flex items-center gap-4">
                <div onClick={handleToggle} className="cursor-pointer">
                    {isPending ? (
                        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    ) : (
                        <Checkbox checked={task.is_completed} className="h-5 w-5" />
                    )}
                </div>
                <div className="flex flex-col">
                    <span className={`font-medium ${task.is_completed ? 'line-through text-muted-foreground' : ''}`}>{task.title}</span>
                    <span className="text-xs text-muted-foreground">
                        {new Date(task.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {" - "}
                        {new Date(task.end_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
            </div>
            <div className="flex items-center">
                <span className={`text-xs px-2 py-1 rounded-full ${task.is_completed ? 'bg-green-500/10 text-green-500' : 'bg-primary/10 text-primary'}`}>
                    {task.is_completed ? 'Done' : 'Pending'}
                </span>
            </div>
        </div>
    )
}
