import { fetchFinances } from "@/actions/finance_actions"
import FinancesClient from "./finances-client"

export default async function FinancesPage() {
    const finances = await fetchFinances() || []

    return <FinancesClient initialFinances={finances} />
}
