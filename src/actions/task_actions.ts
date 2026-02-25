"use server"

import { supabase } from "@/lib/supabase"
import { auth } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export async function fetchTasks() {
    const { userId } = await auth()
    if (!userId) throw new Error("Unauthorized")

    const { data, error } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", userId)
        .order("start_time", { ascending: true })

    if (error) {
        console.error("Error fetching tasks:", error)
        return []
    }

    return data
}

export async function toggleTaskCompletion(taskId: string, currentStatus: boolean) {
    const { userId } = await auth()
    if (!userId) throw new Error("Unauthorized")

    const { error } = await supabase
        .from("tasks")
        .update({ is_completed: !currentStatus })
        .eq("id", taskId)
        .eq("user_id", userId)

    if (error) {
        console.error("Error toggling task:", error)
        throw new Error("Failed to update task")
    }

    revalidatePath("/")
    revalidatePath("/calendar")
}
