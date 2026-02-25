import { fetchTasks } from "@/actions/task_actions"
import CalendarClient from "./calendar-client"

export default async function CalendarPage() {
    const tasks = await fetchTasks() || []

    return <CalendarClient initialTasks={tasks} />
}
