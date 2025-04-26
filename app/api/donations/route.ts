import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import Stripe from "stripe"
import { supabase, generateId } from "@/lib/supabase"

const stripe = new Stripe(process.env.Api || "", {
  apiVersion: "2023-10-16",
})

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { campaignId, amount, paymentMethod, message, tokenAmount } = await request.json()

    // Check if campaign exists
    const { data: campaign, error: campaignError } = await supabase
      .from("campaigns")
      .select("id, title")
      .eq("id", campaignId)
      .single()

    if (campaignError || !campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    const now = new Date().toISOString()
    const donationId = generateId()

    // Handle token donation
    if (paymentMethod === "tokens") {
      // Check wallet balance
      const { data: wallet, error: walletError } = await supabase
        .from("wallets")
        .select("balance")
        .eq("user_id", session.user.id)
        .single()

      if (walletError || !wallet) {
        return NextResponse.json({ error: "Wallet not found" }, { status: 404 })
      }

      if (wallet.balance < tokenAmount) {
        return NextResponse.json({ error: "Insufficient tokens" }, { status: 400 })
      }

      // Create donation
      const { data: donation, error: donationError } = await supabase
        .from("donations")
        .insert({
          id: donationId,
          amount: Number.parseFloat(amount),
          message,
          user_id: session.user.id,
          campaign_id: campaignId,
          payment_method: "TOKENS",
          created_at: now,
        })
        .select()
        .single()

      if (donationError) {
        console.error("Error creating donation:", donationError)
        return NextResponse.json({ error: "Failed to create donation" }, { status: 500 })
      }

      // Update wallet balance
      const { error: updateWalletError } = await supabase
        .from("wallets")
        .update({
          balance: wallet.balance - tokenAmount,
          updated_at: now,
        })
        .eq("user_id", session.user.id)

      if (updateWalletError) {
        console.error("Error updating wallet:", updateWalletError)
        // Continue anyway, we'll handle this gracefully
      }

      // Create transaction record
      const { error: transactionError } = await supabase.from("transactions").insert({
        user_id: session.user.id,
        amount: tokenAmount,
        type: "DONATED",
        source: campaign.title,
        created_at: now,
      })

      if (transactionError) {
        console.error("Error creating transaction:", transactionError)
        // Continue anyway, we'll handle this gracefully
      }

      return NextResponse.json(donation, { status: 201 })
    }

    // Handle credit card donation
    if (paymentMethod === "card") {
      // In a real app, you would create a Stripe payment intent here
      // For this example, we'll simulate a successful payment

      // Create donation
      const { data: donation, error: donationError } = await supabase
        .from("donations")
        .insert({
          id: donationId,
          amount: Number.parseFloat(amount),
          message,
          user_id: session.user.id,
          campaign_id: campaignId,
          payment_method: "CARD",
          created_at: now,
        })
        .select()
        .single()

      if (donationError) {
        console.error("Error creating donation:", donationError)
        return NextResponse.json({ error: "Failed to create donation" }, { status: 500 })
      }

      // Give the user tokens for their donation (10% of donation amount)
      const tokensEarned = Math.floor(Number.parseFloat(amount) * 0.1)

      // Update wallet balance
      const { error: updateWalletError } = await supabase
        .from("wallets")
        .update({
          balance: supabase.rpc("increment", { amount: tokensEarned }),
          updated_at: now,
        })
        .eq("user_id", session.user.id)

      if (updateWalletError) {
        console.error("Error updating wallet:", updateWalletError)
        // Continue anyway, we'll handle this gracefully
      }

      // Create transaction record for earned tokens
      const { error: transactionError } = await supabase.from("transactions").insert({
        user_id: session.user.id,
        amount: tokensEarned,
        type: "EARNED",
        source: "Donation Reward",
        created_at: now,
      })

      if (transactionError) {
        console.error("Error creating transaction:", transactionError)
        // Continue anyway, we'll handle this gracefully
      }

      return NextResponse.json(
        {
          ...donation,
          tokensEarned,
        },
        { status: 201 },
      )
    }

    return NextResponse.json({ error: "Invalid payment method" }, { status: 400 })
  } catch (error) {
    console.error("Error creating donation:", error)
    return NextResponse.json({ error: "Failed to create donation" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const campaignId = searchParams.get("campaignId")

    // Build query
    let query = supabase
      .from("donations")
      .select(`
        *,
        campaigns:campaign_id (
          id,
          title,
          category,
          image_url
        ),
        users:user_id (
          id,
          name
        )
      `)
      .order("created_at", { ascending: false })

    // Apply filters
    if (userId) {
      query = query.eq("user_id", userId)
    }

    if (campaignId) {
      query = query.eq("campaign_id", campaignId)
    }

    // Only admins can see all donations
    if (session.user.role !== "ADMIN" && !userId) {
      query = query.eq("user_id", session.user.id)
    }

    // Execute query
    const { data: donations, error } = await query

    if (error) {
      console.error("Error fetching donations:", error)
      return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 })
    }

    return NextResponse.json(donations)
  } catch (error) {
    console.error("Error fetching donations:", error)
    return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 })
  }
}
