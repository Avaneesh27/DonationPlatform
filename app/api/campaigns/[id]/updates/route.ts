import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../../auth/[...nextauth]/route"
import { supabase, generateId } from "@/lib/supabase"

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, content } = await request.json()

    // Check if campaign exists
    const { data: campaign, error: campaignError } = await supabase
      .from("campaigns")
      .select("id")
      .eq("id", params.id)
      .single()

    if (campaignError || !campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    const now = new Date().toISOString()
    const updateId = generateId()

    // Create campaign update
    const { data: update, error } = await supabase
      .from("campaign_updates")
      .insert({
        id: updateId,
        title,
        content,
        campaign_id: params.id,
        created_at: now,
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating campaign update:", error)
      return NextResponse.json({ error: "Failed to create campaign update" }, { status: 500 })
    }

    return NextResponse.json(update, { status: 201 })
  } catch (error) {
    console.error("Error creating campaign update:", error)
    return NextResponse.json({ error: "Failed to create campaign update" }, { status: 500 })
  }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Get campaign updates
    const { data: updates, error } = await supabase
      .from("campaign_updates")
      .select("*")
      .eq("campaign_id", params.id)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching campaign updates:", error)
      return NextResponse.json({ error: "Failed to fetch campaign updates" }, { status: 500 })
    }

    return NextResponse.json(updates)
  } catch (error) {
    console.error("Error fetching campaign updates:", error)
    return NextResponse.json({ error: "Failed to fetch campaign updates" }, { status: 500 })
  }
}
