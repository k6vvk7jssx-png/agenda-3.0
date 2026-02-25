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

export async function addTask(title: string, hours: number) {
    const { userId } = await auth()
    if (!userId) throw new Error("Unauthorized")

    const startTime = new Date()
    const endTime = new Date(startTime.getTime() + hours * 60 * 60 * 1000)

    const { error } = await supabase
        .from("tasks")
        .insert({
            user_id: userId,
            title,
            start_time: startTime.toISOString(),
            end_time: endTime.toISOString(),
            is_completed: false
        })

    if (error) {
        console.error("Error adding task:", error)
        throw new Error("Failed to add task")
    }

    revalidatePath("/")
    revalidatePath("/calendar")
}
