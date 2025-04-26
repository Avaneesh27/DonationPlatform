import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { supabase, generateId } from "@/lib/supabase"

const stripe = new Stripe(process.env.Api || "", {
  apiVersion: "2023-10-16",
})

// Use Api as webhook secret if STRIPE_WEBHOOK_SECRET isn't available
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || process.env.Api || ""

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = request.headers.get("stripe-signature") || ""

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err: any) {
      return NextResponse.json({ error: `Webhook signature verification failed: ${err.message}` }, { status: 400 })
    }

    // Handle the event
    switch (event.type) {
      case "payment_intent.succeeded":
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        // Extract metadata from the payment intent
        const { campaignId, userId, amount, message } = paymentIntent.metadata as {
          campaignId: string
          userId: string
          amount: string
          message?: string
        }

        if (campaignId && userId && amount) {
          const now = new Date().toISOString()
          const donationId = generateId()

          // Create donation record
          const { error: donationError } = await supabase.from("donations").insert({
            id: donationId,
            amount: Number.parseFloat(amount),
            message: message || null,
            user_id: userId,
            campaign_id: campaignId,
            payment_method: "CARD",
            created_at: now,
          })

          if (donationError) {
            console.error("Error creating donation:", donationError)
            // Continue anyway, we'll handle this gracefully
          }

          // Give the user tokens for their donation (10% of donation amount)
          const tokensEarned = Math.floor(Number.parseFloat(amount) * 0.1)

          // Update wallet balance
          const { error: walletError } = await supabase
            .from("wallets")
            .update({
              balance: supabase.rpc("increment", { amount: tokensEarned }),
              updated_at: now,
            })
            .eq("user_id", userId)

          if (walletError) {
            console.error("Error updating wallet:", walletError)
            // Continue anyway, we'll handle this gracefully
          }

          // Create transaction record for earned tokens
          const { error: transactionError } = await supabase.from("transactions").insert({
            user_id: userId,
            amount: tokensEarned,
            type: "EARNED",
            source: "Donation Reward",
            created_at: now,
          })

          if (transactionError) {
            console.error("Error creating transaction:", transactionError)
            // Continue anyway, we'll handle this gracefully
          }
        }

        break
      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error handling webhook:", error)
    return NextResponse.json({ error: "Failed to handle webhook" }, { status: 500 })
  }
}
