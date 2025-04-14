"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, CreditCard, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StripePaymentForm } from "@/components/payment/stripe-payment-form"
import { TokenPaymentForm } from "@/components/payment/token-payment-form"

export default function DonatePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [donationAmount, setDonationAmount] = useState("25")
  const [paymentMethod, setPaymentMethod] = useState("card")

  const handleDonationSuccess = () => {
    // In a real app, you would update the user's donation history
    // and redirect to a thank you page or back to the campaign
    setTimeout(() => {
      router.push(`/campaigns/${params.id}?donated=true`)
    }, 1000)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href={`/campaigns/${params.id}`}>
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to campaign</span>
              </Button>
            </Link>
            <h1 className="text-xl font-semibold">Make a Donation</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="hidden md:flex">
                Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1 py-6">
        <div className="container max-w-3xl">
          <Card>
            <CardHeader>
              <CardTitle>Donate to Clean Water Initiative</CardTitle>
              <CardDescription>Your contribution helps provide clean water to communities in need</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
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

                <Tabs defaultValue="card" onValueChange={setPaymentMethod}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="card" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Credit/Debit Card
                    </TabsTrigger>
                    <TabsTrigger value="tokens" className="flex items-center gap-2">
                      <Wallet className="h-4 w-4" />
                      Stellar Tokens
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="card" className="mt-4">
                    <StripePaymentForm amount={donationAmount} onSuccess={handleDonationSuccess} />
                  </TabsContent>
                  <TabsContent value="tokens" className="mt-4">
                    <TokenPaymentForm amount={donationAmount} onSuccess={handleDonationSuccess} />
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
          </Card>
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
