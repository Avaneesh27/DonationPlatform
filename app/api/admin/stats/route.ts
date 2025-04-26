import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get total users count
    const { count: usersCount, error: usersError } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })

    if (usersError) {
      console.error("Error counting users:", usersError)
      return NextResponse.json({ error: "Failed to count users" }, { status: 500 })
    }

    // Get total campaigns count
    const { count: campaignsCount, error: campaignsError } = await supabase
      .from("campaigns")
      .select("*", { count: "exact", head: true })

    if (campaignsError) {
      console.error("Error counting campaigns:", campaignsError)
      return NextResponse.json({ error: "Failed to count campaigns" }, { status: 500 })
    }

    // Get active campaigns count
    const { count: activeCampaignsCount, error: activeCampaignsError } = await supabase
      .from("campaigns")
      .select("*", { count: "exact", head: true })
      .eq("status", "ACTIVE")

    if (activeCampaignsError) {
      console.error("Error counting active campaigns:", activeCampaignsError)
      return NextResponse.json({ error: "Failed to count active campaigns" }, { status: 500 })
    }

    // Get total donations amount
    const { data: donations, error: donationsError } = await supabase.from("donations").select("amount")

    if (donationsError) {
      console.error("Error fetching donations:", donationsError)
      return NextResponse.json({ error: "Failed to fetch donations" }, { status: 500 })
    }

    const totalDonated = donations.reduce((sum, donation) => sum + donation.amount, 0)

    // Get total tokens earned
    const { data: transactions, error: transactionsError } = await supabase.from("transactions").select("amount, type")

    if (transactionsError) {
      console.error("Error fetching transactions:", transactionsError)
      return NextResponse.json({ error: "Failed to fetch transactions" }, { status: 500 })
    }

    const totalTokensEarned = transactions.filter((t) => t.type === "EARNED").reduce((sum, t) => sum + t.amount, 0)

    // Get recent donations
    const { data: recentDonations, error: recentDonationsError } = await supabase
      .from("donations")
      .select(`
        id,
        amount,
        created_at,
        users:user_id (name),
        campaigns:campaign_id (title)
      `)
      .order("created_at", { ascending: false })
      .limit(10)

    if (recentDonationsError) {
      console.error("Error fetching recent donations:", recentDonationsError)
      return NextResponse.json({ error: "Failed to fetch recent donations" }, { status: 500 })
    }

    // Get top campaigns
    const { data: campaigns, error: topCampaignsError } = await supabase.from("campaigns").select(`
        id,
        title,
        goal,
        donations (amount)
      `)

    if (topCampaignsError) {
      console.error("Error fetching top campaigns:", topCampaignsError)
      return NextResponse.json({ error: "Failed to fetch top campaigns" }, { status: 500 })
    }

    const topCampaigns = campaigns
      .map((campaign) => {
        const raised = campaign.donations?.reduce((sum, donation) => sum + donation.amount, 0) || 0
        const progress = campaign.goal > 0 ? (raised / campaign.goal) * 100 : 0

        return {
          id: campaign.id,
          title: campaign.title,
          raised,
          goal: campaign.goal,
          progress: Math.min(progress, 100), // Cap at 100%
        }
      })
      .sort((a, b) => b.raised - a.raised)
      .slice(0, 5)

    return NextResponse.json({
      usersCount,
      campaignsCount,
      activeCampaignsCount,
      totalDonated,
      totalTokensEarned,
      recentDonations,
      topCampaigns,
    })
  } catch (error) {
    console.error("Error fetching admin stats:", error)
    return NextResponse.json({ error: "Failed to fetch admin stats" }, { status: 500 })
  }
}
