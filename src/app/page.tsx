import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CalendarDays, CheckCircle2, Coins } from "lucide-react"
import { TaskItem } from "@/components/shared/task-item"
import { fetchTasks, toggleTaskCompletion } from "@/actions/task_actions"
import { fetchFinances } from "@/actions/finance_actions"

export default async function Dashboard() {
  const tasks = await fetchTasks() || []
  const finances = await fetchFinances() || []

  const completedTasks = tasks.filter(t => t.is_completed).length
  const totalTasks = tasks.length
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const totalBalance = finances.reduce((acc, curr) => curr.type === 'income' ? acc + Number(curr.amount) : acc - Number(curr.amount), 0)

  const upNextTask = tasks.find(t => !t.is_completed)

  return (
    <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground mt-2">Here is a summary of your day and progress.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-background/50 backdrop-blur-xl border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Tasks</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedTasks}/{totalTasks}</div>
            <p className="text-xs text-muted-foreground border-t pt-2 mt-4">
              You are {completionRate}% complete
            </p>
          </CardContent>
        </Card>

        {/* Bilancio Odierno */}
        <Card className="bg-background/50 backdrop-blur-xl border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalBalance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground border-t pt-2 mt-4">
              Includes {finances.length} records
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
            <div className="text-xl font-bold mt-1 line-clamp-1">{upNextTask ? upNextTask.title : "All clear!"}</div>
            <p className="text-sm text-muted-foreground">{upNextTask ? new Date(upNextTask.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Enjoy your rest."}</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mt-4">
        {/* Lista Task */}
        <Card className="bg-background/50 backdrop-blur-xl border-border/50 shadow-sm h-[400px] overflow-y-auto">
          <CardHeader>
            <CardTitle>Schedule</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {tasks.length === 0 ? (
              <div className="text-muted-foreground text-center py-10 border-t border-dashed">No tasks yet. Use the + button to add one!</div>
            ) : (
              tasks.map((task: any) => (
                <TaskItem key={task.id} task={task} />
              ))
            )}
          </CardContent>
        </Card>

        {/* Insight AI */}
        <Card className="bg-primary/5 backdrop-blur-xl border-primary/20 shadow-sm h-[400px]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-xl">✨</span> AI Weekly Insight
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm leading-relaxed text-muted-foreground h-64 border-t border-primary/10 pt-4 flex items-center justify-center text-center px-6">
            <p>"I have successfully linked your data to the cloud Database! As you accumulate tasks and financial records, I'll be able to cross-reference your lifestyle habits and give you personalized insights here."</p>
          </CardContent>
        </Card>
      </div>

    </div>
  )
}
