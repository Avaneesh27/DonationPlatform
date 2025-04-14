"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  ArrowDown,
  ArrowUp,
  Bell,
  CreditCard,
  Heart,
  History,
  Home,
  LogOut,
  Plus,
  Settings,
  User,
  Wallet,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function WalletPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col border-r bg-background">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-bold">
            <Heart className="h-5 w-5 text-rose-500" />
            <span>GiveHope</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid gap-1 px-2">
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Home className="h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link href="/dashboard/donations">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Heart className="h-4 w-4" />
                My Donations
              </Button>
            </Link>
            <Link href="/dashboard/wallet">
              <Button variant="ghost" className="w-full justify-start gap-2 bg-muted">
                <Wallet className="h-4 w-4" />
                Wallet
              </Button>
            </Link>
            <Link href="/dashboard/history">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <History className="h-4 w-4" />
                History
              </Button>
            </Link>
            <Link href="/dashboard/settings">
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </Link>
          </nav>
        </div>
        <div className="border-t p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <div>
              <div className="font-medium">John Doe</div>
              <div className="text-xs text-muted-foreground">john@example.com</div>
            </div>
          </div>
          <Button variant="outline" className="w-full justify-start gap-2" size="sm">
            <LogOut className="h-4 w-4" />
            Log Out
          </Button>
        </div>
      </div>
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 md:px-6">
          <div className="md:hidden">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <Heart className="h-5 w-5 text-rose-500" />
              <span>GiveHope</span>
            </Link>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </div>
        </header>
        <main className="grid gap-6 p-4 md:p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Wallet</h1>
            <div className="flex items-center gap-2">
              <Link href="/games">
                <Button className="gap-1">
                  <Plus className="h-4 w-4" />
                  Earn Tokens
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Available Tokens</CardTitle>
                  <Wallet className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,350</div>
                  <p className="text-xs text-muted-foreground">+120 from last week</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Earned</CardTitle>
                  <ArrowUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3,250</div>
                  <p className="text-xs text-muted-foreground">Since you joined</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Donated</CardTitle>
                  <ArrowDown className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">900</div>
                  <p className="text-xs text-muted-foreground">Across 8 campaigns</p>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">USD Equivalent</CardTitle>
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$235.00</div>
                  <p className="text-xs text-muted-foreground">1 Token = $0.10</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="earn">Ways to Earn</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-4 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Token Balance</CardTitle>
                  <CardDescription>Your current token earnings and usage</CardDescription>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">Available Tokens</div>
                      <div className="text-sm font-medium">2,350 / 5,000</div>
                    </div>
                    <Progress value={47} className="h-2" />
                    <div className="mt-1 text-xs text-muted-foreground">47% to next level</div>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Tokens Earned</div>
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                            <ArrowUp className="h-5 w-5 text-green-600" />
                          </div>
                          <div className="text-2xl font-bold">3,250</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium">Tokens Donated</div>
                        <div className="flex items-center gap-2">
                          <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center">
                            <ArrowDown className="h-5 w-5 text-rose-600" />
                          </div>
                          <div className="text-2xl font-bold">900</div>
                        </div>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium">Current Balance</div>
                      <div className="text-xl font-bold">2,350</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/games" className="w-full">
                    <Button variant="outline" className="w-full">
                      Earn More Tokens
                    </Button>
                  </Link>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Your recent token transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        id: 1,
                        type: "earned",
                        amount: 50,
                        source: "Token Runner Game",
                        date: "2023-04-12T10:30:00Z",
                      },
                      {
                        id: 2,
                        type: "donated",
                        amount: 350,
                        source: "Medical Aid Relief",
                        date: "2023-04-05T09:45:00Z",
                      },
                      {
                        id: 3,
                        type: "earned",
                        amount: 30,
                        source: "Charity Quiz",
                        date: "2023-04-03T14:20:00Z",
                      },
                      {
                        id: 4,
                        type: "donated",
                        amount: 550,
                        source: "Hunger Relief Program",
                        date: "2023-03-20T11:10:00Z",
                      },
                      {
                        id: 5,
                        type: "earned",
                        amount: 100,
                        source: "Daily Login Bonus",
                        date: "2023-03-15T08:05:00Z",
                      },
                    ].map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center ${
                              activity.type === "earned" ? "bg-green-100 text-green-600" : "bg-rose-100 text-rose-600"
                            }`}
                          >
                            {activity.type === "earned" ? (
                              <ArrowUp className="h-4 w-4" />
                            ) : (
                              <ArrowDown className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium">
                              {activity.type === "earned" ? "Earned from" : "Donated to"} {activity.source}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(activity.date).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className={`font-bold ${activity.type === "earned" ? "text-green-600" : "text-rose-600"}`}>
                          {activity.type === "earned" ? "+" : "-"}
                          {activity.amount}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full" onClick={() => setActiveTab("transactions")}>
                    View All Transactions
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="transactions" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>Complete history of your token transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Source/Destination</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {[
                        {
                          id: 1,
                          type: "earned",
                          amount: 50,
                          source: "Token Runner Game",
                          date: "2023-04-12T10:30:00Z",
                        },
                        {
                          id: 2,
                          type: "donated",
                          amount: 350,
                          source: "Medical Aid Relief",
                          date: "2023-04-05T09:45:00Z",
                        },
                        {
                          id: 3,
                          type: "earned",
                          amount: 30,
                          source: "Charity Quiz",
                          date: "2023-04-03T14:20:00Z",
                        },
                        {
                          id: 4,
                          type: "donated",
                          amount: 550,
                          source: "Hunger Relief Program",
                          date: "2023-03-20T11:10:00Z",
                        },
                        {
                          id: 5,
                          type: "earned",
                          amount: 100,
                          source: "Daily Login Bonus",
                          date: "2023-03-15T08:05:00Z",
                        },
                        {
                          id: 6,
                          type: "earned",
                          amount: 40,
                          source: "Memory Match Game",
                          date: "2023-03-10T16:45:00Z",
                        },
                        {
                          id: 7,
                          type: "earned",
                          amount: 25,
                          source: "Watched Video",
                          date: "2023-03-08T13:20:00Z",
                        },
                        {
                          id: 8,
                          type: "earned",
                          amount: 200,
                          source: "Referral Bonus",
                          date: "2023-03-05T09:15:00Z",
                        },
                        {
                          id: 9,
                          type: "earned",
                          amount: 100,
                          source: "Daily Login Bonus",
                          date: "2023-03-01T08:10:00Z",
                        },
                        {
                          id: 10,
                          type: "earned",
                          amount: 100,
                          source: "Welcome Bonus",
                          date: "2023-02-28T14:30:00Z",
                        },
                      ].map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                          <TableCell>
                            <div
                              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                transaction.type === "earned"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-rose-100 text-rose-800"
                              }`}
                            >
                              {transaction.type === "earned" ? "Earned" : "Donated"}
                            </div>
                          </TableCell>
                          <TableCell>{transaction.source}</TableCell>
                          <TableCell className="text-right font-medium">
                            <span className={transaction.type === "earned" ? "text-green-600" : "text-rose-600"}>
                              {transaction.type === "earned" ? "+" : "-"}
                              {transaction.amount}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Showing <strong>10</strong> of <strong>24</strong> transactions
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" disabled>
                      Previous
                    </Button>
                    <Button variant="outline" size="sm">
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            <TabsContent value="earn" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Ways to Earn Tokens</CardTitle>
                  <CardDescription>Complete these activities to earn more tokens for donations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Play Games</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Play fun mini-games and earn tokens based on your performance.
                        </p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Token Runner</span>
                            <span className="font-medium">Up to 50 tokens</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Memory Match</span>
                            <span className="font-medium">Up to 40 tokens</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Charity Quiz</span>
                            <span className="font-medium">Up to 30 tokens</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link href="/games" className="w-full">
                          <Button className="w-full">Play Games</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Watch Videos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Watch short videos about charitable causes and earn tokens.
                        </p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Campaign Videos</span>
                            <span className="font-medium">25 tokens each</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Impact Stories</span>
                            <span className="font-medium">20 tokens each</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Sponsor Messages</span>
                            <span className="font-medium">15 tokens each</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link href="/games?tab=videos" className="w-full">
                          <Button className="w-full">Watch Videos</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Daily Tasks</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Complete daily tasks to earn tokens consistently.
                        </p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Daily Check-in</span>
                            <span className="font-medium">10 tokens</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Share on Social Media</span>
                            <span className="font-medium">25 tokens</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Complete a Survey</span>
                            <span className="font-medium">30 tokens</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Link href="/games?tab=tasks" className="w-full">
                          <Button className="w-full">View Tasks</Button>
                        </Link>
                      </CardFooter>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Referrals</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          Invite friends to join GiveHope and earn tokens for each referral.
                        </p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Friend Signs Up</span>
                            <span className="font-medium">50 tokens</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Friend Makes First Donation</span>
                            <span className="font-medium">100 tokens</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>Referral Milestone (5 friends)</span>
                            <span className="font-medium">200 tokens</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Invite Friends</Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}
