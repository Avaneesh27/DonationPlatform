import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]/route"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Get campaign with donations and updates
    const { data: campaign, error } = await supabase
      .from("campaigns")
      .select(`
        *,
        donations (
          id,
          amount,
          message,
          created_at,
          users:user_id (
            id,
            name
          )
        ),
        donations_count:donations(count),
        updates:campaign_updates (
          id,
          title,
          content,
          created_at
        )
      `)
      .eq("id", params.id)
      .single()

    if (error) {
      console.error("Error fetching campaign:", error)
      return NextResponse.json({ error: "Failed to fetch campaign" }, { status: 500 })
    }

    if (!campaign) {
      return NextResponse.json({ error: "Campaign not found" }, { status: 404 })
    }

    // Sort donations by date (newest first) and limit to 10
    const recentDonations =
      campaign.donations
        ?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 10)
        .map((donation) => ({
          id: donation.id,
          amount: donation.amount,
          user: donation.users,
          message: donation.message,
          createdAt: donation.created_at,
        })) || []

    // Sort updates by date (newest first)
    const updates =
      campaign.updates
        ?.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .map((update) => ({
          id: update.id,
          title: update.title,
          content: update.content,
          createdAt: update.created_at,
        })) || []

    // Calculate raised amount and progress
    const raised = campaign.donations?.reduce((sum, donation) => sum + donation.amount, 0) || 0
    const progress = campaign.goal > 0 ? (raised / campaign.goal) * 100 : 0
    const donorsCount = campaign.donations_count || 0

    const result = {
      ...campaign,
      raised,
      progress: Math.min(progress, 100), // Cap at 100%
      donorsCount,
      donations: recentDonations,
      updates,
      donations_count: undefined, // Remove the count
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Error fetching campaign:", error)
    return NextResponse.json({ error: "Failed to fetch campaign" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, description, shortDescription, category, goal, endDate, featured, status, imageUrl } =
      await request.json()

    const now = new Date().toISOString()

    // Update campaign
    const { data: updatedCampaign, error } = await supabase
      .from("campaigns")
      .update({
        title: title || undefined,
        description: description || undefined,
        short_description: shortDescription || undefined,
        category: category || undefined,
        goal: goal ? Number.parseFloat(goal) : undefined,
        end_date: endDate ? new Date(endDate).toISOString() : undefined,
        featured: featured !== undefined ? featured === "yes" : undefined,
        status: status || undefined,
        image_url: imageUrl || undefined,
        updated_at: now,
      })
      .eq("id", params.id)
      .select()
      .single()

    if (error) {
      console.error("Error updating campaign:", error)
      return NextResponse.json({ error: "Failed to update campaign" }, { status: 500 })
    }

    return NextResponse.json(updatedCampaign)
  } catch (error) {
    console.error("Error updating campaign:", error)
    return NextResponse.json({ error: "Failed to update campaign" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Delete campaign (cascade will handle related records)
    const { error } = await supabase.from("campaigns").delete().eq("id", params.id)

    if (error) {
      console.error("Error deleting campaign:", error)
      return NextResponse.json({ error: "Failed to delete campaign" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting campaign:", error)
    return NextResponse.json({ error: "Failed to delete campaign" }, { status: 500 })
  }
}
