import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import { supabase, generateId } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, description, shortDescription, category, goal, endDate, featured, status, imageUrl } =
      await request.json()

    const now = new Date().toISOString()
    const campaignId = generateId()

    // Create campaign
    const { data: campaign, error } = await supabase
      .from("campaigns")
      .insert({
        id: campaignId,
        title,
        description,
        short_description: shortDescription,
        category,
        goal: Number.parseFloat(goal),
        end_date: new Date(endDate).toISOString(),
        featured: featured === "yes",
        status: status || "ACTIVE",
        image_url: imageUrl,
        created_by: session.user.id,
        created_at: now,
        updated_at: now,
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating campaign:", error)
      return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 })
    }

    return NextResponse.json(campaign, { status: 201 })
  } catch (error) {
    console.error("Error creating campaign:", error)
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const status = searchParams.get("status")
    const featured = searchParams.get("featured")

    // Build query
    let query = supabase
      .from("campaigns")
      .select(`
        *,
        donations (amount),
        donations_count:donations(count)
      `)
      .order("created_at", { ascending: false })

    // Apply filters
    if (category) {
      query = query.eq("category", category)
    }

    if (status) {
      query = query.eq("status", status)
    }

    if (featured === "true") {
      query = query.eq("featured", true)
    }

    // Execute query
    const { data: campaigns, error } = await query

    if (error) {
      console.error("Error fetching campaigns:", error)
      return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 })
    }

    // Calculate raised amount and progress for each campaign
    const campaignsWithStats = campaigns.map((campaign) => {
      const raised = campaign.donations?.reduce((sum, donation) => sum + donation.amount, 0) || 0
      const progress = campaign.goal > 0 ? (raised / campaign.goal) * 100 : 0
      const donorsCount = campaign.donations_count || 0

      return {
        ...campaign,
        raised,
        progress: Math.min(progress, 100), // Cap at 100%
        donorsCount,
        donations: undefined, // Remove the donations array
        donations_count: undefined, // Remove the count
      }
    })

    return NextResponse.json(campaignsWithStats)
  } catch (error) {
    console.error("Error fetching campaigns:", error)
    return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 })
  }
}
