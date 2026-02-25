import os
import json
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from openai import OpenAI
from fastapi.responses import JSONResponse

app = FastAPI()

# Configurazione del Client OpenAI (può puntare a OpenAI, Grok, Groq, ecc. in base a BASE_URL)
# Assicurati di impostare la variabile GROK_API_KEY o OPENAI_API_KEY nel tuo .env.local per far in modo che Next.js/Vercel la passi a Python
api_key = os.environ.get("GROK_API_KEY") or os.environ.get("OPENAI_API_KEY")

# Il Base URL per Grok di xAI è tipicamente https://api.x.ai/v1 (se usi la loro API compatibile OpenAI)
# Se usi Groq: https://api.groq.com/openai/v1
# Se usi OpenAI decommenta e rimuovi base_url.
client = OpenAI(
    api_key=api_key,
    base_url="https://api.x.ai/v1" # Sostituisci questo URL in base al provider gratuito che scegli, es. Groq
)

class NLPRequest(BaseModel):
    text: str

SYSTEM_PROMPT = """
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
Se è "finance", deve avere: "finance_type" ("expense" o "income"), "amount" (numero positivo float), "category" (stringa corta), "description" (stringa).
Se è "task", deve avere: "title" (titolo dell'attività), "hours" (numero float delle ore).
"""

@app.post("/api/python/nlp")
def parse_natural_language(req: NLPRequest):
    if not req.text:
         raise HTTPException(status_code=400, detail="Text is required")
    
    if not api_key:
        # Se non è configurata la API KEY, restituisce un finto JSON per debugging puro in caso in cui ti scordi di iniettarla.
        print("ATTENZIONE: Nessuna API KEY definita. Restituisco mock.")
        return JSONResponse(content={"type": "finance", "finance_type": "expense", "amount": 99.99, "category": "mock", "description": "Chiave API mancante. Questo è un MOCK."})

    try:
        response = client.chat.completions.create(
            # Es. Modello xAI (grok-2), o Llama3 se usi Groq ("llama3-8b-8192")
            model="grok-2-latest", 
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": req.text}
            ],
            temperature=0.0 # Per avere risposte JSON stabili
        )

        content = response.choices[0].message.content.strip()
        
        # Pulizia base se il modello inviasse ```json prima della graffa
        if content.startswith("```json"):
             content = content.replace("```json", "").replace("```", "").strip()
        elif content.startswith("```"):
             content = content.replace("```", "").strip()

        parsed_json = json.loads(content)
        return JSONResponse(content=parsed_json)

    except Exception as e:
        print(f"Error calling LLM: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Errore interno del LLM: {str(e)}")

