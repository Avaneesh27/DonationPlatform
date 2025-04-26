import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

// Initialize Supabase client
const supabaseUrl = process.env.DATABASE_URL || ""
const supabaseKey = process.env.Api || ""

export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

// Helper function to generate UUIDs
export function generateId(): string {
  return crypto.randomUUID()
}
