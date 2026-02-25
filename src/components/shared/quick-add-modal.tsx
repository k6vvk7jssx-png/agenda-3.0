"use client"

import { useState } from "react"
import { Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import axios from "axios"

export function QuickAddModal() {
    const [open, setOpen] = useState(false)
    const [inputText, setInputText] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [resultMsg, setResultMsg] = useState("")

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!inputText.trim()) return

        setIsLoading(true)
        setResultMsg("")

        try {
            // 1. Chiamata NLP in Python (proxy locale via Next.js rewrites)
            const res = await axios.post("/api/python/nlp", { text: inputText })
            const data = res.data

            // 2. Controllo risposta LLM ed esecuzione Task (Mock fino al deploy supabase backend)
            if (data.type === "finance") {
                setResultMsg(`Aggiunta transazione serverless! ${data.finance_type === "income" ? '+' : '-'}$${data.amount} per ${data.description}`)
                // In futuro si chiamerà qui `addFinance` server action
            } else if (data.type === "task") {
                setResultMsg(`Aggiunto Task serverless! "${data.title}" per ${data.hours} ore.`)
                // In futuro si chiamerà qui `addTask` server action
            } else {
                setResultMsg("Errore di decodifica JSON dall'AI.")
            }

            setTimeout(() => {
                setOpen(false)
                setInputText("")
                setResultMsg("")
            }, 2500)

        } catch (error) {
            console.error(error)
            setResultMsg("Errore backend. Assicurati che l'API Key e il server Python siano online.")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="fixed bottom-8 right-8 h-14 w-14 rounded-full shadow-2xl bg-primary hover:scale-105 transition-transform">
                    <Plus className="h-6 w-6" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md bg-background/80 backdrop-blur-2xl border-border/50">
                <DialogHeader>
                    <DialogTitle>Quick AI Add</DialogTitle>
                    <DialogDescription>
                        Type naturally what you did or what you spent. Our AI will categorize it.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
                    <Input
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        placeholder='e.g., "Spent $15 for lunch" or "Studied Math for 2 hours"'
                        className="h-12 bg-background/50 text-base shadow-inner"
                        disabled={isLoading}
                        autoFocus
                    />
                    <Button type="submit" className="w-full h-12 text-md font-medium" disabled={isLoading}>
                        {isLoading ? <Loader2 className="animate-spin h-5 w-5 mr-2" /> : "Let AI Handle It ✨"}
                    </Button>

                    {resultMsg && (
                        <p className="text-sm font-medium text-center mt-2 p-2 bg-muted rounded-md">{resultMsg}</p>
                    )}
                </form>
            </DialogContent>
        </Dialog>
    )
}
