import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import { supabase, generateId } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { amount, source } = await request.json()

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid token amount" }, { status: 400 })
    }

    const now = new Date().toISOString()

    // Update wallet balance
    const { data: wallet, error: walletError } = await supabase
      .from("wallets")
      .update({
        balance: supabase.rpc("increment", { amount }),
        updated_at: now,
      })
      .eq("user_id", session.user.id)
      .select("balance")
      .single()

    if (walletError) {
      console.error("Error updating wallet:", walletError)
      return NextResponse.json({ error: "Failed to update wallet" }, { status: 500 })
    }

    // Create transaction record
    const transactionId = generateId()
    const { data: transaction, error: transactionError } = await supabase
      .from("transactions")
      .insert({
        id: transactionId,
        user_id: session.user.id,
        amount,
        type: "EARNED",
        source: source || "Game Reward",
        created_at: now,
      })
      .select()
      .single()

    if (transactionError) {
      console.error("Error creating transaction:", transactionError)
      return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      newBalance: wallet.balance,
      transaction,
    })
  } catch (error) {
    console.error("Error adding tokens:", error)
    return NextResponse.json({ error: "Failed to add tokens" }, { status: 500 })
  }
}
