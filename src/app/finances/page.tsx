import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchFinances } from "@/actions/finance_actions"
import { ArrowDownRight, ArrowUpRight, DollarSign } from "lucide-react"

export default async function FinancesPage() {
    const finances = await fetchFinances() || []

    const income = finances.filter(f => f.type === 'income').reduce((acc, curr) => acc + Number(curr.amount), 0)
    const expenses = finances.filter(f => f.type === 'expense').reduce((acc, curr) => acc + Number(curr.amount), 0)
    const balance = income - expenses

    return (
        <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Financial Tracker</h1>
                <p className="text-muted-foreground mt-2">Track spending attached to your daily tasks.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-background/50 shadow-sm border-border/50">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <CardTitle className="text-sm font-medium">Income</CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-500">+${income.toFixed(2)}</div>
                    </CardContent>
                </Card>
                <Card className="bg-background/50 shadow-sm border-border/50">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <CardTitle className="text-sm font-medium">Expenses</CardTitle>
                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-500">-${expenses.toFixed(2)}</div>
                    </CardContent>
                </Card>
                <Card className="bg-background/50 shadow-sm border-border/50 border-primary/20">
                    <CardHeader className="pb-2 flex flex-row items-center justify-between">
                        <CardTitle className="text-sm font-medium">Net Balance</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${balance.toFixed(2)}</div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-1 mt-4">
                <Card className="bg-background/50 backdrop-blur-xl border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle>Transactions Log</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                        {finances.length === 0 ? (
                            <div className="flex items-center justify-center text-muted-foreground h-40 border-t border-dashed">
                                No transactions yet. Add via AI logic!
                            </div>
                        ) : (
                            finances.map((f: any) => (
                                <div key={f.id} className="flex items-center justify-between p-4 border rounded-xl bg-card">
                                    <div className="flex items-center gap-4">
                                        <div className={`p-3 rounded-full ${f.type === 'income' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                            {f.type === 'income' ? <ArrowUpRight className="h-5 w-5" /> : <ArrowDownRight className="h-5 w-5" />}
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="font-semibold capitalize">{f.category || f.type}</span>
                                            <span className="text-xs text-muted-foreground">{new Date(f.date).toLocaleDateString()}</span>
                                        </div>
                                    </div>
                                    <div className={`text-lg font-bold ${f.type === 'income' ? 'text-green-500' : ''}`}>
                                        {f.type === 'income' ? '+' : '-'}${Number(f.amount).toFixed(2)}
                                    </div>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
