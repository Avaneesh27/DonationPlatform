"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, CreditCard, Heart, Share2, Users, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CampaignDetailsPage({ params }: { params: { id: string } }) {
  const [donationAmount, setDonationAmount] = useState("25")
  const [donationMethod, setDonationMethod] = useState("card")

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/campaigns">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to campaigns</span>
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Campaign Details</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              <span className="hidden md:inline">Share</span>
            </Button>
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="hidden md:flex">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 py-6">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <div className="rounded-lg overflow-hidden mb-6">
                  <img
                    src="/placeholder.svg?height=400&width=800&text=Campaign+Image"
                    alt="Campaign"
                    className="w-full h-[400px] object-cover"
                  />
                </div>

                <h1 className="text-3xl font-bold mb-2">Clean Water Initiative</h1>
                <p className="text-muted-foreground mb-6">
                  Providing clean water to communities in need across Africa.
                </p>

                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Started April 1, 2023</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>15 days left</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>230 donors</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Heart className="h-4 w-4 text-rose-500" />
                    <span>Environment</span>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">$12,500 raised</span>
                    <span className="text-muted-foreground">$20,000 goal</span>
                  </div>
                  <Progress value={62.5} className="h-2" />
                  <div className="mt-1 text-xs text-muted-foreground">62.5% of goal reached</div>
                </div>

                <Tabs defaultValue="about">
                  <TabsList>
                    <TabsTrigger value="about">About</TabsTrigger>
                    <TabsTrigger value="updates">Updates</TabsTrigger>
                    <TabsTrigger value="donors">Donors</TabsTrigger>
                  </TabsList>
                  <TabsContent value="about" className="mt-4 space-y-4">
                    <p>
                      Access to clean water is a fundamental human right, yet millions of people across Africa still
                      lack this basic necessity. Our Clean Water Initiative aims to change that by implementing
                      sustainable water solutions in communities that need them most.
                    </p>
                    <p>With your support, we will:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Install water wells and pumps in 15 villages</li>
                      <li>Provide water filtration systems to 500 families</li>
                      <li>Train local technicians to maintain water infrastructure</li>
                      <li>Educate communities on water conservation and hygiene practices</li>
                    </ul>
                    <p>
                      Every donation, no matter how small, brings us closer to our goal of ensuring clean water access
                      for all. Join us in making a lasting impact on these communities.
                    </p>
                    <div className="rounded-lg overflow-hidden mt-4">
                      <img
                        src="/placeholder.svg?height=300&width=600&text=Impact+Image"
                        alt="Impact"
                        className="w-full h-[300px] object-cover"
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="updates" className="mt-4">
                    <div className="space-y-6">
                      {[
                        {
                          date: "April 10, 2023",
                          title: "First Well Completed!",
                          content:
                            "We're excited to announce that the first well has been completed in Makoko Village. Over 200 residents now have access to clean water. Thank you to all our donors for making this possible!",
                        },
                        {
                          date: "April 5, 2023",
                          title: "Equipment Delivered",
                          content:
                            "All drilling equipment has been delivered to the project sites. Our team is now preparing to begin work on the first three wells.",
                        },
                        {
                          date: "April 1, 2023",
                          title: "Campaign Launch",
                          content:
                            "Today we launch our Clean Water Initiative campaign. We're thrilled to begin this journey and grateful for your support.",
                        },
                      ].map((update, i) => (
                        <div key={i} className="border-l-2 border-primary pl-4">
                          <div className="text-sm text-muted-foreground">{update.date}</div>
                          <h3 className="text-lg font-medium mt-1">{update.title}</h3>
                          <p className="mt-2">{update.content}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                  <TabsContent value="donors" className="mt-4">
                    <div className="space-y-4">
                      {[
                        {
                          name: "John Doe",
                          amount: "$100",
                          date: "April 12, 2023",
                          message: "Clean water is a basic human right. Happy to support this cause!",
                        },
                        {
                          name: "Jane Smith",
                          amount: "$50",
                          date: "April 10, 2023",
                          message: "Keep up the great work!",
                        },
                        { name: "Anonymous", amount: "$200", date: "April 8, 2023", message: null },
                        {
                          name: "Michael Johnson",
                          amount: "$75",
                          date: "April 7, 2023",
                          message: "Glad to be part of this initiative.",
                        },
                        {
                          name: "Sarah Williams",
                          amount: "$150",
                          date: "April 5, 2023",
                          message: "Water is life. Everyone deserves access to clean water.",
                        },
                      ].map((donor, i) => (
                        <div key={i} className="flex items-start gap-4 pb-4 border-b">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                            {donor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <div className="font-medium">{donor.name}</div>
                              <div className="font-medium">{donor.amount}</div>
                            </div>
                            <div className="text-sm text-muted-foreground">{donor.date}</div>
                            {donor.message && <div className="mt-2 text-sm">{donor.message}</div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>

            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Make a Donation</CardTitle>
                    <CardDescription>
                      Your contribution helps provide clean water to communities in need
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="mb-3 text-sm font-medium">Select Amount</div>
                      <div className="grid grid-cols-3 gap-2">
                        {["10", "25", "50", "100", "250", "500"].map((amount) => (
                          <Button
                            key={amount}
                            variant={donationAmount === amount ? "default" : "outline"}
                            onClick={() => setDonationAmount(amount)}
                            className="h-12"
                          >
                            ${amount}
                          </Button>
                        ))}
                      </div>
                      <div className="mt-3">
                        <div className="mb-2 text-sm font-medium">Custom Amount</div>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <span className="text-muted-foreground">$</span>
                          </div>
                          <Input
                            type="number"
                            placeholder="Enter amount"
                            value={donationAmount}
                            onChange={(e) => setDonationAmount(e.target.value)}
                            className="pl-7"
                          />
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <div className="mb-3 text-sm font-medium">Payment Method</div>
                      <div className="space-y-2">
                        <div
                          className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer ${
                            donationMethod === "card" ? "border-primary bg-primary/5" : ""
                          }`}
                          onClick={() => setDonationMethod("card")}
                        >
                          <CreditCard className="h-5 w-5 text-primary" />
                          <div className="flex-1">
                            <div className="font-medium">Credit/Debit Card</div>
                            <div className="text-xs text-muted-foreground">Secure payment via Stripe</div>
                          </div>
                        </div>
                        <div
                          className={`flex items-center gap-3 p-3 rounded-md border cursor-pointer ${
                            donationMethod === "tokens" ? "border-primary bg-primary/5" : ""
                          }`}
                          onClick={() => setDonationMethod("tokens")}
                        >
                          <Wallet className="h-5 w-5 text-primary" />
                          <div className="flex-1">
                            <div className="font-medium">Stellar Tokens</div>
                            <div className="text-xs text-muted-foreground">Use your earned tokens</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-4">
                    <Button className="w-full" size="lg">
                      Donate ${donationAmount}
                    </Button>
                    <p className="text-xs text-center text-muted-foreground">
                      By donating, you agree to our terms of service and privacy policy.
                    </p>
                  </CardFooter>
                </Card>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Campaign Organizer</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                        GH
                      </div>
                      <div>
                        <div className="font-medium">GiveHope Foundation</div>
                        <div className="text-sm text-muted-foreground">Verified Organization</div>
                      </div>
                    </div>
                    <div className="mt-4 text-sm">
                      GiveHope Foundation has been working on clean water initiatives for over 10 years, helping more
                      than 500,000 people gain access to clean water.
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      Contact Organizer
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} GiveHope. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/terms" className="hover:underline">
              Terms
            </Link>
            <Link href="/privacy" className="hover:underline">
              Privacy
            </Link>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
