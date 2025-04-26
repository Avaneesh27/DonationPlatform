import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]/route"
import { supabase, generateId } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    // Check if user already exists
    const { data: existingUser } = await supabase.from("users").select("id").eq("email", email).single()

    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Generate user ID
    const userId = generateId()
    const now = new Date().toISOString()

    // Create user
    const { error: userError } = await supabase.from("users").insert({
      id: userId,
      name,
      email,
      password: hashedPassword,
      role: "USER",
      created_at: now,
      updated_at: now,
    })

    if (userError) {
      console.error("Error creating user:", userError)
      return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
    }

    // Create wallet with welcome bonus
    const { error: walletError } = await supabase.from("wallets").insert({
      user_id: userId,
      balance: 100, // Give new users 100 tokens as welcome bonus
      created_at: now,
      updated_at: now,
    })

    if (walletError) {
      console.error("Error creating wallet:", walletError)
      // Continue anyway, we'll handle this gracefully
    }

    // Create welcome transaction
    const { error: transactionError } = await supabase.from("transactions").insert({
      user_id: userId,
      amount: 100,
      type: "EARNED",
      source: "Welcome Bonus",
      created_at: now,
    })

    if (transactionError) {
      console.error("Error creating transaction:", transactionError)
      // Continue anyway, we'll handle this gracefully
    }

    return NextResponse.json(
      {
        id: userId,
        name,
        email,
        role: "USER",
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get all users with their wallets and donations
    const { data: users, error } = await supabase.from("users").select(`
        id, 
        name, 
        email, 
        role, 
        created_at,
        wallets (balance),
        donations (id, amount, campaign_id, created_at)
      `)

    if (error) {
      console.error("Error fetching users:", error)
      return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
    }

    return NextResponse.json(users)
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 })
  }
}
