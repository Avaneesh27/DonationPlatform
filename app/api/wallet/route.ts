import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get wallet
    const { data: wallet, error: walletError } = await supabase
      .from("wallets")
      .select("balance")
      .eq("user_id", session.user.id)
      .single()

    if (walletError) {
      console.error("Error fetching wallet:", walletError)
      return NextResponse.json({ error: "Wallet not found" }, { status: 404 })
    }

    // Get transaction history
    const { data: transactions, error: transactionsError } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false })

    if (transactionsError) {
      console.error("Error fetching transactions:", transactionsError)
      return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
    }

    // Calculate stats
    const earned = transactions.filter((t) => t.type === "EARNED").reduce((sum, t) => sum + t.amount, 0)

    const donated = transactions.filter((t) => t.type === "DONATED").reduce((sum, t) => sum + t.amount, 0)

    return NextResponse.json({
      balance: wallet.balance,
      earned,
      donated,
      transactions,
    })
  } catch (error) {
    console.error("Error fetching wallet:", error)
    return NextResponse.json({ error: "Failed to fetch wallet" }, { status: 500 })
  }
}
