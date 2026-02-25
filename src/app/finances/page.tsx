import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FinancesPage() {
    return (
        <div className="flex flex-col gap-8 w-full max-w-6xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Financial Tracker</h1>
                <p className="text-muted-foreground mt-2">Track spending attached to your daily tasks.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-1">
                <Card className="bg-background/50 backdrop-blur-xl border-border/50 shadow-sm">
                    <CardHeader>
                        <CardTitle>Transactions Log</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center justify-center text-muted-foreground h-[400px] border-t border-dashed">
                        [Transactions Log Placeholder]
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
