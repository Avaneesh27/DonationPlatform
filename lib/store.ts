// In-memory data store

import { randomUUID } from "crypto"

// Types
export type User = {
  id: string
  name: string
  email: string
  password: string
  role: "USER" | "ADMIN"
  createdAt: Date
  updatedAt: Date
}

export type Wallet = {
  id: string
  balance: number
  userId: string
  createdAt: Date
  updatedAt: Date
}

export type Transaction = {
  id: string
  amount: number
  type: "EARNED" | "DONATED"
  source: string
  userId: string
  createdAt: Date
}

export type Campaign = {
  id: string
  title: string
  description: string
  shortDescription: string
  category: string
  goal: number
  endDate: Date
  imageUrl: string | null
  featured: boolean
  status: "ACTIVE" | "COMPLETED" | "DRAFT" | "PAUSED"
  createdBy: string
  createdAt: Date
  updatedAt: Date
}

export type Donation = {
  id: string
  amount: number
  message: string | null
  paymentMethod: "CARD" | "TOKENS"
  userId: string
  campaignId: string
  createdAt: Date
}

export type CampaignUpdate = {
  id: string
  title: string
  content: string
  campaignId: string
  createdAt: Date
}

// In-memory data store
export const store = {
  users: [] as User[],
  wallets: [] as Wallet[],
  transactions: [] as Transaction[],
  campaigns: [] as Campaign[],
  donations: [] as Donation[],
  campaignUpdates: [] as CampaignUpdate[],
}

// Helper functions
export function generateId(): string {
  return randomUUID()
}

export function findUserByEmail(email: string): User | undefined {
  return store.users.find((user) => user.email === email)
}

export function findUserById(id: string): User | undefined {
  return store.users.find((user) => user.id === id)
}

export function findWalletByUserId(userId: string): Wallet | undefined {
  return store.wallets.find((wallet) => wallet.userId === userId)
}

export function findCampaignById(id: string): Campaign | undefined {
  return store.campaigns.find((campaign) => campaign.id === id)
}

// Initialize with admin user
export function initializeStore() {
  // Add admin user if not exists
  if (!findUserByEmail("admin@givehope.org")) {
    const adminId = generateId()

    store.users.push({
      id: adminId,
      name: "Admin",
      email: "admin@givehope.org",
      password: "$2a$10$GQH.xZUBHMDqwXN9UPAp8.XRmQSddYVXYxLDYPLcLOUbhnNrtoiWW", // "password123"
      role: "ADMIN",
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    store.wallets.push({
      id: generateId(),
      balance: 1000,
      userId: adminId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // Add some sample campaigns
    const campaignId = generateId()
    store.campaigns.push({
      id: campaignId,
      title: "Help Children in Need",
      description: "This campaign aims to provide educational resources to underprivileged children.",
      shortDescription: "Support education for underprivileged children",
      category: "EDUCATION",
      goal: 10000,
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      imageUrl: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1470&auto=format&fit=crop",
      featured: true,
      status: "ACTIVE",
      createdBy: adminId,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    // Add campaign update
    store.campaignUpdates.push({
      id: generateId(),
      title: "Campaign Launch",
      content: "We're excited to launch this campaign to help children in need!",
      campaignId: campaignId,
      createdAt: new Date(),
    })
  }
}

// Call initialize
initializeStore()
