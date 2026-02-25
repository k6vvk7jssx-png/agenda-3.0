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
