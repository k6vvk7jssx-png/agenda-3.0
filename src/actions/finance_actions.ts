"use server"

import { supabase } from "@/lib/supabase"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export async function fetchFinances() {
    const { userId } = await auth()
    if (!userId) throw new Error("Unauthorized")

    const { data, error } = await supabase
        .from("finances")
        .select("*")
        .eq("user_id", userId)
        .order("date", { ascending: false })

    if (error) {
        console.error("Error fetching finances:", error)
        return []
    }

    return data
}

export async function addFinance(type: 'income' | 'expense', amount: number, category: string, description: string) {
    const { userId } = await auth()
    if (!userId) throw new Error("Unauthorized")

    const { error } = await supabase
        .from("finances")
        .insert({
            user_id: userId,
            type,
            amount,
            category: category || type,
            description: description || '',
            date: new Date().toISOString().split('T')[0]
        })

    if (error) {
        console.error("Error adding finance:", error)
        throw new Error("Failed to add finance")
    }

    revalidatePath("/")
    revalidatePath("/finances")
}
