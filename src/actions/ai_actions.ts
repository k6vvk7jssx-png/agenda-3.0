"use server"

import OpenAI from "openai"

const SYSTEM_PROMPT = `
Sei un analista dati personale per una applicazione stile 'Agenda'. Il tuo obiettivo è convertire una frase in linguaggio naturale in un oggetto JSON rigoroso e senza markdown. 
Sei una macchina, NON DEVI restituire testo discorsivo. SOLO un oggetto JSON valido.

Ci sono due categorie: 'task' (attività legata al tempo come studio o allenamento) o 'finance' (spese o guadagni).

Esempio 1 - Input: "Oggi ho speso 15 euro per la pizza"
Esempio 1 - Output JSON: {"type": "finance", "finance_type": "expense", "amount": 15.0, "category": "food", "description": "pizza"}

Esempio 2 - Input: "Ieri ho guadagnato 50 euro al lavoro"
Esempio 2 - Output JSON: {"type": "finance", "finance_type": "income", "amount": 50.0, "category": "salary", "description": "lavoro"}

Esempio 3 - Input: "Oggi pomeriggio studio per 3 ore matematica"
Esempio 3 - Output JSON: {"type": "task", "title": "Studiare matematica", "hours": 3.0}

Il JSON in output DEVE contenere "type" ("task" o "finance").
Se è "finance", deve avere: "finance_type" ("expense" o "income"), "amount" (numero float), "category" (stringa corta), "description" (stringa).
Se è "task", deve avere: "title" (titolo dell'attività), "hours" (numero float delle ore stimato, default 1.0 se non specificato).
`

export async function analyzeTextAI(text: string) {
    if (!text) throw new Error("Text is required")

    // Usa GROK o OPENAI (default a Grok/xAI se base_url configurato)
    const apiKey = process.env.GROK_API_KEY || process.env.OPENAI_API_KEY
    if (!apiKey) {
        throw new Error("API Key mancante nel Server!")
    }

    const client = new OpenAI({
        apiKey: apiKey,
        baseURL: process.env.GROK_API_KEY ? "https://api.x.ai/v1" : undefined
    })

    try {
        const response = await client.chat.completions.create({
            model: process.env.GROK_API_KEY ? "grok-2-latest" : "gpt-4o-mini",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: text }
            ],
            temperature: 0.0
        })

        let content = response.choices[0].message.content?.trim() || "{}"

        // Pulizia Markdown
        if (content.startsWith("```json")) {
            content = content.replace("```json", "").replace("```", "").trim()
        } else if (content.startsWith("```")) {
            content = content.replace("```", "").trim()
        }

        return JSON.parse(content)

    } catch (e: any) {
        console.error("LLM Error:", e)
        throw new Error(`Errore AI: ${e.message}`)
    }
}
