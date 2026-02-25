"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownRight, ArrowUpRight, DollarSign, Plus, Loader2 } from "lucide-react"
import { useState, useTransition } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { addFinance } from "@/actions/finance_actions"

export default function FinancesClient({ initialFinances }: { initialFinances: any[] }) {
    const [isPending, startTransition] = useTransition()
    const [amount, setAmount] = useState("")
    const [type, setType] = useState<"income" | "expense">("expense")
    const [category, setCategory] = useState("")

    const income = initialFinances.filter(f => f.type === 'income').reduce((acc, curr) => acc + Number(curr.amount), 0)
    const expenses = initialFinances.filter(f => f.type === 'expense').reduce((acc, curr) => acc + Number(curr.amount), 0)
    const balance = income - expenses

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!amount || isNaN(Number(amount))) return

        startTransition(async () => {
            await addFinance(type, Number(amount), category || 'general', '')
            setAmount("")
            setCategory("")
        })
    }

    return (
        <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Financial Tracker</h1>
                <p className="text-muted-foreground mt-2">Track spending attached to your daily tasks or add them manually.</p>
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

            <div className="grid gap-6 md:grid-cols-3 mt-4">

                <Card className="bg-card shadow-sm border-border/50 md:col-span-1 h-fit">
                    <CardHeader>
                        <CardTitle>Manual Add</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <Select value={type} onValueChange={(val: any) => setType(val)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="expense">Expense</SelectItem>
                                    <SelectItem value="income">Income</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input
                                type="number"
                                placeholder="Amount ($)"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                            <Input
                                type="text"
                                placeholder="Category (e.g. Food)"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                            <Button type="submit" disabled={isPending} className="w-full">
                                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
                                Add Record
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card className="bg-background/50 backdrop-blur-xl border-border/50 shadow-sm md:col-span-2">
                    <CardHeader>
                        <CardTitle>Transactions Log</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3 overflow-y-auto max-h-[500px]">
                        {initialFinances.length === 0 ? (
                            <div className="flex items-center justify-center text-muted-foreground h-40 border-t border-dashed">
                                No transactions yet. Add one manually or ask the AI!
                            </div>
                        ) : (
                            initialFinances.map((f: any) => (
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
